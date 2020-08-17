import React, {useContext} from "react";
import Nav from "./navigation";
import MyContext from "../context-store/myContext";
import Home from "./home";

const SharedItems = (props: any) => {

    const context:any = useContext(MyContext);

    const conditionalRendering = () => {
        if(context.isActiveUserPresent){
            return (
               <>
                   <Nav/>
                   <div>SHARED ITEMS</div>
               </>
            );
        }
        else return <Home />;
    }

    return(
        <>
            {conditionalRendering()}
        </>
    )
};

export default SharedItems;