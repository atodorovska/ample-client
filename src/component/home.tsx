import React, {Component, useState} from "react";
import banner from '../assets/images/new.jpg';
import bannerLogo from '../assets/images/banner-logo.png';
import search from '../assets/images/search_white.png';
import discount from '../assets/images/discount_white.png';
import share from '../assets/images/share_white.png';
import Nav from "./navigation";
import '../style/global.css';
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SignIn from "./signIn";
import Register from "./register";
import MyContext from "../context-store/myContext";
import MostRecentItems from "./mostRecentItems";
import MostRecentDiscounts from "./mostRecentDiscounts";
import SiteMap from "./siteMap";
import ShareItem from "./shareItem";

interface IState {
    showSuccessModal: boolean
}

class Home extends Component<any, IState>{

    static contextType = MyContext;

    constructor(props: any) {
        super(props);

        this.state = {
            showSuccessModal: false
        }
        this.setSuccessModalShow = this.setSuccessModalShow.bind(this);
        this.setSuccessModalHide = this.setSuccessModalHide.bind(this);
    }

    componentDidMount() {
        this.context.setErrorFalse();
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
        if(this.context.isActiveUserPresent)
            return(
               <>
                   <Col className="col-xl-4 text-center">
                       <Button href="/shared-items" variant="dark" size="lg">See shared items</Button>{' '}
                   </Col>
                   <Col className="col-xl-4 text-center">
                       <Button variant="dark" size="lg" onClick={this.context.setModalShareItemShow}>Start sharing</Button>{''}
                   </Col>
                   <Col className="col-xl-4 text-center">
                       <Button href="/discounts" variant="dark" size="lg">Get discount</Button>{' '}
                   </Col>
               </>
            );
        else return (
            <>
                <Col className="col-xl-4 text-center">
                    <Button onClick={this.context.setModalSignInShow} variant="dark" size="lg">See shared items</Button>{' '}
                </Col>
                <Col className="col-xl-4 text-center">
                    <Button variant="dark" size="lg" onClick={this.context.setModalSignInShow}>Start sharing</Button>{''}
                </Col>
                <Col className="col-xl-4 text-center">
                    <Button onClick={this.context.setModalSignInShow} variant="dark" size="lg">Get discount</Button>{' '}
                </Col>
            </>
        )
    }

    render() {
        return (
           <MyContext.Consumer>
               {(context: any) => (
                   <>
                       <Nav />
                       <SignIn />
                       <Register />
                       <ShareItem showSuccessModal={this.state.showSuccessModal} setSuccessModalShow={this.setSuccessModalShow} setSuccessModalHide={this.setSuccessModalHide}/>
                       <Image className="banner" src={banner} fluid />
                       <Image className="banner-logo" src={bannerLogo}/>
                       <Button className="banner-button" href="#learn" variant="dark" size="lg">How to start sharing?</Button>{' '}
                       <Container className="mt-xl-4 mh-50 col-xl-11" fluid>
                           <Row>
                               <Col className="col-xl-4 text-center">
                                   <Image src={search}/>
                               </Col>
                               <Col className="col-xl-4 text-center">
                                   <Image src={share}/>
                               </Col>
                               <Col className="col-xl-4 text-center">
                                   <Image src={discount}/>
                               </Col>
                           </Row>
                           <Row className="mt-xl-2">
                               {this.conditionalRendering()}
                           </Row>
                       </Container>
                       <Container id="learn" className="mt-xl-5 text-banner background-black" style={{display: 'flex', justifyContent: 'center'}} fluid>
                           <CardDeck className="col-xl-11">
                               <Card className="col-xl-6 mt-xl-5 mb-xl-5 text-black">
                                   <Card.Body>
                                       <Card.Title className="title color-purple">Why should I give clothing away?</Card.Title>
                                       <Card.Text>
                                           The fashion industry is the second largest polluter worldwide.
                                           To help solve this problem, clothing should be reused as much as possible.
                                           Giving clothing away helps the environment, while also helping people who can not afford
                                           to buy new clothing. Our platform offers an easy way to give away some of you unused clothing,
                                           so that you can help other people and the environment. Additionally, for every donation you make,
                                           you get points, which can be used on the platform.{' '}
                                       </Card.Text>
                                   </Card.Body>
                               </Card>
                               <Card className="col-xl-3 mb-xl-5 mt-xl-5">
                                   <Card.Body>
                                       <Card.Title className="title color-green">How to give clothing away?</Card.Title>
                                       <Card.Text>
                                           Click on the 'start sharing' button and fill out the form. Make sure that the time and address you
                                           enter are correct and that's it! Our team will pick up the package from your home and bring it to someone who
                                           needs it. As easy as that! Try it out now!{' '}
                                       </Card.Text>
                                   </Card.Body>
                               </Card>
                               <Card className="col-xl-3 mb-xl-5 mt-xl-5">
                                   <Card.Body>
                                       <Card.Title className="title color-green">How to use my points?</Card.Title>
                                       <Card.Text>
                                           All of your points can be used on the platform, as a currency that gets you discount in the stores of the brands
                                           we collaborate with. Go to the Discounts page, or click on the 'get discount' button to see all the available discount coupons.
                                           Click on the coupon you want - and that's it!{' '}
                                       </Card.Text>
                                   </Card.Body>
                               </Card>
                           </CardDeck>
                       </Container>
                       <Container className="text-explain-banner text-center lead" fluid>
                           <div className="mt-xl-5">See most recently shared items</div>
                       </Container>
                       <MostRecentItems/>
                       <hr className="col-xl-11 mt-xl-5"/>
                       <Container className="text-explain-banner text-center lead" fluid>
                           <div className="mt-xl-5">See most recently added discounts</div>
                       </Container>
                       <MostRecentDiscounts/>
                       <SiteMap/>
                   </>
               )}
           </MyContext.Consumer>
        )
    }
}

export default Home;