import React, { useCallback, useState } from "react";

export default function TodoForm(props) {
    const [title, setTitle] = useState("")

    const titleChange = useCallback((event) => {
        setTitle (event.target.value)
    }, [])

    const onSave = useCallback((event) => {
        event.preventDefault()
        props.add(title)
        setTitle("")
    }, [title])

   
        return (
            <form onSubmit={onSave}>
                <input className="col-md-3" type="text" name="title" value={title} onChange={titleChange} style={{marginLeft: "30px",marginTop:"20px"}}></input>
                <button className="btn btn-success" type="submit" style={{marginLeft: "30px",marginTop:"0px"}}>Simpan</button>
            </form>
        )
    
}