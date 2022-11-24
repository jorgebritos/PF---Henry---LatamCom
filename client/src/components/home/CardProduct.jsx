import React from 'react';
import { Link } from "react-router-dom";

export default function CardProduct({ id, name, price, image, categories }) {
    return (
        <div>
            <Link to={`/product/${id}`}>
                <div>
                    <p>{name}</p>
                    <p>Price: {price}</p>
                    <img src={image}></img> <br />
                    Categories: {categories.map((e) => {
                        return (
                            <div key={e.name}>
                                <p>{e.name}</p>
                            </div>
                        )
                    })
                    }
                </div>
            </Link>
        </div>
    )
}