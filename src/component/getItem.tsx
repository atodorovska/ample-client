import React, {Component, useContext, useState} from "react";
import '../style/global.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MyContext from "../context-store/myContext";
import clothingManagementRepository from "../repository/clothingManagementRepository";
import Home from "./home";

const GetItem = (props:any) => {

    const [formData, updateFormData] = React.useState({address:"", date:"", number:""});
    const context:any = useContext(MyContext);

    const handleChange: any = (event: any) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    }

    const onSubmit: any = (event: any) => {
        event.preventDefault();
        const address = formData.address;
        const date = formData.date;
        const number = formData.number;
        const username = context.activeUser.username;

        clothingManagementRepository.getClothingItem(address, date, number, username, props.itemId)
            .then(() => {
                props.setGetItemModalHide();
                props.setSuccessModalShow();
            })
            .catch((error: any) => {
                props.setGetItemModalHide();
                context.setErrorTrue();
            });
    }

    const conditionalFormAddress = () => {
        if(context.activeUser.address)
            return  (
                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Your address</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={context.activeUser.address}/>
                </Form.Group>
            );
        else return(
            <Form.Group controlId="formBasicAddress">
                <Form.Label>Your address</Form.Label>
                <Form.Control name="address" type="text" placeholder="Enter your current address"
                              onChange={handleChange}/>
            </Form.Group>
        );
    }

    const conditionalFormNumber = () => {
        if(context.activeUser.number)
            return  (
                <Form.Group controlId="formBasicContactNumber">
                    <Form.Label>Your contact phone number</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={context.activeUser.number}/>
                </Form.Group>
            );
        else return(
            <Form.Group controlId="formBasicContactNumber">
                <Form.Label>Your contact phone number</Form.Label>
                <Form.Control name="number" type="text" placeholder="Enter your contact phone number"
                              onChange={handleChange}/>
            </Form.Group>
        );
    }

    const conditionalRendering = () => {
        if(context.isActiveUserPresent)
            return (
                <Form onSubmit={onSubmit} className="mr-1 ml-1">
                    {conditionalFormAddress()}
                    <Form.Group controlId="formBasicDate">
                        <Form.Label>Your desired date of item delivery</Form.Label>
                        <Form.Control name="date" type="date" placeholder="Enter the date of item retrieval"
                                      onChange={handleChange}/>
                    </Form.Group>
                    {conditionalFormNumber()}
                    <Form.Group className="text-center">
                        <Button className="col-12 mt-2" type="submit" variant="dark">Submit</Button>
                    </Form.Group>
                </Form>
            );
        else return <Home/>
    }

    return (
        <MyContext.Consumer>
            {(context: any) => (
                <>
                    <Modal show={props.showGetItemModal} onHide={props.setGetItemModalHide} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Get Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {conditionalRendering()}
                        </Modal.Body>
                    </Modal>
                    <Modal show={props.showSuccessModal} onHide={props.setSuccessModelHide} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Success message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="small-title">
                                You have successfully placed your order. The clothing item will be delivered to you on the selected date.
                                We will contact you to make sure you are at the address provided.
                            </div>
                        </Modal.Body>
                    </Modal>
                    <Modal show={context.error} onHide={context.setErrorFalse} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Error message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="small-title">
                                An error occurred. You did not successfully get this clothing item. Try again!
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </MyContext.Consumer>
    );
};

export default GetItem;