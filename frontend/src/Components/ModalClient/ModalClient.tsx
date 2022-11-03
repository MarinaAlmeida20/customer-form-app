import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Overlay, Content } from "./ModalClientStyle"

interface Props {
    info: {
        open: boolean;
        isEdit: boolean;
        currentId: string;
    };
    closeModal: () => void;
}

export function ModalClient({ info, closeModal }: Props) {
    const [values, setValues] = useState({
        id: "",
        firstName: "",
        surname: "",
        email: "",
        country: "",
    })

    // To fill up all the info above
    useEffect(() => {
        if (!info.isEdit) return;

        // ? recuperar os dados do client

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
        <>
            <Overlay>
                <Content>
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
                </Content>
            </Overlay>
        </>
    )
}