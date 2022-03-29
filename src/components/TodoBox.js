import React, { Component } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
});

export default class TodoBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
    }

    componentDidMount() {
        request.get("todos").then((response) => {
            if (response.data.success) {
                this.setState({ todos: response.data.data.map(item => {
                    item.sent = true
                    return item
                })})
            } else {
                alert(response.data.data)
                
            }
        }).catch((err) => {
            alert("gagal mas bro")
        })
    }

    addTodo = (title) => {
        const _id = Date.now()
        this.setState((state, props) => ({ todos: [...state.todos, { _id, title, sent: true }] }))
        request.post("todos", { title }).then((response) => { 
            this.setState((state, props) => ({ todos: state.todos.map(item => {
                if(item._id === _id){
                    item._id = response.data._id
                }
                return item
            }) }))

        }).catch((err) => { 
            this.setState((state, props) => ({ todos: state.todos.map(item => {
                if(item._id === _id){
                    item.sent = false 
                }
                return item
            }) }))

        })

    }

    removeTodo = (id) => {
        request.delete(`todos/${id}`).then((response) => { 
            this.setState((state, props) => ({ todos: state.todos.filter(item => item._id !== id) }))

        }).catch((err) => { 
            
        })
    }

    resendTodo = (id, title) => {
        request.post(`todos`, {title}).then((response) => { 
            this.setState((state, props) => ({ todos: state.todos.map(item => {
                if(item._id === id){
                    item.sent = true 
                }
                return item
            }) }))
        }).catch((err) => { 
            
        })
    }


    render() {
        return (
            <div className="container">
                <TodoForm add={this.addTodo} />
                <TodoList todos={this.state.todos} remove={this.removeTodo} resend={this.resendTodo} />
            </div>
        )
    }
}