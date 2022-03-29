import React from "react";

export default function TodoItem(props) {
    return (
        <li className="mb-3">
            {props.title}
            <button
                type="button"
                className={props.sent ? "btn btn-danger" : "btn btn-warning"}
                onClick={props.sent ? props.remove : props.resend}>
                {props.sent ? "hapus" : "kirim ulang"}
            </button>
        </li>
    )
}