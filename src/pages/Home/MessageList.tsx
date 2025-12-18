import React from "react";
import { Avatar } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import FunctionMatchResult from "./FunctionMatchResult";
import { FunctionMatch } from "./FunctionCard";
import { Parameter } from "./ParameterForm";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  functionMatch?: FunctionMatch;
  parameters?: Parameter[];
  platform?: string | null;
}

interface MessageListProps {
  messages: Message[];
  onParameterChange?: (messageId: string, parameters: Parameter[]) => void;
  onNavigate?: (messageId: string) => void;
}

const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const MessageList = ({
  messages,
  onParameterChange,
  onNavigate,
}: MessageListProps) => {
  return (
    <div
      className={`flex-1 overflow-y-auto px-6 py-4 ${messages.length === 0 ? "flex items-center justify-center" : ""}`}
    >
      {messages.length === 0 ? (
        <p className="text-lg text-center text-gray-400">
          开始对话，告诉我您想要做什么
        </p>
      ) : (
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar
                  icon={<RobotOutlined />}
                  className="bg-blue-500 flex-shrink-0"
                  size="small"
                />
              )}

              <div
                className={`max-w-[70%] ${
                  message.role === "user" ? "order-1" : "order-1"
                }`}
              >
                {message.role === "user" ? (
                  <div className="flex flex-col items-end">
                    <div className="text-xs text-gray-400 mb-1">
                      {formatTime(message.timestamp)}
                    </div>
                    <div className="bg-green-500 text-white rounded-lg px-4 py-2.5 inline-block">
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400 mb-1">
                      {formatTime(message.timestamp)}
                    </div>
                    {message.functionMatch ? (
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        {message.content && (
                          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                            <div className="whitespace-pre-wrap text-gray-800 text-sm">
                              {message.content}
                            </div>
                          </div>
                        )}
                        <div>
                          <FunctionMatchResult
                            functionMatch={message.functionMatch}
                            parameters={message.parameters || []}
                            platform={message.platform}
                            onParameterChange={(updatedParams) => {
                              onParameterChange?.(message.id, updatedParams);
                            }}
                            onProceed={() => {
                              onNavigate?.(message.id);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      message.content && (
                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                          <div className="whitespace-pre-wrap text-gray-800">
                            {message.content}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {message.role === "user" && (
                <Avatar
                  icon={<UserOutlined />}
                  className="bg-gray-400 flex-shrink-0 order-2"
                  size="small"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;
