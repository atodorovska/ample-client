import React, {Component, useContext, useState} from "react";
import '../style/signin.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MyContext from "../context-store/myContext";
import clothingManagementRepository from "../repository/clothingManagementRepository";

const ShareItem = (props:any) => {

    const [formData, updateFormData] = React.useState({name: "", description: "", category:"", size:"", price: 0});
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

        const data = new FormData();
        // @ts-ignore
        data.append("file", file);

        clothingManagementRepository.shareClothingItem(name, description, category, size, price, photo)
            .then((response: any) => {
               context.setModalShareItemHide();
            }, clothingManagementRepository.shareClothingItemPhoto(data)).catch((error: any) => console.log(error));

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
                            <Form onSubmit={onSubmit} className="mr-1 ml-1" >
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
                                        <option value="1">JACKETS</option>
                                        <option value="2">DRESSES</option>
                                        <option value="3">SHIRTS</option>
                                        <option value="4">TOPS</option>
                                        <option value="5">TROUSERS</option>
                                        <option value="6">JEANS</option>
                                        <option value="7">SHORTS</option>
                                        <option value="8">SKIRTS</option>
                                        <option value="9">SHOES</option>
                                        <option value="10">BAGS</option>
                                        <option value="11">SWIMWEAR</option>
                                        <option value="12">ACCESSORIES</option>
                                        <option value="13">SUITS</option>
                                        <option value="14">OTHER</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicSize">
                                    <Form.Label>Size</Form.Label>
                                    <Form.Control name="size" as="select" custom onChange={handleChange}>
                                        <option value="0">Choose...</option>
                                        <option value="1">XS</option>
                                        <option value="2">S</option>
                                        <option value="3">M</option>
                                        <option value="4">L</option>
                                        <option value="5">XL</option>
                                        <option value="6">OTHER</option>
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
                                <Form.Group className="text-center">
                                    <Button className="col-12 mt-2" type="submit" variant="dark">Submit</Button>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </MyContext.Consumer>
    );
};

export default ShareItem;