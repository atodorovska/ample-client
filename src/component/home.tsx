import React, {Component, useState} from "react";
import banner from '../assets/images/new.jpg';
import search from '../assets/images/search_white.png';
import discount from '../assets/images/discount_white.png';
import share from '../assets/images/share_white.png';
import Nav from "./navigation";
import '../style/home.css';
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

class Home extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
           <MyContext.Consumer>
               {context => (
                   <>
                       <Nav />
                       <SignIn />
                       <Register />
                       <Image className="banner" src={banner} fluid/>
                       <Container className="mt-xl-5" fluid>
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
                           <Row className="mt-3">
                               <Col className="col-xl-4 text-center">
                                   <Button href="/shared-items" variant="dark" size="lg">See shared items</Button>{' '}
                               </Col>
                               <Col className="col-xl-4 text-center">
                                   <Button variant="dark" size="lg">Start sharing</Button>{''}
                               </Col>
                               <Col className="col-xl-4 text-center">
                                   <Button href="/discounts" variant="dark" size="lg">Get discount</Button>{' '}
                               </Col>
                           </Row>
                       </Container>
                       <Container className="mt-xl-5" fluid>
                           <CardDeck>
                               <Card>
                                   <Card.Img variant="top" src={banner}/>
                                   <Card.Body>
                                       <Card.Title>Card title</Card.Title>
                                       <Card.Text>
                                           This is a wider card with supporting text below as a natural lead-in to
                                           additional content. This content is a little bit longer.
                                       </Card.Text>
                                   </Card.Body>
                                   <Card.Footer>
                                       <small className="text-muted">Last updated 3 mins ago</small>
                                   </Card.Footer>
                               </Card>
                               <Card>
                                   <Card.Img variant="top" src="holder.js/100px160"/>
                                   <Card.Body>
                                       <Card.Title>Card title</Card.Title>
                                       <Card.Text>
                                           This card has supporting text below as a natural lead-in to additional
                                           content.{' '}
                                       </Card.Text>
                                   </Card.Body>
                                   <Card.Footer>
                                       <small className="text-muted">Last updated 3 mins ago</small>
                                   </Card.Footer>
                               </Card>
                               <Card>
                                   <Card.Img variant="top" src="holder.js/100px160"/>
                                   <Card.Body>
                                       <Card.Title>Card title</Card.Title>
                                       <Card.Text>
                                           This is a wider card with supporting text below as a natural lead-in to
                                           additional content. This card has even longer content than the first to
                                           show that equal height action.
                                       </Card.Text>
                                   </Card.Body>
                                   <Card.Footer>
                                       <small className="text-muted">Last updated 3 mins ago</small>
                                   </Card.Footer>
                               </Card>
                           </CardDeck>
                       </Container>
                   </>
               )}
           </MyContext.Consumer>
        )
    }
}

export default Home;