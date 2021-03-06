import React, {useContext} from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyContext from "../context-store/myContext";
import ClothingItem from "../domain/clothingItem";

const MostRecentItems = () => {

    const context:any = useContext(MyContext);

    const conditionalRenderingItem = (element: ClothingItem) => {
        if(context.isActiveUserPresent)
            return (
                <a className="custom-link link" href={`/item-details/${element.id}`}>
                    <Card.Img variant="top" src={`http://localhost:8080/api/clothing/item/${element.photo}`} />
                </a>
            );
        else return (
            <a className="custom-link link" onClick={context.setModalSignInShow}>
                <Card.Img variant="top" src={`http://localhost:8080/api/clothing/item/${element.photo}`} />
            </a>
        )
    }

    const conditionalRenderingListItems = () => {
        if(context.isActiveUserPresent)
            return <a className="custom-link-text small-title link" href="/shared-items">See all shared items</a>;
        else return <a className="custom-link-text small-title link" onClick={context.setModalSignInShow}>See all shared items</a>
    }

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
                                               {conditionalRenderingItem(element)}
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
                                {conditionalRenderingListItems()}
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </MyContext.Consumer>
    );
}

export default MostRecentItems;