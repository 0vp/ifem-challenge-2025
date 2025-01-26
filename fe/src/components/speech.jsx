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

    const talk = () => {
        const event = new KeyboardEvent('keydown', { key: "q", bubbles: true });
        console.log(event);
        document.body.dispatchEvent(event);
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
                talk();
                setResponse(data.response);
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
