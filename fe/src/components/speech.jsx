import React, { useState, useRef, useEffect } from 'react';

const BASE_URL = 'http://localhost:5000';  

export default function Speech() {
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [response, setResponse] = useState('');

    const recognitionRef = useRef(null);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech recognition not supported in this browser.');
            return;
        }

        // reset transcript
        setTranscript('');

        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
            let interim = '';
            let final = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPart = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    final += transcriptPart;
                } else {
                    interim += transcriptPart;
                }
            }
            setTranscript((prev) => prev + final);
            setInterimTranscript(interim);
        };

        recognitionRef.current.start();
    };

    const talk = (text) => {
        // talking animation is 4 seconds, split the text into talking 4 second chunks, if the audio is played at 175 wpm
        // 175 wpm = 2.92 wps
        // 2.92 wps * 4 seconds = 11.68 words
        // 11.68 words * 5 characters per word = 58 characters

        // split the text into 58 character chunks
        const event_down = new KeyboardEvent('keydown', { key: "q", bubbles: true });
        const event_up = new KeyboardEvent('keyup', { key: "q", bubbles: true });

        // talk
        const loopNum = Math.ceil(text.length / 58);
        for (let i = 0; i < loopNum; i++) {
            setTimeout(() => {
            document.body.dispatchEvent(event_up);
            console.log(event_down);
            document.body.dispatchEvent(event_down);
            }, i * 4000); // Dispatch event every 4 seconds per loop iteration
        }

        // idle again LOL
        setTimeout(() => {
            const event_down_w = new KeyboardEvent('keydown', { key: "w", bubbles: true });
            const event_up_w = new KeyboardEvent('keyup', { key: "w", bubbles: true });
            document.body.dispatchEvent(event_up);
            document.body.dispatchEvent(event_down_w);
            document.body.dispatchEvent(event_up_w);
        }, loopNum * 4000);
    };


    const stopListening = () => {
        
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setInterimTranscript(''); // Clear interim transcript on stop
        }
        
        fetch(`${BASE_URL}/respond`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: transcript + interimTranscript }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setResponse(data.response);
                talk(data.response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    

    return (
        <div className='w-full h-full flex flex-col justify-top items-center'>
            <div className='flex flex-col font-poppins justify-left items-left text-left w-full pl-20 pt-10'>
                <h3 className='font-semibold text-2xl'>You: </h3>
                <p className='font-medium text-xl ml-2'>{transcript}{interimTranscript}</p>

            </div>
            <div className='flex flex-col font-poppins justify-left items-left text-left w-full pl-20 pt-10'>
                <h3 className='font-semibold text-2xl'>Bloom: </h3>
                <p className='font-medium text-xl ml-2'>{response}</p>
            </div>
            <button className='absolute bottom-10 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl w-[30%]' 
                onMouseDown={startListening}
                onMouseUp={stopListening}
                onTouchStart={startListening}
                onTouchEnd={stopListening}
            >
                Hold to Speak
            </button>
        </div>
    );
};
