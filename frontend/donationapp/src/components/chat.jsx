import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Chat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChat,setChat]=useState(false)

  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    
    try {
      const res = await axios.post(
        'https://geminiais.onrender.com/generate-text',
        {
          "userMessage":question
        },
        
      );
      console.log(res.data);
      setAnswer(res.data.reply.parts[0].text);
    } catch (err) {
      setAnswer('Sorry, something went wrong.');
    }
    setLoading(false);
  };


  return (
    <>
    <Navbar/>
    <div className="p-6 mx-auto bg-white rounded shadow mt-6">
      
      <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
      <textarea
        className="w-full border p-3 mb-4 rounded"
        rows="4"
        placeholder="Ask me anything about skills or projects..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={askAI}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        {loading ? 'Thinking...' : 'Ask AI'}
      </button>
      {answer && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-gray-800">
          <strong>AI says:</strong>
          <p className="mt-2">{answer}</p>
        </div>
      )}
    
    
    </div>
    </>
  );
};

export default Chat;

