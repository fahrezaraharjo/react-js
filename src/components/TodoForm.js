import React, { Component } from "react";

export default class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.state = { title: "" }
    }

    titleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    onSave = (event) => {
        event.preventDefault()
        this.props.add(this.state.title)
        this.setState({ title: "" })
    }

    render() {
        return (
            <form onSubmit={this.onSave}>
                <input className="col-md-3" type="text" name="title" value={this.state.title} onChange={this.titleChange} style={{marginLeft: "30px",marginTop:"20px"}}></input>
                <button className="btn btn-success" type="submit" style={{marginLeft: "30px",marginTop:"0px"}}>Simpan</button>
            </form>
        )
    }
}