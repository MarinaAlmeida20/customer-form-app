import { useState } from 'react'

import './app.css'
import { IoAdd, IoTrashOutline } from 'react-icons/io5'
import { BiPencil } from 'react-icons/bi'
import { ModalClient } from './Components/ModalClient/ModalClient'
import { gql, useMutation, useQuery } from '@apollo/client'
import { client } from './lib/apollo'

// typesScript
interface Client {
  id: string;
  firstName: string;
  email: string;
}

// GraphQL - Query
const GET_CLIENTS = gql`
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
      <div className='container'>
        <h1 className='addInfo'/*isAddCard={true}*/ onClick={() => setModalInfo({
          open: true,
          isEdit: false,
          currentId: ""
        })} data-testid="open-modal-add">
          <IoAdd size={25} />
          <p>Add a New Client</p>
        </h1>
        {getClients.data?.clients.map((client) => (
          <h1 className='client' key={client.id}>
            <div className='info'>
              <p className='title info-data'>{client.firstName}</p>
              <p className='sub-title info-data'>{client.email}</p>
            </div>
            <div className='icons'>
              <BiPencil data-testid='open-modal-edit' size={25} onClick={() => setModalInfo({
                open: true,
                isEdit: true,
                currentId: client.id
              })} />
              <IoTrashOutline size={25} onClick={() => handleDeleteClient(client.id)} data-testid="delete-client" />
            </div>
          </h1>
        ))}
      </div>
    </>
  )
}

export default App
