import React from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import TrueFocus from './TrueFocus';


const IndexPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen ">
        <img className="w-60" src={`./bloom.png`} alt="logo" />
        <img className="w-[60%] absolute bottom-0 left-10" src={'./text-bg.png'} alt="" />

        <TrueFocus 
        sentence="Bloom Companion"
        manualMode={false}
        blurAmount={5}
        borderColor="blue"
        animationDuration={2}
        pauseBetweenAnimations={1}
        />
            <Link to="/feature">
                <button className="mt-24 animate-pulse hover:opacity-[70%] active:opacity-[40%] font-poppins font-semibold rounded-xl px-8 py-4 text-lg cursor-pointer bg-[#65E8FF] text-white rounded animate-pulse">Get Started</button>
            </Link>
        </div>
    );
};

export default IndexPage;
