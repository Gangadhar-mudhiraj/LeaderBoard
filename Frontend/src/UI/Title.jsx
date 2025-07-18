import React from 'react'

const Title = ({ text }) => {
    return (
        <h1 className='text-xl text-gray-200 font-bold'>{text.toUpperCase()}</h1>
    )
}

export default Title