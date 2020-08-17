import React, {Component, useContext} from "react";
import Nav from "./navigation";
import MyContext from "../context-store/myContext";
import Home from "./home";
import clothingManagementRepository from "../repository/clothingManagementRepository";
import Pagination from "react-bootstrap/Pagination";
import ClothingItem from "../domain/clothingItem";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BrandDiscount from "../domain/brandDiscount";
import discountsManagementRepository from "../repository/discountsManagementRepository";

// change value when needed
const NUM_PAGES = 7;
const NUM_ITEMS = 8;

interface IState {
    pages: number,
    current: number,
    items: number,
    currentItems: BrandDiscount[]
}

class Discounts extends Component<any, IState>{

    static contextType = MyContext;

    constructor(props: any) {
        super(props);

        this.state = {
            pages: NUM_PAGES,
            current: 1,
            items: NUM_ITEMS,
            currentItems: []
        }
    }

    render() {
        return(
            <>
                {this.conditionalRendering()}
            </>
        )
    }

    componentDidMount() {
        discountsManagementRepository.allDiscounts(this.state.current, this.state.items)
            .then((response:any) => {
                this.setState({
                    currentItems: response.data
                })
            })
    }

    paginationHandler(position: number) {

        if(position === -1) {
            position = this.state.current - 1;
            this.setState((prev) => ({
                current: prev.current - 1
            }));
        }

        else if(position === 0){
            position = this.state.current + 1;
            this.setState((prev) => ({
                current: prev.current + 1
            }));
        }

        else this.setState((prev) => ({
                current: position
            }));

        discountsManagementRepository.allDiscounts(position, this.state.items)
            .then((response:any) => {
                this.setState({
                    currentItems: response.data
                })
            })
    }

    paginationItemGenerator() {
        let itemsBody = [];

        for(let i=1; i<=7; i++){
            itemsBody.push(<Pagination.Item onClick={() => this.paginationHandler(i)}>{i}</Pagination.Item>);
        }
        return itemsBody;
    }

    conditionalRenderingItem(element: BrandDiscount) {
        if(this.context.isActiveUserPresent)
            return (
                <a className="custom-link link" href={`/item-details/${element.id}`}>
                    <Card.Img variant="top" src={`http://localhost:8080/api/clothing/item/${element.photo}`} />
                </a>
            );
        else return (
            <a className="custom-link link" onClick={this.context.setModalSignInShow}>
                <Card.Img variant="top" src={`http://localhost:8080/api/clothing/item/${element.photo}`} />
            </a>
        )
    }

    conditionalRendering() {
        if(this.context.isActiveUserPresent){
            return (
                <>
                    <Nav/>
                    <Container className="mt-xl-3 mb-xl-5" style={{display: 'flex', justifyContent: 'center'}} fluid>
                        <Row className="col-xl-2 mt-xl-5">
                            <Col className="filter-height">

                            </Col>
                        </Row>
                        <Row className="col-xl-6 ml-xl-3">
                            {this.state.currentItems?.map(
                                (element:BrandDiscount, index:number) => {
                                    return (
                                        <Col className="col-xl-3">
                                            <Card className="mt-xl-5 ml-xl-1">
                                                {this.conditionalRenderingItem(element)}
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
                    <Container className="mt-xl-5 mb-xl-3" style={{display: 'flex', justifyContent: 'center'}} fluid>
                        <Row className="col-xl-2 mt-xl-5"></Row>
                        <Row className="col-xl-6 mt-xl-5">
                            <Col>
                                <Pagination style={{display: 'flex', justifyContent: 'center'}}>
                                    <Pagination.First onClick={() => this.paginationHandler(1)}/>
                                    <Pagination.Prev onClick={() => this.paginationHandler(-1)}/>
                                    {this.paginationItemGenerator()}
                                    <Pagination.Next onClick={() => this.paginationHandler(0)} />
                                    <Pagination.Last onClick={() => this.paginationHandler(7)}/>
                                </Pagination>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
        }
        else return <Home />;
    }
};

export default Discounts;