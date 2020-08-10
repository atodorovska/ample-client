import React, {Component} from "react";
// @ts-ignore
import ActiveUser from "../domain/activeUser";
import authenticationRepository from "../repository/authenticationRepository";
import MyContext from "./myContext";

interface IState {
    modalSignIn: boolean,
    modalRegister: boolean,
    activeUser: ActiveUser,
    isActiveUserPresent: boolean,
    history: any
}

class MyProvider extends Component<any, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            modalSignIn: false,
            modalRegister: false,
            activeUser: {} as ActiveUser,
            isActiveUserPresent: false,
            history: this.props.history
        };
    }

    componentDidMount() {
       authenticationRepository.getActiveUser().then((response:any) => {
           const data = response.data;
           if(data){
               this.setState({
                   activeUser: response.data,
                   isActiveUserPresent: true
               })
           }
       })
    }

    render() {
        return (
            <MyContext.Provider
                value={{
                    modalSignIn: this.state.modalSignIn,
                    modalRegister: this.state.modalRegister,
                    activeUser: this.state.activeUser,
                    isActiveUserPresent: this.state.isActiveUserPresent,
                    history: this.state.history,
                    setModalSignInShow: () => {
                        this.setState(
                            {modalSignIn: true}
                        )
                    },
                    setModalSignInHide: () => {
                        this.setState(
                            {modalSignIn: false}
                        )
                    },
                    setIsActiveUserPresentTrue: () => {
                        this.setState(
                            {isActiveUserPresent: true}
                        )
                    },
                    setIsActiveUserPresentFalse: () => {
                        this.setState(
                            {isActiveUserPresent: false}
                        )
                    },
                    setModalRegisterShow: () => {
                        this.setState(
                            {modalRegister: true}
                        )
                    },
                    setModalRegisterHide: () => {
                        this.setState(
                            {modalRegister: false}
                        )
                    },
                    activeUserLogout: () => {
                        authenticationRepository.activeUserLogout()
                            .then(this.setState({
                                isActiveUserPresent: false
                            }))
                    },
                    setActiveUser: (data: any) => {
                        this.setState({
                            activeUser: data
                        })
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default MyProvider;
