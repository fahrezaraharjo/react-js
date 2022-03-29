import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList(props) {
    
        const nodeList = props.todos.map(item => (
            <TodoItem key={item._id} title={item.title} sent= {item.sent} remove={() => props.remove(item._id)}  resend={()=> props.resend(item._id, item.title)} />
        ))
        return (
            <ol>
                {nodeList}
            </ol>
        )
    }
