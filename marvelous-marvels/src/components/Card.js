import React from "react";
import { Link } from 'react-router-dom'

export default function Card(id, thumbnail, name) {
    return (
        <Link to={`/${id}`} >
        <div className="Card">
            <img src={thumbnail} alt="thumbnail" />
            <h1 className="card-name">{name}</h1>
        </div>
        </Link>
    )
}