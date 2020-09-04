import React, {Component, useContext} from "react";
import Nav from "./navigation";
import MyContext from "../context-store/myContext";
import Home from "./home";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BrandDiscount from "../domain/brandDiscount";
import discountsManagementRepository from "../repository/discountsManagementRepository";
import authenticationRepository from "../repository/authenticationRepository";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ClothingItem from "../domain/clothingItem";
import clothingManagementRepository from "../repository/clothingManagementRepository";

// change value when needed
const NUM_PAGES = 7;
const NUM_ITEMS = 12;

interface IState {
    pages: number,
    current: number,
    items: number,
    currentItems: BrandDiscount[],
    username: string,
    formValues: {
        name: string;
    }
}

class Discounts extends Component<any, IState>{

    static contextType = MyContext;

    constructor(props: any) {
        super(props);

        this.state = {
            pages: NUM_PAGES,
            current: 1,
            items: NUM_ITEMS,
            currentItems: [],
            username: "",
            formValues: {name: ""}
        }

        this.handleChange= this.handleChange.bind(this);
        this.resetFilters= this.resetFilters.bind(this);
    }

    render() {
        return(
            <>
                {this.conditionalRendering()}
            </>
        )
    }

    componentDidMount() {
        authenticationRepository.getActiveUser()
            .then((response: any) => {
                this.setState({
                    username: response.data.username
                })
            });

        discountsManagementRepository.allDiscounts(this.state.formValues.name, this.state.current, this.state.items)
            .then((response:any) => {
                this.setState({
                    currentItems: response.data
                })
            });
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IState>, snapshot?: any) {
        discountsManagementRepository.allDiscounts(this.state.formValues.name, this.state.current, this.state.items)
            .then((response:any) => {
                this.setState({
                    currentItems: response.data
                })
            });
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

        discountsManagementRepository.allDiscounts(this.state.formValues.name, position, this.state.items)
            .then((response:any) => {
                this.setState({
                    currentItems: response.data
                })
            });
    }

    paginationItemGenerator() {
        let itemsBody = [];

        for(let i=1; i<=7; i++){
            itemsBody.push(<Pagination.Item onClick={() => this.paginationHandler(i)}>{i}</Pagination.Item>);
        }
        return itemsBody;
    }

    handleChange(event: any) {
        event.preventDefault();

        let formValues = this.state.formValues;
        // @ts-ignore
        formValues[event.target.name] = event.target.value.trim();
        this.setState({
            formValues: formValues
        });
    }

    resetFilters() {
        this.setState({
            formValues: {name: ""}
        });
    }

    conditionalRendering() {
        if(this.state.username !== ""){
            return (
                <>
                    <Nav/>
                    <Container className="mt-xl-3" style={{display: 'flex', justifyContent: 'center'}} fluid>
                        <Row className="col-xl-8">
                            <Form onSubmit={this.resetFilters} className="justify-content-end ml-1 mt-xl-1 col-xl-6">
                                <Form.Row className="mr-auto">
                                    <Col className="col-xl-6">
                                        <Form.Control name="name" type="text" placeholder="Search brand name" onChange={this.handleChange}/>
                                    </Col>
                                    <Col className="col-xl-1">
                                        <Button type="submit" variant="dark">Clear</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Row>
                    </Container>
                    <Container className="mb-xl-5" style={{display: 'flex', justifyContent: 'center'}} fluid>
                        <Row className="col-xl-8">
                            {this.state.currentItems?.map(
                                (element:BrandDiscount, index:number) => {
                                    return (
                                        <Col className="col-xl-3">
                                            <Card className="mt-xl-5 ml-xl-1">
                                                <a className="custom-link link" href={`/discount-details/${element.id}`}>
                                                    <Card.Img variant="top" src={`http://localhost:8080/api/discounts/item/${element.photo}`} />
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
                    <Container className="mt-xl-5 mb-xl-3" style={{display: 'flex', justifyContent: 'center'}} fluid>
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