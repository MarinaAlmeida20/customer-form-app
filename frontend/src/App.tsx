import { useState } from 'react'

import './app.css'
import { IoAdd, IoTrashOutline } from 'react-icons/io5'
import { BiPencil } from 'react-icons/bi'
import { ModalClient } from './Components/ModalClient/ModalClient'
import { gql, useMutation, useQuery } from '@apollo/client'
import { client } from './lib/apollo'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Button } from '@mui/material'

// typesScript
interface Client {
  id: string;
  firstName: string;
  email: string;
}

// GraphQL - Query
export const GET_CLIENTS = gql`
  query clients{
    clients {
      id
      firstName
      email
    }
  }
`

// GraphQL - Mutation
const DELETE_CLIENT = gql`
  mutation deleteClient($deleteClientId: String!) {
  deleteClient(id: $deleteClientId)
}
`


function App() {
  // const { data, loading, error } = useQuery<{ clients: Client[] }>(GET_CLIENTS)
  const getClients = useQuery<{ clients: Client[] }>(GET_CLIENTS)

  /// function - useMutation
  const [deleteClient, deleteClientInfo] = useMutation<{ deleteClient: string }, { deleteClientId: string }>(DELETE_CLIENT)

  const [modalInfo, setModalInfo] = useState({
    open: false,
    isEdit: false,
    currentId: ""
  })

  // console.log(data);

  // variable test
  // const clientDataTest: Client[] = [
  //   {
  //     id: "1",
  //     name: "Marina",
  //     email: "test@test.com"
  //   }
  // ]

  const handleCloseModal = () => {
    setModalInfo({
      open: false,
      isEdit: false,
      currentId: ""
    })
  }

  const handleDeleteClient = (id: string) => {
    deleteClient({
      variables: {
        deleteClientId: id
      },
      update: (cache, { data }) => {
        // console.log(data);
        // reQuery get the last response of the query and store in clientsResponse
        const clientsResponse = client.readQuery<{ clients: Client[] }>({
          query: GET_CLIENTS,
        });
        // console.log(clientsResponse)

        // writeQuery => overwrite something
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: clientsResponse?.clients.filter(client => client.id !== id)
          }
        })
      }

    })

    // console.log(deleteClientInfo)
  }

  return (
    <>
      <ModalClient info={modalInfo} closeModal={handleCloseModal} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center"
      }} >

        <Button onClick={() => setModalInfo({
          open: true,
          isEdit: false,
          currentId: ""
        })} aria-labelledby="modal-title"
          aria-describedby="modal-desc">
          <IoAdd size={25} />
          <p>Add a New Client</p>
        </Button>
        {getClients.data?.clients.map((client) => (
          <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: 400,
            borderRadius: 0
          }} key={client.id}>
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Box>
                <Typography gutterBottom variant="h5" component="div">
                  {client.firstName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {client.email}
                </Typography>
              </Box>
              <Box sx={{ display: "grid" }}>
                <BiPencil size={25} onClick={() => setModalInfo({
                  open: true,
                  isEdit: true,
                  currentId: client.id
                })} />
                <IoTrashOutline size={25} onClick={() => handleDeleteClient(client.id)} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  )
}

export default App
