import React, { useState, useEffect, useCallback } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
});

export default function TodoBox(props) {
    const [todos, setTodos] = useState([])


    useEffect(() => {
        request.get("todos").then((response) => {
            if (response.data.success) {
                setTodos(response.data.data.map(item => {
                    item.sent = true
                    return item
                }))
            } else {
                alert(response.data.data)

            }
        }).catch((err) => {
            alert("gagal mas bro")
        })
    }, [])

    const addTodo = useCallback((title) => {
        const _id = Date.now()
        setTodos([...todos, { _id, title, sent: true }])

        request.post("todos", { title }).then((response) => {
            setTodos(todos => todos.map(item => {
                if (item._id === _id) {
                    item._id = response.data._id
                }
                return item
            }))
        }).catch((err) => {
            setTodos(todos => todos.map(item => {
                if (item._id === _id) {
                    item.sent = false
                }
                return item
            })
            )
        })

    },  [todos])

    const removeTodo = useCallback((id) => {


        request.delete(`todos/${id}`).then((response) => {
            setTodos(todos => todos.filter(item => item._id !== id))

        }).catch((err) => {

        })
    }, [])

    const resendTodo = useCallback((id, title) => {


        request.post(`todos`, { title }).then((response) => {
            setTodos(todos => todos.map(item => {
                if (item._id === id) {
                    item.sent = true
                }
                return item
            })
            )
        }).catch((err) => {

        })
    }, [todos]);


    return (
        <div className="container">
            <TodoForm add={addTodo} />
            <TodoList todos={todos} remove={removeTodo} resend={resendTodo} />
        </div>
    )

}