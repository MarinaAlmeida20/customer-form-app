import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { GET_CLIENTS } from '../../App';
import { client } from '../../lib/apollo';

interface Props {
    info: {
        open: boolean;
        isEdit: boolean;
        currentId: string;
    };
    closeModal: () => void;
}

type Client = {
    id: string;
    firstName: string;
    surname: string;
    email: string;
    country: string;
}

type ClientWithoutID = Omit<Client, "id">

const GET_CLIENT = gql`
    query Client($clientId: String!) {
        client(id: $clientId) {
            id
            firstName
            surname
            email
            country
        }
}
`;

const ADD_CLIENT = gql`
    mutation CreateClient($createClientObject: CreateClientInput!) {
        createClient(createClientObject: $createClientObject) {
            id
            firstName
            surname
            email
            country
    }
}
`;

const EDIT_CLIENT = gql`
    mutation EditClient($editClientObject: EditClientInput!) {
        editClient(editClientObject: $editClientObject) {
            id
            firstName
            surname
            email
            country
        }
    }
`;

export function ModalClient({ info, closeModal }: Props) {
    // Get one client when I want
    const [getClient, getClientInfo] = useLazyQuery<{ client: Client }, { clientId: string }>(GET_CLIENT)

    // create client
    const [createClient, createClientInfo] = useMutation<{ createClient: Client }, { createClientObject: ClientWithoutID }>(ADD_CLIENT)

    // edit client
    const [editClient, editClientInfo] = useMutation<{ editClient: Client }, { editClientObject: Client }>(EDIT_CLIENT)


    const [values, setValues] = useState({
        id: "",
        firstName: "",
        surname: "",
        email: "",
        country: "",
    })

    // To fill up all the info above and request one client
    useEffect(() => {
        if (!info.isEdit) return;

        // request the data of the client
        async function getValues() {
            const currentClient = await getClient({
                variables: { clientId: info.currentId }
            })

            setValues({
                id: currentClient.data?.client.id,
                firstName: currentClient.data?.client.firstName,
                surname: currentClient.data?.client.surname,
                email: currentClient.data?.client.email,
                country: currentClient.data?.client.country,
            } as Client)
        }

        getValues()

    }, [info])

    // onChange from input
    function handleChangeValues(event: ChangeEvent<HTMLInputElement>) {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.id]: event.target.value,
        }))
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (info.isEdit) handleEditClient();
        else handleAddNewClient()
    }

    async function handleAddNewClient() {
        await createClient({
            variables: ({
                createClientObject: {
                    firstName: values.firstName,
                    surname: values.surname,
                    email: values.email,
                    country: values.country,
                }
            }),
            update: (cache, { data }) => {
                const clientsResponse = client.readQuery<{ clients: Client[] }>({
                    query: GET_CLIENTS,
                });

                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: {
                        clients: [...clientsResponse?.clients as any, { id: data?.createClient.id, firstName: data?.createClient.firstName, email: data?.createClient.email }]
                    }
                })
            }
        });

        closeModal();

        // clean the input
        setValues({
            id: "",
            firstName: "",
            surname: "",
            email: "",
            country: "",
        })
    }

    async function handleEditClient() {
        await editClient({
            variables: ({
                editClientObject: values
            }),
            update: (cache, { data }) => {
                const clientsResponse = client.readQuery<{ clients: Client[] }>({
                    query: GET_CLIENTS,
                });

                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: {
                        clients: clientsResponse?.clients.map(client => {
                            if (client.id === data?.editClient.id) {
                                return { id: data?.editClient.id, firstName: data?.editClient.firstName, email: data?.editClient.email }
                            } else {
                                return client
                            }
                        })
                    }
                })
            }
        });

        closeModal();

        // clean the input
        setValues({
            id: "",
            firstName: "",
            surname: "",
            email: "",
            country: "",
        })
    }

    if (!info.open) return <></>;

    return (
        <div className='form'>
            <h2>{info.isEdit ? "Edit " : "Add New "}client</h2>
            <form onSubmit={handleSubmit}>
                <div className='box'>
                    <label htmlFor='firstName'>First Name:</label>
                    <input type="text" title="test" id="firstName" value={values.firstName} required onChange={handleChangeValues} />
                </div>
                <div className='box'>
                    <label htmlFor='surname'>Surname:</label>
                    <input type="text" title="test" id="surname" value={values.surname} required onChange={handleChangeValues} />
                </div>
                <div className='box'>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" id="email" value={values.email} required onChange={handleChangeValues} />
                </div>
                <div className='box'>
                    <label htmlFor='country'>Country:</label>
                    <input type="text" id="country" value={values.country} required onChange={handleChangeValues} />
                </div>

                <div className='buttons'>
                    <button type='button' onClick={() => {
                        closeModal();
                        setValues({
                            id: "",
                            firstName: "",
                            surname: "",
                            email: "",
                            country: "",
                        })
                    }}>
                        Cancel
                    </button>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}