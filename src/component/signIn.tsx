import React, {Component, useContext, useState} from "react";
import '../style/signin.css';
import google from '../assets/images/google.png';
import fb from '../assets/images/fb_1.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
// @ts-ignore
import authenticationRepository from "../repository/authenticationRepository";
import MyContext from "../context-store/myContext";

const SignIn = (props:any) => {

    const [formData, updateFormData] = React.useState({username: "", password: ""});
    const context:any = useContext(MyContext);

    const handleChange: any = (event: any) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    }

    const onSubmit: any = (event: any) => {
        event.preventDefault();
        const username = formData.username;
        const password = formData.password;
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        authenticationRepository.loginUser(data)
            .then((response: any) => {
                context.setModalSignInHide();
                context.setModalRegisterHide();
                context.setIsActiveUserPresentFalse();

                authenticationRepository.getActiveUser()
                    .then((response: any) => {
                        context.setActiveUser(response.data);
                        context.setIsActiveUserPresentTrue();
                    })
            }).catch((error: any) => console.log(error));
    }

    return (
       <MyContext.Consumer>
           {(context: any) => (
               <>
                   <Modal show={context.modalSignIn} onHide={context.setModalSignInHide} aria-labelledby="contained-modal-title-vcenter" centered>
                       <Modal.Header closeButton>
                           <Modal.Title>Sign In</Modal.Title>
                       </Modal.Header>
                       <Modal.Body>
                           <Form onSubmit={onSubmit} className="mr-1 ml-1">
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
                                   <Button className="col-12 mt-2" type="submit" variant="dark">Sign in</Button>
                               </Form.Group>
                               <hr/>
                               <Form.Control className="text-center" plaintext readOnly
                                             defaultValue="or sign in with social media"/>
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
                           <Navbar className="justify-content-end">
                               <Navbar.Text>Don't have an account yet?</Navbar.Text>
                               <Nav>
                                   <Nav.Link className="link" onClick={() => {
                                       context.setModalSignInHide();
                                       context.setModalRegisterShow();
                                   }}>Register</Nav.Link>
                               </Nav>
                           </Navbar>
                       </Modal.Body>
                   </Modal>
               </>
           )}
       </MyContext.Consumer>
    );
};

export default SignIn;