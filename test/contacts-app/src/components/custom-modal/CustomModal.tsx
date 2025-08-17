import type { PropsWithChildren  } from 'react';
import { Modal, Button } from 'react-bootstrap';

type Action = {
    label: string,
    name?: string,
    variant?: string,
    style?: React.CSSProperties,
    callback?: () => void
}

type Props = {
    show: boolean,
    handleClose?: () => void,
    actions: Array<Action>
}

const CustomModal = (props: PropsWithChildren<Props>) => {
    const handleClose = () => {
        if(props.handleClose) {
            props.handleClose();
        }
        console.log("Handling close");
    }

    return (
        <Modal show={props.show} onClick={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {
                    (props.actions?? []).map(action =>
                        <Button 
                            key={action.name ?? action.label}
                            variant={action.variant ?? "secondary"} 
                            onClick={() => action.callback && action.callback()}
                            style={action.style}
                        >
                            {action.label}
                        </Button>
                    )
                }
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;