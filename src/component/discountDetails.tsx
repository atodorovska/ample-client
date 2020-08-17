import React, {Component, useContext} from "react";
import Nav from "./navigation";
import MyContext from "../context-store/myContext";
import {Page, Text, View, Document, PDFDownloadLink, Image} from '@react-pdf/renderer';
import Home from "./home";
import BrandDiscount from "../domain/brandDiscount";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import discountsManagementRepository from "../repository/discountsManagementRepository";
import authenticationRepository from "../repository/authenticationRepository";
import logoPDF from "../assets/images/logo_big_black.png";
import Button from "react-bootstrap/esm/Button";

interface IState {
    discount: BrandDiscount,
    userName: string,
    currentUserPoints: number,
    previousUserPoints: number,
    discountTransactionCode: string,
    showPdfLink: boolean
}

class DiscountDetails extends Component<any, IState>{

    static contextType = MyContext;

    constructor(props: any) {
        super(props);

        this.state = {
            discount: {} as BrandDiscount,
            currentUserPoints: 0,
            previousUserPoints: 0,
            userName: "",
            discountTransactionCode: "",
            showPdfLink: false
        }
    }

    componentDidMount() {
        discountsManagementRepository.getDiscountDetails(this.props.match.params.id)
            .then((response: any) => {
                this.setState({
                    discount: response.data
                })
            });

        authenticationRepository.getActiveUser()
            .then((response: any) => {
                this.setState({
                    userName: response.data.username
                });
                discountsManagementRepository.calculatePersonPoints(response.data.username)
                    .then((response: any) => {
                        this.setState({
                            currentUserPoints: response.data,
                            previousUserPoints: response.data
                        })
                    });
            })
    }

    conditionalGetDiscount() {
        if((this.state.currentUserPoints >= this.state.discount.points && this.state.showPdfLink) || (this.state.previousUserPoints >= this.state.discount.points && this.state.showPdfLink))
                return (
                    <ListGroup.Item className="background-white small-title">
                        <PDFDownloadLink className="custom-link-text" document={
                            (
                                <Document title="Ample Company Discount Coupon">
                                    <Page size="A4">
                                        <View style={{margin: 20}}>
                                            <Image style={{width: "160rem"}} src={logoPDF}/>
                                        </View>
                                        <View>
                                            <Text style={{margin: 20, color: '#e62739'}}>Discount coupon ID:</Text>
                                            <Text style={{margin: 20}}>{this.state.discountTransactionCode}</Text>
                                            <Text style={{margin: 20, color: '#e62739'}}>Brand:</Text>
                                            <Text style={{margin: 20}}>{this.state.discount.name}</Text>
                                            <Text style={{margin: 20, color: '#e62739'}}>Discount:</Text>
                                            <Text style={{margin: 20}}>{this.state.discount.discount}%</Text>
                                            <Text style={{margin: 20, color: '#e62739'}}>This discount coupon was issued
                                                to:</Text>
                                            <Text style={{margin: 20}}>{this.state.userName}</Text>
                                            <Text style={{margin: 20, color: '#e62739'}}>The details of the coupon usage are
                                                as follows:</Text>
                                            <Text style={{margin: 20}}>{this.state.discount.description}</Text>
                                        </View>
                                        <View style={{margin: 20}}>
                                            <Image style={{width: "160rem"}} src={logoPDF}/>
                                        </View>
                                    </Page>
                                </Document>
                            )
                        }fileName="ample-discount.pdf">
                            {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Click here to download the discount coupon!')}
                        </PDFDownloadLink>
                    </ListGroup.Item>
                );
            else if(this.state.currentUserPoints >= this.state.discount.points)
                return(
                    <Button size="lg" variant="dark" className="red-button ml-xl-5" onClick={() =>
                    {
                        discountsManagementRepository.createDiscountsTransaction(this.state.discount.id, this.context.activeUser.username)
                            .then((response: any) => {
                                this.setState({
                                    discountTransactionCode: response.data,
                                    showPdfLink: true
                                });

                                discountsManagementRepository.calculatePersonPoints(this.state.userName)
                                    .then((response: any) => {
                                        this.setState({
                                            currentUserPoints: response.data
                                        })
                                    });
                            });
                    }}>Get discount</Button>
                );
            else return (
                <ListGroup.Item className="background-white small-title">
                    <span>You do not have enough points to get this discount. Earn more points by sharing an item of your clothing!</span>
                </ListGroup.Item>
            );

    }

    conditionalRendering() {
        if(this.context.isActiveUserPresent){
            return (
                <>
                    <Nav/>
                    <Container className="mt-xl-4 mb-xl-3" style={{display: 'flex', justifyContent: 'center'}} fluid>
                        <Row className="col-xl-8">
                            <Col className="col-xl-6">
                                <img className="discount-details-image ml-xl-5" src={`http://localhost:8080/api/discounts/item/${this.state.discount.photo}`} />
                            </Col>
                            <Col className="col-xl-5 ml-xl-5" style={{display: 'flex', justifyContent: 'center'}}>
                                <ListGroup className="ml-xl-5 mt-xl-5" variant="flush">
                                    <ListGroup.Item className="background-white medium-title text-bold list-title-height">{this.state.discount.name}</ListGroup.Item>
                                    <ListGroup.Item className="background-white small-title">
                                        <div className="color-red">Description</div>
                                        <div className="mt-xl-4">{this.state.discount.description}</div>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="background-white list-item-height small-title">
                                        <div className="color-red">Discount</div>
                                        <div className="mt-xl-4">{this.state.discount.discount}%</div>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="background-white list-item-height small-title">
                                        <div className="color-red">Points needed</div>
                                        <div className="mt-xl-4">{this.state.discount.points} points</div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="mt-xl-5 mb-xl-3" style={{display: 'flex', justifyContent: 'center'}} fluid>
                        <ListGroup variant="flush" horizontal>
                            <ListGroup.Item className="background-white medium-title">
                                <span className="color-red">You currently have </span>
                                <span>{this.state.currentUserPoints} points</span>
                            </ListGroup.Item>
                            {this.conditionalGetDiscount()}
                        </ListGroup>
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

export default DiscountDetails;