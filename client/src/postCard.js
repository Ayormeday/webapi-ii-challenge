import React from 'react';



export default function PostCard (props) {
    const { title, contents } = props;

    return (
        <div>
            <h1>{title}</h1>
            <p>{contents}</p>
        </div>
    )
}