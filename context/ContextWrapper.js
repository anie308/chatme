import React from "react";
import GlobalContext from "./Context";


export default function ContextWrapper(props){
    const [rooms, setRooms] = React.useState([]);
    const [unfilteredRooms, setUnfilteredRooms] = React.useState([]);
    return(
        <GlobalContext.Provider value={{rooms, setRooms, unfilteredRooms, setUnfilteredRooms}}>
            {props.children}
        </GlobalContext.Provider>
    )
} 