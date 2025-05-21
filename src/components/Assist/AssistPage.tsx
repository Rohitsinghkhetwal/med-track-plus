import axios from "axios";
import { useState } from "react";

const AssistPage = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  // const handleSend = async () => {

  //   if (!input.trim()) return;

  //   const userMessage = { role: 'user', content: input };
  //   setMessages((prev) => [...prev, userMessage]);
  
  //   const currentMessages = [...messages, userMessage]; // to pass to Gemini
  //   setInput('');

  //   try {
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_GEMINI_API_URL}key=${
  //         import.meta.env.VITE_GEMINI_API_KEY
  //       }`,
  //       {
  //         contents: currentMessages.map((msg) => ({
  //           role: msg.role,
  //           parts: [{ text: msg.content }]
  //         })),
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const reply =
  //       res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
  //       "No response from Gemini.";

  //     // Add user message
  //     setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
  //     setInput("");
  //   } catch (err) {
  //     console.log("Something went wrong here !");
  //   }
  // };

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
  
    const primingMessage = {
      role: 'user',
      parts: [
        {
          text:
            'You are PharmAssist, an AI assistant for a pharmacy management system. Only answer questions related to medicine, pharmacy, healthcare, and medical advice. Politely decline anything else.',
        },
      ],
    };
  
    const chatMessages = [
      primingMessage,
      ...messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      {
        role: 'user',
        parts: [{ text: input }],
      },
    ];
  
    setInput('');
  
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_GEMINI_API_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: chatMessages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const reply =
        res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No response from Gemini.';
  
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Gemini API Error:', err.response?.data || err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an issue with the request. Please try again.',
        },
      ]);
    }
  };
  
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-white">
        <h3 className="text-2xl font-bold">PharmAssist</h3>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg text-white max-w-[70%] ${
              msg.role === 'user'
                ? 'bg-blue-400 self-end text-right text-black'
                : 'bg-gray-500 self-start text-left text-black'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 bg-white border-t flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AssistPage;
