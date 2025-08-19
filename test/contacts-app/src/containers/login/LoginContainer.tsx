import { useEffect, useState } from "react"
import { Button, Row, Col } from 'react-bootstrap';
import LoginForm from "../../components/forms/login-form/LoginForm";
import { getContacts } from "../../services/ContactService";
import { login, logout } from '../../services/AuthService';

type Props = {

};

type LoginInfo = {
    username: string,
    password: string
};

const LoginContainer = (props: Props) => {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({ username: '', password: ''});

    useEffect(() => {
        console.log("state: ", loginInfo);
    }, [loginInfo]);

    const handleChange = (username: string, password: string) => {
        setLoginInfo({
            ...loginInfo, 
            username, 
            password}
        );
    }

    const handleGetContactsClic = async () => {
        const contacts = await getContacts();
        console.log("We Got: ", contacts)
    }

    const handleLoginClick = async () => {
        console.log("Logging in...", loginInfo);
        await login(loginInfo.username, loginInfo.password)
    }

    const handleLogoutClick = async () => {
        await logout();
    }
    
    return (
        <>
            <h2>Login</h2>       
            <LoginForm username={loginInfo.username} password={loginInfo.password} onChange={handleChange} />
            <Row>
                <Col>
                    <Button onClick={handleGetContactsClic} variant="secondary">Getcontacts</Button>
                    <Button 
                        onClick={handleLoginClick}
                        disabled={loginInfo.username === '' || loginInfo.password === ''}
                        variant="primary"
                    >
                        Login
                    </Button>
                    <Button onClick={handleLogoutClick} variant="secondary">Log out</Button>
                </Col>
            
            <h1>
                ENV: {`${import.meta.env.VITE_API_BASE_SCHEMA}:${import.meta.env.VITE_API_BASE_URL}`}
            </h1>
            </Row>
        </>
    )
}

export default LoginContainer;