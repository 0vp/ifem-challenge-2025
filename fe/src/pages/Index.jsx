import React from 'react';
import Spline from '@splinetool/react-spline';

import { useState, useEffect } from 'react';

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
            const keyToPress = growth / 10; 
            const handleKeyDown = (event) => {
                if (event.key === keyToPress.toString()) {
                    console.log("pressed", keyToPress);
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
            <div className='w-full h-full flex justify-center items-center gap-24'>
                <div className='w-[55%] h-full'></div>
                <div className='w-[40%] h-screen'>
                    <div className='p-5 h-full justify-center items-center flex flex-col'>
                        <Spline className="rounded-xl" scene="https://prod.spline.design/6oK-awd-HWIl4RCs/scene.splinecode" />
                        <div className='absolute bg-white rounded-xl w-40 h-12 bottom-10 right-8'></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndexPage;