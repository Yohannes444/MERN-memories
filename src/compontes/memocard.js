import React, { useState } from "react";
import Axios from "axios"

const card=(props)=>{
    const [file,setfile]=useState([])
    const [date,setdate]=useState("")
    const [addres,setaddres]=useState("")
    const [discriprion,setdiscription]=useState("")
    const [isediting,setisediting]=useState("")
    const submithandler=async(e)=>{
        setisediting(false)
        const editedmemo= await Axios.post(`/update/${props.id}`)
        props.setmemories(prev=>{
            return prev.fileter(newmemo=>{
                return 
            })
        })
    }
    return(
        <div>
            {isediting &&
            <div>
                <div className="card">
                    <div className="card-body" >
                        <img href="" /> 
                    </div>
                </div>
            </div>
            }
            <h5>this is react from memocard.js</h5>
        </div>
    )
}

export default card