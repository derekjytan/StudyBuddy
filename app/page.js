'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const context = messages.map((msg) => msg.content); // Get context from previous messages
            const response = await axios.post('/api/generate', { prompt: input, context });
            const botMessage = { role: 'bot', content: response.data.generatedContent };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            const errorMessage = { role: 'bot', content: 'Sorry, something went wrong. Please try again.' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'}`}
                    >
                        {message.content}
                    </div>
                ))}
                {loading && (
                    <div className="p-2 rounded-lg bg-gray-200 self-start">
                        Thinking...
                    </div>
                )}
            </div>
            <div className="p-4 bg-white flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                    placeholder="Type your message here..."
                />
                <button
                    onClick={handleSend}
                    className="ml-4 bg-blue-500 text-white p-2 rounded-lg"
                    disabled={loading}
                >
                    Send
                </button>
            </div>
        </div>
    );
}