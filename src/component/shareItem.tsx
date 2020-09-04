import React, {Component, useContext, useState} from "react";
import '../style/global.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MyContext from "../context-store/myContext";
import clothingManagementRepository from "../repository/clothingManagementRepository";

const ShareItem = (props:any) => {

    const [formData, updateFormData] = React.useState({name: "", description: "", category:"", size:"", price: 0, address:"", date:"", number:""});
    const [fileData, updateFileData] = React.useState({photo: "", file: {}});
    const context:any = useContext(MyContext);

    const handleChange: any = (event: any) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    }

    const handleFileChange: any = (event: any) => {
        console.log(event.target.files[0]);
        updateFileData({
            photo: event.target.files[0].name,
            file: event.target.files[0]
        })
    }

    const onSubmit: any = (event: any) => {
        event.preventDefault();
        const name = formData.name;
        const description = formData.description;
        const category = formData.category;
        const size = formData.size;
        const price = formData.price;
        const file = fileData.file;
        const photo = fileData.photo;
        const address = formData.address;
        const date = formData.date;
        const number = formData.number;
        const username = context.activeUser.username;

        const data = new FormData();
        // @ts-ignore
        data.append("file", file);

        clothingManagementRepository.shareClothingItem(name, description, category, size, price, photo, address, date, number, username)
            .then((response: any) => {
                context.setModalShareItemHide();
                props.setSuccessModalShow();
            }, clothingManagementRepository.shareClothingItemPhoto(data))
            .catch((error: any) => {
                context.setModalShareItemHide();
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
        if(context.activeUser.address)
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
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Enter item name"
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" type="text" placeholder="Enter item description"
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control name="category" as="select" custom onChange={handleChange}>
                            <option value="0">Choose...</option>
                            <option value="JACKETS">JACKETS</option>
                            <option value="DRESSES">DRESSES</option>
                            <option value="SHIRTS">SHIRTS</option>
                            <option value="TOPS">TOPS</option>
                            <option value="TROUSERS">TROUSERS</option>
                            <option value="JEANS">JEANS</option>
                            <option value="SHORTS">SHORTS</option>
                            <option value="SKIRTS">SKIRTS</option>
                            <option value="SHOES">SHOES</option>
                            <option value="BAGS">BAGS</option>
                            <option value="SWIMWEAR">SWIMWEAR</option>
                            <option value="ACCESSORIES">ACCESSORIES</option>
                            <option value="SUITS">SUITS</option>
                            <option value="OTHER">OTHER</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicSize">
                        <Form.Label>Size</Form.Label>
                        <Form.Control name="size" as="select" custom onChange={handleChange}>
                            <option value="0">Choose...</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="OTHER">OTHER</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" type="text" placeholder="Enter item original price"
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.File
                            className="position-relative"
                            name="file"
                            label="Photo"
                            onChange={handleFileChange}
                            id="validationForm"
                            feedbackTooltip
                        />
                    </Form.Group>
                    <hr/>
                    {conditionalFormAddress()}
                    <Form.Group controlId="formBasicDate">
                        <Form.Label>Your desired date of item retrieval</Form.Label>
                        <Form.Control name="date" type="date" placeholder="Enter the date of item retrieval"
                                      onChange={handleChange}/>
                    </Form.Group>
                    {conditionalFormNumber()}
                    <Form.Group className="text-center">
                        <Button className="col-12 mt-2" type="submit" variant="dark">Submit</Button>
                    </Form.Group>
                </Form>
            );
    }

    return (
        <MyContext.Consumer>
            {(context: any) => (
                <>
                    <Modal show={context.modalShareItem} onHide={context.setModalShareItemHide} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Share Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {conditionalRendering()}
                        </Modal.Body>
                    </Modal>
                    <Modal show={props.showSuccessModal} onHide={props.setSuccessModalHide} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Success message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="small-title">
                                You have successfully shared your clothing item. It will be retrieved from you on the selected date.
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
                                An error occurred. You did not successfully share your clothing item. Try again!
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </MyContext.Consumer>
    );
};

export default ShareItem;