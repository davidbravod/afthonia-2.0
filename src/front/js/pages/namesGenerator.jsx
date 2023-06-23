import React, { useState } from 'react';
import "../../styles/name-generator.css"

const NamesGenerator = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [sentMessage, setSentMessage] = useState(false);

    const handleBubbleClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleInputSubmit = async (event) => {
        event.preventDefault();

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputMessage, sender: 'user' },
        ]);

        setSentMessage(true)

        try {
            const response = await fetch('http://127.0.0.1:3001/api/namegenerator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: inputMessage }),
            });

            if (!response.ok) {
                setSentMessage(false)
                throw new Error('Failed to fetch response from the server');
            }

            const responseData = await response.json();

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: responseData.message, sender: 'bot' },
            ]);

            setInputMessage('');
            setSentMessage(false)
        } catch (error) {
            console.error('Error:', error);
            // Handle error here
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            {isExpanded ? (
                <div style={{ maxWidth: "400px" }}>
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center p-3 bg-custom text-white border-bottom-0" onClick={handleBubbleClick}>
                            <p className="mb-0 fw-bold">Names Generator</p>
                            <i className="fas fa-times"></i>
                        </div>
                        <div className="card-body" style={{ borderRadius: '15px', width: '400px', height: '200px', overflowY: 'auto' }}>
                            {messages.map((message, index) => {
                                const { text, sender } = message;
                                return (
                                    <div key={index} className={`d-flex flex-row justify-content-${sender === 'user' ? 'start' : 'end'} mb-4`}>
                                        {sender === 'user' ? (
                                            <div className="p-3 ms-3" style={{ borderRadius: '15px', background: 'rgba(57, 192, 237, 0.2)' }}>
                                                <p className="small mb-0">{text}</p>
                                            </div>
                                        ) : (
                                            <div className="p-3 me-3 border" style={{ borderRadius: '15px', background: '#FBFBFB' }}>
                                                <p className="small mb-0">{text}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="card-footer">
                            <div className="card-footer">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Describe your company..."
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        disabled={sentMessage}
                                    />
                                    <button type="button" className="btn btn-trasparent send" onClick={handleInputSubmit}>
                                        {sentMessage ? <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : "Send"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <button className="btn" type="button" onClick={handleBubbleClick}>
                    Don't know how to name your company? <a>Suggest Names For Me</a>
                </button>
            )}
        </div>
    );
};
export default NamesGenerator;