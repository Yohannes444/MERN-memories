import React, { useState } from "react";
import Axios from "axios"


const create=(props)=>{
    const [file,setfile]=useState([])
    const [date,setdate]=useState("")
    const [addres,seraddres]=useState("")
    const [discription,setdiscription]=useState("")

    const creatememo=async ()=>{
        const data={
            file:file,
            date:date,
            addres:addres,
            discription:discription
        }
        const nowmemo= await Axios.post("/add-memory",data,{ headers: { "Content-Type": "multipart/form-data" } })
        props.setmemories(nowmemo.data)
    }
    return(
        <div>
            <form onSubmit={creatememo}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Photo</label>
                        <input type="file" className="form-control" onChange={e=>setfile(e.target.files)} placeholder="Photo file" />
                    </div>
                    <div className="form-group col-md-6">
                        <label >Time</label>
                        <input type="date" className="form-control" onChange={e=>setdate(e.target.value)} placeholder="date and time" />
                    </div>
                </div>
                <div className="form-group">
                    <label >Address</label>
                    <input type="text" className="form-control" onChange={e=>seraddres(e.target.value)} placeholder="1234 Main St" />
                </div>
                <div className="form-group">
                    <label >Discriotion 2</label>
                    <textarea type="text" className="form-control" onChange={e=>setdiscription(e.target.value)} placeholder="pleas write memorie discriprion hear" />
                </div>s
  
  
                <button type="submit" className="btn btn-primary">submit</button>
            </form>
        </div>
    )
}

export default create