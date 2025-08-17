import { useEffect, useState } from "react"
import { Button, Row } from 'react-bootstrap';
import LoginForm from "../../components/forms/login-form/LoginForm";

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
    
    return (
        <>
            <h2>Login</h2>       
            <LoginForm username={loginInfo.username} password={loginInfo.password} onChange={handleChange} />
            <Row>
            <Button className="float-right" variant="secondary">Cancel</Button>
            <Button className="pull-right" variant="primary">Login</Button>
            </Row>
        </>
    )
}

export default LoginContainer;