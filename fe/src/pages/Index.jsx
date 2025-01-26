import React from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
const IndexPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white">
            <img className="w-100" src={`./bloom.png`} alt="logo" />
            <Link to = "/feature">
                <button className="hover: opacity-[70%] active:opacity-[40%] font-poppins rounded-xl px-8 py-4 text-lg cursor-pointer bg-[#65E8FF] text-white rounded">Get Started</button>
            </Link>
        </div>
    );
};

export default IndexPage;
