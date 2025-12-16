import React, { useState } from "react";
import ChatInput from "./ChatInput";
import MessageList, { Message } from "./MessageList";
import { Parameter } from "./ParameterForm";
import { sendMessage } from "../../api";

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleParameterChange = (
    messageId: string,
    parameters: Parameter[]
  ) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, parameters } : msg))
    );
  };

  const handleNavigate = (messageId: string) => {
    // 跳转逻辑已在 FunctionMatchResult 中处理
    console.log("准备跳转，消息ID:", messageId);
  };

  const handleSend = async (message: string) => {
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // 发送到接口
    setLoading(true);
    try {
      const aiMessage = await sendMessage(message);
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("发送消息失败:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "抱歉，服务暂时不可用，请稍后重试。",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex bg-gray-50 rounded-lg overflow-hidden shadow-sm">
      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* 对话消息区域 */}
        <div className="flex-1 overflow-y-auto">
          <MessageList
            messages={messages}
            onParameterChange={handleParameterChange}
            onNavigate={handleNavigate}
          />
        </div>

        {/* 输入区域 */}
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
