import { Form } from 'react-bootstrap';

type Props = {
    username: string,
    password: string,
    onChange: (username: string, password: string) => void
}


const LoginForm = (props: Props) => {
    const handleChange = (username: string, password: string) => {
        props.onChange(username, password);
    }

    return (
        <>
            <Form.Label htmlFor='inputUserName'>Username</Form.Label>
            <Form.Control
                type="text"
                id="inputUsername"
                value={props.username}
                onChange={evt => handleChange && handleChange(evt.target.value, props.password)}
            />
            
            <Form.Label htmlFor='inputPasswordHelpBlock'>Password</Form.Label>
            <Form.Control
                type="text"
                id="inputPasssord"
                value={props.password}
                onChange={evt => handleChange && handleChange(props.username, evt.target.value)}
            />
            <Form.Text id="inputPasswordHelpBlock" muted>
                Required
            </Form.Text>
        </>
    );
}

export default LoginForm;