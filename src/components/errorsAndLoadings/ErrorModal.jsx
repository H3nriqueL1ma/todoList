import { Modal } from "react-bootstrap";

export default function ErrorModal ({ show, handleClose, text }) {
    return (
        <>
            <Modal 
                show={show} 
                onHide={handleClose} 
            >
                <Modal.Header closeButton style={ {border: "none"} } className="d-flex justify-content-around align-items-center text-center">
                    <i 
                        className="bi bi-exclamation-triangle pe-1 ps-2"
                        style={ {color: "yellow", fontSize: "30px"} }
                    ></i>
                    <div id="modal-text" className="text-center">{text}</div>
                </Modal.Header>
            </Modal>
        </>
    );
}