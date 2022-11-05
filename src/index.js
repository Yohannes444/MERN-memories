import React, { useState } from "react";
import {createRoot} from "react-dom/client"
import Create from "./compontes/appmemo"
import Memo from "./compontes/memocard"

const App=()=>{
    const [memories,setmemories]=useState([])
    return(
        <div>
            <Create setmemories={setmemories} />
            {/* {memories.map((memo)=>{
            return (<div></div>)
            })} */}
            <Memo/>
            <h3>this is react from index.js</h3>
        </div>
    )
}

const root=new createRoot(document.querySelector("#app"))
root.render(<App />)