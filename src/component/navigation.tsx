import React,  {useContext} from "react";
import '../style/global.css';
import logo from '../assets/images/logo_big_black.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import MyContext from "../context-store/myContext";

const Navigation = (props: any) => {

    const context:any = useContext(MyContext);

    const conditionalRender = () => {
        if(context.isActiveUserPresent) {
           return(
               <>
                   <Navbar.Collapse className="justify-content-end">
                       <Nav className="mr-auto">
                           <Nav.Link href="/shared-items">Shared Items</Nav.Link>
                           <Nav.Link href="/discounts">Discounts</Nav.Link>
                       </Nav>
                       <Nav>
                           <Navbar.Text><span className="mr-xl-1">Signed in as</span>
                               <a href="/profile">{context.activeUser?.username}</a>
                           </Navbar.Text>
                           <Nav.Link onClick={context.activeUserLogout}>Sign out</Nav.Link>
                       </Nav>
                   </Navbar.Collapse>
               </>
           )
        }else {
           return(
               <Navbar.Collapse className="justify-content-end">
                   <Nav className="mr-auto">
                       <Nav.Link onClick={context.setModalSignInShow}>Shared Items</Nav.Link>
                       <Nav.Link onClick={context.setModalSignInShow}>Discounts</Nav.Link>
                   </Nav>
                   <Nav>
                       <Nav.Link onClick={context.setModalSignInShow}>Sign in</Nav.Link>
                   </Nav>
               </Navbar.Collapse>
           )
        }
    }

    return(
        <>
            <MyContext.Consumer>
                {(context:any) => (
                    <Container>
                        <Navbar className="nav-color" variant="light" expand="lg">
                            <Navbar.Brand href="./">
                                <img src={logo} className="d-inline-block align-top" alt="Ample Logo"/>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            {conditionalRender()}
                        </Navbar>
                    </Container>
                )}
            </MyContext.Consumer>
        </>
    );

};

export default Navigation;


