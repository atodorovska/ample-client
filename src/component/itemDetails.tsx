import React, {Component, useContext} from "react";
import MyContext from "../context-store/myContext";
import ClothingItem from "../domain/clothingItem";
import clothingManagementRepository from "../repository/clothingManagementRepository";
import Home from "./home";
import Nav from "./navigation";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/esm/Image";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/esm/Button";
import GetItem from "./getItem";
import authenticationRepository from "../repository/authenticationRepository";

interface IState {
    clothingItem: ClothingItem,
    showGetItemModal: boolean,
    showSuccessModal: boolean,
    username: string
}

class ItemDetails extends Component<any, IState>{

    static contextType = MyContext;

    constructor(props: any) {
        super(props);

        this.state = {
            clothingItem: {} as ClothingItem,
            showGetItemModal: false,
            showSuccessModal: false,
            username: ""
        }

        this.showGetItemModal = this.showGetItemModal.bind(this);
        this.setGetItemModalHide = this.setGetItemModalHide.bind(this);
        this.setSuccessModalShow = this.setSuccessModalShow.bind(this);
        this.setSuccessModalHide = this.setSuccessModalHide.bind(this);
    }

    componentDidMount() {
        this.context.setErrorFalse();

        authenticationRepository.getActiveUser()
            .then((response: any) => {
                this.setState({
                    username: response.data.username
                })
            })

        clothingManagementRepository.getClothingItemDetails(this.props.match.params.id)
            .then((response: any) => {
                this.setState({
                    clothingItem: response.data
                })
            });
    }

    setGetItemModalHide() {
        this.setState({
            showGetItemModal: false
        })
    }

    showGetItemModal() {
        this.setState({
            showGetItemModal: true
        })
    }

    setSuccessModalShow() {
        this.setState({
            showSuccessModal: true
        })
    }

    setSuccessModalHide() {
        this.setState({
            showSuccessModal: false
        })
    }

    conditionalRendering() {
        if(this.state.username !== ""){
            return (
                <>
                    <Nav/>
                    <GetItem itemId={this.state.clothingItem.id} showGetItemModal={this.state.showGetItemModal} setGetItemModalHide={this.setGetItemModalHide}
                            showSuccessModal={this.state.showSuccessModal} setSuccessModalShow={this.setSuccessModalShow} setSuccessModelHide={this.setSuccessModalHide}/>
                    <Container className="mt-xl-3 mb-xl-3" style={{display: 'flex', justifyContent: 'center'}} fluid>
                        <Row className="col-xl-8">
                            <Col className="col-xl-6">
                                <Image className="item-details-image ml-xl-5" src={`http://localhost:8080/api/clothing/item/${this.state.clothingItem.photo}`} />
                            </Col>
                            <Col className="col-xl-5 ml-xl-5" style={{display: 'flex', justifyContent: 'center'}}>
                                <ListGroup className="ml-xl-5 mt-xl-5" variant="flush">
                                    <ListGroup.Item className="background-white medium-title text-bold list-title-height">{this.state.clothingItem.name}</ListGroup.Item>
                                    <ListGroup.Item className="background-white small-title">
                                        <div className="color-red">Description</div>
                                        <div className="mt-xl-4">{this.state.clothingItem.description}</div>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="background-white list-item-height small-title">
                                        <div className="color-red">Category</div>
                                        <div className="mt-xl-4">{this.state.clothingItem.category}</div>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="background-white list-item-height small-title">
                                        <div className="color-red">Size</div>
                                        <div className="mt-xl-4">{this.state.clothingItem.size}</div>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="background-white list-item-height small-title">
                                        <div className="color-red">Original price</div>
                                        <div className="mt-xl-4">{this.state.clothingItem.price} MKD</div>
                                    </ListGroup.Item>
                                    <Button variant="dark" className="red-button mt-xl-5 ml-xl-2 mr-xl-2" onClick={this.showGetItemModal}>Get shared item</Button>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
        }
        else return <Home />;
    }

    render() {
        return(
           <>
               {this.conditionalRendering()}
           </>
        )
    }
};

export default ItemDetails;