import React, {useContext} from "react";
import MyContext from "../context-store/myContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import profileManagementRepository from "../repository/profileManagementRepository";

const EditProfile = (props: any) => {

    const [formData, updateFormData] = React.useState({text: ""});
    const context:any = useContext(MyContext);

    const handleChange: any = (event: any) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    }

    const onSubmit: any = (event: any) => {
        event.preventDefault();
        const text = formData.text;
        let address = "";
        let number = "";

        if(props.type === "Phone number"){
            number = text;
            address = "";
        }else {
            number = "";
            address = text;
        }

        profileManagementRepository.editProfile(address, number, context.activeUser.username)
            .then((response: any) => {
                props.hideModal();
                props.reload();
            }).catch((error: any) => {
                props.hideModal();
                context.setErrorTrue();
            });

    }

    const conditionalFormTitle = () => {
        if(props.add) return "Add"
        else return "Edit";
    }

    return (
        <MyContext.Consumer>
            {(context: any) => (
                <>
                    <Modal show={props.showModal} onHide={props.hideModal} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{conditionalFormTitle()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={onSubmit} className="mr-1 ml-1">
                                <Form.Group controlId="formBasicText">
                                    <Form.Label>{props.type}</Form.Label>
                                    <Form.Control name="text" type="text" placeholder="Enter value" onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="text-center">
                                    <Button className="col-12 mt-2" type="submit" variant="dark">Submit</Button>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    <Modal show={context.error} onHide={context.setErrorFalse} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Error message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="small-title">
                                An error occurred. You did not successfully update your profile information. Try again!
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </MyContext.Consumer>
    );
}

export default EditProfile;