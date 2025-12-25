// src/components/chatbot/ChatBot.jsx
import React, { useState, useRef, useEffect } from "react";
import { getChatbotResponse } from "./chatbotLogic"; // your logic file

export default function ChatBot({ isOpen, onClose, products = [] }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    let botMessage;

    // Greeting if user says hi/hello
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
      botMessage = {
        type: "bot",
        text: "👋 Hello! Do you need help finding a product?",
      };
    } else if (lowerInput.includes("clear")) {
      setMessages([]);
      setInput("");
      return;
    } else {
      const response = getChatbotResponse(input, products);
      botMessage = {
        type: "bot",
        text:
          typeof response === "string"
            ? response
            : response.map((p) => `${p.name} - $${p.price}`).join("\n"),
      };
    }

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  // Handle pressing Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-2xl z-[999] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-t-xl">
        <h3 className="font-semibold">🧠 Shop AI Assistant</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMessages([]);
            }}
            className="text-sm font-medium bg-white text-purple-600 px-2 py-1 rounded"
          >
            Clear
          </button>
          <button onClick={onClose}>✖</button>
        </div>
      </div>

      {/* Chat body */}
      <div className="p-4 flex-1 max-h-96 overflow-y-auto text-sm space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.type === "user"
                ? "bg-purple-100 text-purple-900 self-end"
                : "bg-gray-100 text-gray-900 self-start"
            }`}
          >
            {msg.text.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex border-t">
        <input
          className="flex-1 px-3 py-2 text-sm outline-none"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="px-4 text-purple-600 font-semibold"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
