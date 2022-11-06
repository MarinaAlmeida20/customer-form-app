import { useLazyQuery, gql } from '@apollo/client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

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

export function ModalClient({ info, closeModal }: Props) {
    // Do get when I want
    const [getClient, getClientInfo] = useLazyQuery<{ client: Client }, { clientId: string }>(GET_CLIENT)


    const [values, setValues] = useState({
        id: "",
        firstName: "",
        surname: "",
        email: "",
        country: "",
    })

    // To fill up all the info above and edit
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
        // ?
    }

    async function handleEditClient() {
        // ?
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