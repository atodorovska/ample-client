import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyContext from "../context-store/myContext";
import ClothingItem from "../domain/ClothingItem";

const MostRecentItems = () => {

    return (
        <MyContext.Consumer>
            {(context: any) => (
                <>
                    <Container className="mt-xl-3 mb-xl-5" style={{display: 'flex', justifyContent: 'center'}} fluid>
                        <Row className="col-xl-11">
                            {context.latestClothingItems?.map(
                                (element:ClothingItem, index:number) => {
                                    return (
                                       <Col className="col-lg-2">
                                           <Card className="mt-xl-5 ml-xl-1">
                                               <a className="custom-link" href={`/item-details/${element.id}`}>
                                                   <Card.Img variant="top" src={`http://localhost:8080/api/clothing/item/${element.photo}`} />
                                               </a>
                                               <Card.Body>
                                                   <Card.Title>{element.name}</Card.Title>
                                                   <Card.Text>
                                                       {element.description}
                                                   </Card.Text>
                                               </Card.Body>
                                               <Card.Footer>
                                                   <small className="text-muted">{element.category}</small>
                                               </Card.Footer>
                                           </Card>
                                       </Col>
                                    );
                                }
                            )}
                        </Row>
                    </Container>
                    <Container className="mt-xl-3 mb-xl-5" fluid>
                        <Row className="col-xl-11 justify-content-end text-right">
                            <Col className="col-lg-2">
                                <a className="custom-link-text small-title" href="/shared-items">See all shared items</a>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </MyContext.Consumer>
    );
}

export default MostRecentItems;