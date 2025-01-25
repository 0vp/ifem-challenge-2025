
import React, { useState, useRef } from 'react';

export default function Test() {
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
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

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setInterimTranscript(''); // Clear interim transcript on stop
        }
    };

    return (
        <div>
            <button
                onMouseDown={startListening}
                onMouseUp={stopListening}
                onTouchStart={startListening}
                onTouchEnd={stopListening}
            >
                Hold to Speak
            </button>
            <div>
                <h3>Transcript:</h3>
                <p>{transcript}{interimTranscript}</p>
            </div>
        </div>
    );
};