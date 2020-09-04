import React, {useContext} from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import MyContext from "../context-store/myContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BrandDiscount from "../domain/brandDiscount";


const MostRecentDiscounts = () => {

    const context:any = useContext(MyContext);

    const conditionalRenderingItem = (element: BrandDiscount) => {
        if(context.isActiveUserPresent)
            return (
                <a className="custom-link link" href={`/discount-details/${element.id}`}>
                    <Card.Img variant="top" src={`http://localhost:8080/api/discounts/item/${element.photo}`} />
                </a>
            );
        else return (
            <a className="custom-link link" onClick={context.setModalSignInShow}>
                <Card.Img variant="top" src={`http://localhost:8080/api/discounts/item/${element.photo}`} />
            </a>
        )
    }

    const conditionalRenderingListItems = () => {
        if(context.isActiveUserPresent)
            return <a className="custom-link-text small-title link" href="/discounts">See all discounts</a>;
        else return <a className="custom-link-text small-title link" onClick={context.setModalSignInShow}>See all discounts</a>


    }

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
                                                {conditionalRenderingItem(element)}
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
                                {conditionalRenderingListItems()}
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </MyContext.Consumer>
    );
}

export default MostRecentDiscounts;