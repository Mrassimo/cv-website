import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGemini } from '../../hooks/useGemini';
import { AiIcon, CloseIcon, SendIcon } from './Icons';

export const AiAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, isLoading, error, generateResponse } = useGemini();
    const [input, setInput] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            generateResponse(input);
            setInput('');
        }
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[60] w-16 h-16 bg-highlight rounded-full shadow-lg flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open AI Assistant"
            >
                <AiIcon className="w-8 h-8" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                        className="fixed inset-0 md:inset-auto md:bottom-28 md:right-6 z-[100] w-full h-full md:w-[400px] md:h-[600px] bg-accent/80 dark:bg-primary/80 backdrop-blur-xl rounded-none md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
                    >
                        {/* Header */}
                        <header className="flex items-center justify-between p-4 border-b border-primary/10 dark:border-accent/10 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <AiIcon className="w-6 h-6 text-highlight" />
                                <h3 className="font-bold text-lg">AI Portfolio Assistant</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-primary/10 dark:hover:bg-accent/10" aria-label="Close chat">
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        </header>

                        {/* Chat Body */}
                        <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'model' && <AiIcon className="w-6 h-6 text-highlight mr-2 flex-shrink-0" />}
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-highlight text-white rounded-br-none' : 'bg-primary/10 dark:bg-accent/10 rounded-bl-none'} ${msg.role === 'system' ? 'w-full text-center bg-red-500/10 text-red-500 text-sm' : ''}`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <AiIcon className="w-6 h-6 text-highlight mr-2 flex-shrink-0" />
                                    <div className="max-w-[80%] p-3 rounded-2xl bg-primary/10 dark:bg-accent/10 rounded-bl-none flex items-center gap-2">
                                        <span className="w-2 h-2 bg-highlight rounded-full animate-pulse " style={{animationDelay: '0s'}}></span>
                                        <span className="w-2 h-2 bg-highlight rounded-full animate-pulse " style={{animationDelay: '0.2s'}}></span>
                                        <span className="w-2 h-2 bg-highlight rounded-full animate-pulse " style={{animationDelay: '0.4s'}}></span>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Input Form */}
                        <footer className="p-4 border-t border-primary/10 dark:border-accent/10 flex-shrink-0">
                           {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}
                            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about projects, skills..."
                                    className="w-full bg-primary/5 dark:bg-accent/5 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-highlight text-sm"
                                    disabled={isLoading}
                                />
                                <button type="submit" disabled={isLoading} className="w-10 h-10 bg-highlight text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50">
                                    <SendIcon className="w-5 h-5" />
                                </button>
                            </form>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};