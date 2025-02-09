"use client"
import { useState } from 'react';
import { getDeepSeekResponse } from '../api/deepseek';


export const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const userMessage = { role: 'user', content: input };
      const newMessages = [...messages, userMessage];
      
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      const assistantResponse = await getDeepSeekResponse(newMessages);
      
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: assistantResponse }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};