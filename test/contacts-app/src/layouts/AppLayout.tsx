import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import MainToolbar from './parts/MainToolbar';
import CustomModal from '../components/custom-modal/CustomModal';
import LoginContainer from '../containers/login/LoginContainer';

type Props = {
    title?: string;
};

const buttonStyle = { width: '80px' };

export default function AppLayout (props : PropsWithChildren<Props>) {
    const [modalShow, setModalShow] = useState<boolean>(false);

    const handleShowCustomModal = () => {
        setModalShow(true);
    }
    const handleCloseCustomModal = () => {
        setModalShow(false);
    }

    return (
        <>
            <MainToolbar />
            <Container >
                <Button onClick={handleShowCustomModal}>ShowModal</Button>
                <div>Hola Mundo: {props.title}</div>

                <LoginContainer />

                <CustomModal 
                    show={modalShow} 
                    handleClose={handleCloseCustomModal}
                    actions={[
                        {
                            label: 'Cancel',
                            name: 'cancel',
                            callback: handleCloseCustomModal,
                            style: buttonStyle
                        },
                        {
                            label: 'Ok',
                            name: 'ok',
                            variant: 'primary',
                            callback: handleCloseCustomModal,
                            style: buttonStyle
                        }
                    ]}
                >
                    <h1>Hello</h1>
                </CustomModal>
                <>{props.children}</>
            </Container>
        </>
    );
}
