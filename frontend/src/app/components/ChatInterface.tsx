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
    <div className="flex flex-col w-screen  p-12 ">
      <div className="">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className=" flex flex-row pt-6 h-full">
        <input
          className="flex align-middle items-center p-4 text-gray-500 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={isLoading} className='bg-blue-900 text-white px-4 py-4'>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};