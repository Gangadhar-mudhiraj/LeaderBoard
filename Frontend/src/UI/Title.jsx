import React from 'react';

const Title = ({ text }) => {
    return (
        <h1 className='text-4xl sm:text-5xl md:text-6xl text-gray-100 font-extrabold tracking-tight text-center my-8 md:my-12'>
            {text.toUpperCase()}
        </h1>
    );
};

export default Title;