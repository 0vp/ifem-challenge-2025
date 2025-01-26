import React from 'react';
import Spline from '@splinetool/react-spline';
import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import Speech from '../components/Speech';

const IndexPage = () => {
    
    const fetchGrowth = async () => {
        const response = await fetch('https://api.example.com/number');
        const data = await response.json();
        return data.number;
    };

    const [growth, setGrowth] = useState(null);

    useEffect(() => {
        const getGrowth = async () => {
            const num = await fetchGrowth();
            setGrowth(num);
        };

        getGrowth();
    }, []);

    useEffect(() => {
        const growPlant = (growth) => {
            const keyToPress = growth / 10 - 1; 
            const handleKeyDown = (event) => {
                if (keyToPress < 0) {
                    event.key === "0";
                } else {
                    if (event.key === keyToPress.toString()) {
                        console.log("pressed", keyToPress);
                    }
                };
            };
            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
        growPlant(growth);
    }, [growth]);

    return (
        <>
            <div className='w-screen h-screen flex gap-12'>
                <Navbar></Navbar>
                <div className='w-[55%] h-screen flex flex-col justify-center items-left'>
                    <h1 className='w-[50%] p-12 text-4xl font-bold text-[#8DCCFF] font-poppins'>Bloom Companion</h1>
                    <div className='w-full h-[80%] ml-8 mt-4 p-3 bg-[url(/text-bg.png)] bg-cover'>
                        <Speech></Speech>
                    </div>
                </div>
                <div className='w-[40%] h-screen'>
                    <div className='p-5 h-full justify-center items-center flex flex-col drop-shadow-xl'>
                        <Spline className="rounded-xl" scene="https://prod.spline.design/6oK-awd-HWIl4RCs/scene.splinecode" />
                        <div className='absolute bg-white rounded-xl w-40 h-12 bottom-9 right-9'></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndexPage;