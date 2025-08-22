import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createContact, deleteContact, fetchContacts } from "../../redux/slices/contact/contactSlice";
import { selectContacts } from "../../redux/slices/contact/selectors";
import { Button } from "react-bootstrap";


const ContactContainer = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContacts);

    useEffect(() => {
        // Fetch contacts when the component mounts
        dispatch(fetchContacts());
    }, []);
    return (
        <>
            <h2>Contacts</h2>
            Contacts
            <hr />
            <Button onClick={() => dispatch(fetchContacts())} variant="secondary">Refresh</Button>
            <Button
                onClick={() => dispatch(createContact({ firstName: `New ${contacts.length + 1}`, lastName: "Contact" }))}
                variant="primary">Create Contact
            </Button>
            <div>
                {contacts && contacts.map(contact => (
                    <div key={contact.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h3>{contact.firstName}</h3>
                        <p>{contact.lastName}</p>
                        <Button
                            onClick={() => dispatch(deleteContact(contact.id))}
                            variant="danger"
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ContactContainer;