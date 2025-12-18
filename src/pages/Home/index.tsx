import React, { useState } from "react";
import ChatInput from "./ChatInput";
import MessageList, { Message } from "./MessageList";
import { Parameter } from "./ParameterForm";
import { sendMessage, BackendResponseItem } from "../../api";
import { FunctionMatch } from "./FunctionCard";
import {
  PARAM_FIELD_NAME_MAP,
  PARAM_FIELD_OPTIONS,
  FUNCTION_NAME_MAP,
  PLATFORM_NAME_MAP,
} from "../../utils/workflowMatchNavigate";
import HomeRight, { Conversation } from "./HomeRight";

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

  const convertToMessage = (data: BackendResponseItem): Message => {
    const matchedFunction: FunctionMatch | undefined = data.function
      ? {
          id: Date.now().toString(),
          name: data.function,
          description: `平台：${PLATFORM_NAME_MAP[data.platform] || data.platform}`,
          confidence: 0.95,
        }
      : undefined;

    const parameters: Parameter[] = Object.entries(data.param).map(
      ([key, value]) => {
        let type: "text" | "number" | "select" | "textarea" = "text";
        let convertedValue: string | number | undefined = undefined;
        let options:
          | Array<{ label: string; value: string | number }>
          | undefined = undefined;

        const fieldOptions = PARAM_FIELD_OPTIONS[key];
        if (fieldOptions) {
          type = "select";
          options = fieldOptions.map((opt) => ({
            label: opt.label,
            value: opt.value,
          }));
        }

        if (typeof value === "number") {
          if (!fieldOptions) type = "number";
          convertedValue = value;
        } else if (typeof value === "boolean") {
          if (!fieldOptions) {
            type = "select";
            options = [
              { label: "是", value: "true" },
              { label: "否", value: "false" },
            ];
          }
          convertedValue = value ? "true" : "false";
        } else if (typeof value === "string") {
          if (!fieldOptions && value.length > 50) type = "textarea";
          convertedValue = value;
        } else if (Array.isArray(value)) {
          type = "select";
          convertedValue = JSON.stringify(value);
          if (fieldOptions) {
            options = fieldOptions.map((opt) => ({
              label: opt.label,
              value: opt.value,
            }));
          }
        } else if (value === null) {
          convertedValue = undefined;
        }

        return {
          key,
          label: PARAM_FIELD_NAME_MAP[key] || key,
          type,
          value: convertedValue,
          options,
          required: false,
        };
      }
    );

    return {
      id: Date.now().toString(),
      role: "assistant" as const,
      content: `匹配功能：${FUNCTION_NAME_MAP[data.function] || data.function || "无"}`,
      timestamp: new Date(),
      functionMatch: matchedFunction,
      parameters,
      platform: data.platform || null,
    };
  };

  const handleSend = async (message: string) => {
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
      const data = await sendMessage(message);
      if (data) {
        const aiMessage = convertToMessage(data);
        setMessages((prev) => [...prev, aiMessage]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    console.log("选择会话:", conversation);
    // TODO: 加载会话消息
  };

  const handleNewConversation = () => {
    setMessages([]);
    console.log("新建会话");
  };

  const handleDeleteConversation = (id: string) => {
    console.log("删除会话:", id);
    // TODO: 删除会话
  };

  const handleShareConversation = (id: string) => {
    console.log("分享会话:", id);
    // TODO: 分享会话
  };

  return (
    <div className="h-full flex bg-gray-50 rounded-lg overflow-hidden shadow-sm">
      {/* 主内容区域 */}
      <div className="flex-[0.75] flex flex-col bg-white overflow-hidden">
        {/* 对话消息区域 */}
        <div className="flex-1 overflow-y-auto">
          <MessageList
            messages={messages}
            onParameterChange={handleParameterChange}
          />
        </div>

        <ChatInput onSend={handleSend} loading={loading} />
      </div>

      <div className="flex-[0.25] flex-shrink-0">
        <HomeRight
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onDeleteConversation={handleDeleteConversation}
          onShareConversation={handleShareConversation}
        />
      </div>
    </div>
  );
};

export default Home;
