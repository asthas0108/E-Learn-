import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Call OpenAI API
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // or "gpt-4", "gpt-3.5-turbo"
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...newMessages.map(m => ({
              role: m.from === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ],
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      setMessages([...newMessages, { from: "bot", text: botMessage }]);
    } catch (error) {
      setMessages([...newMessages, { from: "bot", text: "Sorry, something went wrong." }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={{
      maxWidth: "600px", margin: "20px auto", border: "1px solid #ccc",
      borderRadius: "10px", padding: "15px", fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center" }}>Chatbot</h2>

      <div
        style={{
          minHeight: "300px",
          maxHeight: "400px",
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9"
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.from === "user" ? "right" : "left",
              margin: "8px 0"
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 15px",
                borderRadius: "20px",
                backgroundColor: msg.from === "user" ? "#007bff" : "#e4e6eb",
                color: msg.from === "user" ? "white" : "black",
                maxWidth: "80%",
                wordWrap: "break-word"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p style={{ textAlign: "center", color: "#888" }}>Typing...</p>}
      </div>

      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: "calc(100% - 90px)",
          padding: "10px",
          borderRadius: "20px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: "16px"
        }}
        disabled={loading}
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        style={{
          width: "70px",
          marginLeft: "10px",
          padding: "10px",
          borderRadius: "20px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer"
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Chatbot;
