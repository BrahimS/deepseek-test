interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const getDeepSeekResponse = async (messages: Message[]): Promise<string> => {
  try {
    const response = await fetch('/api/deepseek', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};