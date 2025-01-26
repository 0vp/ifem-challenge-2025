import React from 'react';
import Spline from '@splinetool/react-spline';
import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import Speech from '../components/Speech';

const Feature = () => {
    const fetchCleanUp = async () => {
        try{
            await fetch('http://127.0.0.1:5000/reset');
        }
        catch (e) {
            console.log(e);
        }

    }
    const fetchPosition = async () => {
        const response = await fetch('http://127.0.0.1:5000/position');
        const data = await response.json();
        console.log(data.rel);
        return data;
    }
    const [position, setPosition] = useState(null);
    const [rel, setRel] = useState(null);

    const growPlant = (position) => {
        // Define the growPlant function logic here
        console.log(`Growing plant at position ${position}`);
    };

    useEffect(() => {
        const fetchAndSetPosition = async () => {
            const pos = await fetchPosition();
            setRel(pos.rel);
            setPosition(pos.current);
        };

        const interval = setInterval(fetchAndSetPosition, Math.random() * (5000 - 3000) + 3000);

        return () => clearInterval(interval);
    }, []);

    const simulateKeyPress = (key) => {
        const event = new KeyboardEvent("keydown", {
            key: key, // The key you want to simulate
            code: `Digit${key}`, // Use `DigitX` for numeric keys
            keyCode: key, // The key code for the key
            charCode: key,
            bubbles: true, // Allow the event to bubble up
        });

        // Dispatch the event to the document
        document.dispatchEvent(event);
    };

    useEffect(() => {

        if (rel >= 0 && rel <= 9) {
            simulateKeyPress(rel);
            console.log("pressed...")
        }
        growPlant(rel);

    }, [rel]);

    useEffect(() => {
        return () => {
            fetchCleanUp();
            setRel(null);
        };
    }, []);

    return (
        <>
            <div className='w-screen h-screen flex gap-12 fade-in'>
                <Navbar></Navbar>
                <div className='w-[55%] h-screen flex flex-col justify-center items-left'>
                    <img className="w-60" src={`./bloom.png`} alt="logo" />
                    <div className='w-full h-[80%] ml-8 mt-4 p-3 bg-[url(/text-bg.png)] bg-cover'>
                        <Speech></Speech>
                    </div>
                </div>
                <div className='w-[40%] h-screen'>
                    <div className=' p-5 h-full justify-center items-center flex flex-col drop-shadow-xl'>
                        <Spline className="rounded-xl z-[-1] " scene="https://prod.spline.design/6oK-awd-HWIl4RCs/scene.splinecode" />
                        <div className='absolute bg-[#65E8FF] rounded-xl w-40 h-12 bottom-9 right-9 flex justify-center items-center font-bold text-[20px] bg-blue-300 text-white'>{position} remaining</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Feature;