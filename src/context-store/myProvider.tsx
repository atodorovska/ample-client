import React, {Component} from "react";
// @ts-ignore
import ActiveUser from "../domain/activeUser";
import authenticationRepository from "../repository/authenticationRepository";
import MyContext from "./myContext";
import ClothingItem from "../domain/ClothingItem";
import clothingManagementRepository from "../repository/clothingManagementRepository";
import BrandDiscount from "../domain/BrandDiscount";
import discountsManagementRepository from "../repository/discountsManagementRepository";

interface IState {
    history: any,
    modalSignIn: boolean,
    modalRegister: boolean,
    activeUser: ActiveUser,
    isActiveUserPresent: boolean,
    latestClothingItems: ClothingItem [],
    latestDiscounts: BrandDiscount [],
    modalShareItem: boolean
}

class MyProvider extends Component<any, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            history: this.props.history,
            modalSignIn: false,
            modalRegister: false,
            activeUser: {} as ActiveUser,
            isActiveUserPresent: false,
            latestClothingItems: [],
            latestDiscounts: [],
            modalShareItem: false
        };
    }

    render() {
        return (
            <MyContext.Provider
                value={{
                    history: this.state.history,
                    modalSignIn: this.state.modalSignIn,
                    modalRegister: this.state.modalRegister,
                    activeUser: this.state.activeUser,
                    isActiveUserPresent: this.state.isActiveUserPresent,
                    latestClothingItems: this.state.latestClothingItems,
                    latestDiscounts: this.state.latestDiscounts,
                    modalShareItem: this.state.modalShareItem,
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
                    },
                    setModalShareItemShow: () => {
                        this.setState({
                            modalShareItem: true
                        })
                    },
                    setModalShareItemHide: () => {
                        this.setState({
                            modalShareItem: false
                        })
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
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
       });

       clothingManagementRepository.getLatestClothingItems().then((response:any) => {
           const data = response.data;
           console.log(data);
           if(data){
               this.setState({
                   latestClothingItems: response.data
               })
           }
       });

        discountsManagementRepository.getLatestDiscounts().then((response:any) => {
            const data = response.data;
            console.log(data);
            if(data){
                this.setState({
                    latestDiscounts: response.data
                })
            }
        });
    }
}

export default MyProvider;
