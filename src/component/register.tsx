import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import google from "../assets/images/google.png";
import fb from "../assets/images/fb_1.png";
import authenticationRepository from "../repository/authenticationRepository";
import MyContext from "../context-store/myContext";

const Register = (props: any) => {

    const [formData, updateFormData] = React.useState({username: "", password: "", email: ""});
    const context:any = useContext(MyContext);

    const handleChange: any = (event: any) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim(),
            [event.target.email]: event.target.value.trim()
        });
    }

    const onSubmit: any = (event: any) => {
        event.preventDefault();
        const username = formData.username;
        const password = formData.password;
        const email = formData.email;
        authenticationRepository.registerUser(username, password, email)
            .then(() => {
                context.setModalRegisterHide()
            }).catch((error: any) => console.log(error));
    }

    return (
        <>
            <MyContext.Consumer>
                {(context:any) => (
                    <Modal show={context.modalRegister} onHide={context.setModalRegisterHide} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Register</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={onSubmit} className="mr-1 ml-1">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="Email" onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control name="username" type="text" placeholder="Enter username"
                                                  onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Password"
                                                  onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="text-center">
                                    <Button className="col-12 mt-2" type="submit" variant="dark">Register</Button>
                                </Form.Group>
                                <hr/>
                                <Form.Control className="text-center" plaintext readOnly
                                              defaultValue="or register with social media"/>
                                <Row className="mt-xl-1">
                                    <Form.Group className="text-center col-6">
                                        <Button href="http://localhost:8080/api/login/google" className="m-2 col-9"
                                                variant="outline-dark">
                                            <Image src={google} fluid/>
                                            <span className="ml-2">Google</span>
                                        </Button>
                                    </Form.Group>
                                    <Form.Group className="text-center col-6">
                                        <Button href="http://localhost:8080/api/login/facebook" className="m-2 col-9"
                                                variant="outline-dark">
                                            <Image src={fb} fluid/>
                                            <span className="ml-2">Facebook</span>
                                        </Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Modal.Body>
                    </Modal>
                )}
            </MyContext.Consumer>
        </>
    )
};

export default Register;