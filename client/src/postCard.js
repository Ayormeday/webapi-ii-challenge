import React from 'react';



export default function PostCard (props) {
    const { title, contents } = props;

    return (
        <div className="post-card">
            <h1 className="title">{title}</h1>
            <p className="contents">{contents}</p>
        </div>
    )
}