import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import MyContext from "../context-store/myContext";
import Row from "react-bootstrap/Row";
import ClothingItem from "../domain/ClothingItem";
import Col from "react-bootstrap/Col";
import BrandDiscount from "../domain/BrandDiscount";


const MostRecentDiscounts = () => {
    return (
        <MyContext.Consumer>
            {(context: any) => (
                <>
                    <Container className="mt-xl-3 mb-xl-3" style={{display: 'flex', justifyContent: 'center'}} fluid>
                        <Row className="col-xl-11">
                            {context.latestDiscounts?.map(
                                (element:BrandDiscount, index:number) => {
                                    return (
                                        <Col className="col-lg-2">
                                            <Card className="mt-xl-5 ml-xl-1">
                                                <a className="custom-link" href={`/discount-details/${element.id}`}>
                                                    <Card.Img variant="top" src={`http://localhost:8080/api/clothing/item/${element.photo}`} />
                                                </a>
                                                <Card.Footer>
                                                    <small className="text-muted">{element.discount}%</small>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    );
                                }
                            )}
                        </Row>
                    </Container>
                    <Container className="mt-xl-5 mb-xl-5" fluid>
                        <Row className="col-xl-11 justify-content-end text-right">
                            <Col className="col-lg-2">
                                <a className="custom-link-text small-title" href="/discounts">See all discounts</a>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </MyContext.Consumer>
    );
}

export default MostRecentDiscounts;