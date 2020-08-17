import React, {Component} from "react";
import Nav from "./navigation";
import EditProfile from "./editProfile";
import MyContext from "../context-store/myContext";
import Home from "./home";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import ActiveUser from "../domain/activeUser";
import authenticationRepository from "../repository/authenticationRepository";

interface IState {
    modal: boolean,
    type: string,
    add: boolean,
    address: string,
    number: string
}

class Profile extends Component<any, IState>{

    static contextType = MyContext;

    constructor(props: any) {
        super(props);

        this.state = {
            modal: false,
            type: "",
            add: false,
            address: "",
            number: ""
        }

        this.addProfileAddress = this.addProfileAddress.bind(this);
        this.editProfileAddress = this.editProfileAddress.bind(this);
        this.addProfilePhone = this.addProfilePhone.bind(this);
        this.editProfilePhone = this.editProfilePhone.bind(this);
        this.setModalHide = this.setModalHide.bind(this);
        this.reloadProfileChanges = this.reloadProfileChanges.bind(this);
    }

    componentDidMount() {
        this.context.setErrorFalse();

        authenticationRepository.getActiveUser()
            .then((response: any) => {
                this.setState({
                    address: response.data.address,
                    number: response.data.number
                })
            });
    }

    reloadProfileChanges() {
        authenticationRepository.getActiveUser()
            .then((response: any) => {
                this.setState({
                    address: response.data.address,
                    number: response.data.number
                })
            });
    }

    setModalHide() {
        this.setState({
            modal: false
        })
    }
    
    editProfileAddress() {
        this.setState({
            modal: true,
            type: "Address",
            add: false
        })
    }

    addProfileAddress() {
        this.setState({
            modal: true,
            type: "Address",
            add: true
        })
    }

    editProfilePhone() {
        this.setState({
            modal: true,
            type: "Phone number",
            add: false
        })
    }

    addProfilePhone() {
        this.setState({
            modal: true,
            type: "Phone number",
            add: true
        })
    }

    conditionalRenderProfileItem(text: string) {
        if(text)
            return <div className="mt-xl-4">{text}</div>
        else return <div className="mt-xl-4 ">not provided</div>;
    }

    conditionalRenderProfileButton(text: string, type: string) {
        if (text && type === "Address")
            return <Button variant="dark" size="lg" className="red-button" onClick={this.editProfileAddress}>Edit</Button>;
        else if(text && type === "Phone number")
            return <Button variant="dark" size="lg" className="red-button" onClick={this.editProfilePhone}>Edit</Button>;
        else if(!text && type === "Address")
            return <Button variant="dark" size="lg" className="red-button" onClick={this.addProfileAddress}>Add</Button>;
        else return <Button variant="dark" size="lg" className="red-button" onClick={this.addProfilePhone}>Add</Button>;
    }

    conditionalRendering()  {
        if(this.context.isActiveUserPresent){
            return (
                <>
                    <Nav/>
                    <EditProfile add={this.state.add} type={this.state.type} showModal={this.state.modal} hideModal={this.setModalHide} reload={this.reloadProfileChanges}/>
                    <Container className="mt-xl-5 mb-xl-5 col-xl-8" style={{display: 'flex', justifyContent: 'center'}} fluid>
                        <ListGroup className="mt-xl-5" variant="flush">
                            <ListGroup.Item className="profile-list-item background-white medium-title text-bold list-title-height">{this.context.activeUser.username}</ListGroup.Item>
                            <ListGroup.Item className="profile-list-item background-white list-item-height small-title">
                                <div className="color-red">Points</div>
                                {this.conditionalRenderProfileItem(this.context.activeUser.points)}
                            </ListGroup.Item>
                            <ListGroup.Item className="profile-list-item background-white small-title">
                                <div className="color-red">Email</div>
                                {this.conditionalRenderProfileItem(this.context.activeUser.email)}
                            </ListGroup.Item>
                            <ListGroup.Item className="profile-list-item background-white list-item-height small-title">
                                <Row>
                                    <Col className="col-xl-11">
                                        <div className="color-red">Address</div>
                                        {this.conditionalRenderProfileItem(this.state.address)}
                                    </Col>
                                    <Col className="col-lg-1 mt-xl-4">
                                        {this.conditionalRenderProfileButton(this.state.address, "Address")}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="profile-list-item background-white list-item-height small-title">
                                <Row>
                                    <Col className="col-xl-11">
                                        <div className="color-red">Phone number</div>
                                        {this.conditionalRenderProfileItem(this.state.number)}
                                    </Col>
                                    <Col className="col-lg-1 mt-xl-4">
                                        {this.conditionalRenderProfileButton(this.state.number, "Phone number")}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
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

export default Profile;