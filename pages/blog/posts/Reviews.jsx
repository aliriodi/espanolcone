import React from 'react'

export default function Reviews({ reviews, slug }) {

    return (
        <div>
       <div>{reviews?.length}</div>
       <div></div>
            Revies from: {slug}
        </div>
    )
}
