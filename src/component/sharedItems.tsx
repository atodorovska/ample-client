import React, {Component, useContext} from "react";
import Nav from "./navigation";
import filip from '../assets/images/filip.jpg';
import MyContext from "../context-store/myContext";
import Home from "./home";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import ClothingItem from "../domain/clothingItem";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Pagination from "react-bootstrap/Pagination";
import clothingManagementRepository from "../repository/clothingManagementRepository";
import authenticationRepository from "../repository/authenticationRepository";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

// change value when needed
const NUM_PAGES = 7;
const NUM_ITEMS = 12;

interface IState {
    pages: number,
    current: number,
    items: number,
    currentItems: ClothingItem[],
    username: string,
    formValues: {
        category: string,
        size: string
    }
}

class SharedItems extends Component<any, IState>{

    static contextType = MyContext;

    constructor(props: any) {
        super(props);

        this.state = {
            pages: NUM_PAGES,
            current: 1,
            items: NUM_ITEMS,
            currentItems: [],
            username: "",
            formValues: {category: "", size: ""}
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

        clothingManagementRepository.allClothingItems(this.state.formValues.category, this.state.formValues.size, this.state.current, this.state.items)
            .then((response:any) => {
                this.setState({
                    currentItems: response.data
                })
            });
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IState>, snapshot?: any) {
        clothingManagementRepository.allClothingItems(this.state.formValues.category, this.state.formValues.size, this.state.current, this.state.items)
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


        clothingManagementRepository.allClothingItems(this.state.formValues.category, this.state.formValues.size, position, this.state.items)
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
            formValues: {category: "", size: ""}
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
                                           <Form.Control name="category" as="select" custom onChange={this.handleChange}>
                                               <option value="0">Choose Category...</option>
                                               <option value="JACKETS">JACKETS</option>
                                               <option value="DRESSES">DRESSES</option>
                                               <option value="SHIRTS">SHIRTS</option>
                                               <option value="TOPS">TOPS</option>
                                               <option value="TROUSERS">TROUSERS</option>
                                               <option value="JEANS">JEANS</option>
                                               <option value="SHORTS">SHORTS</option>
                                               <option value="SKIRTS">SKIRTS</option>
                                               <option value="SHOES">SHOES</option>
                                               <option value="BAGS">BAGS</option>
                                               <option value="SWIMWEAR">SWIMWEAR</option>
                                               <option value="ACCESSORIES">ACCESSORIES</option>
                                               <option value="SUITS">SUITS</option>
                                               <option value="OTHER">OTHER</option>
                                           </Form.Control>
                                   </Col>
                                  <Col className="col-xl-5">
                                          <Form.Control name="size" as="select" custom onChange={this.handleChange}>
                                              <option value="0">Choose Size...</option>
                                              <option value="XS">XS</option>
                                              <option value="S">S</option>
                                              <option value="M">M</option>
                                              <option value="L">L</option>
                                              <option value="XL">XL</option>
                                              <option value="OTHER">OTHER</option>
                                          </Form.Control>
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
                               (element:ClothingItem, index:number) => {
                                   return (
                                       <Col className="col-xl-3">
                                           <Card className="mt-xl-5 ml-xl-1">
                                               <a className="custom-link link" href={`/item-details/${element.id}`}>
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

export default SharedItems;