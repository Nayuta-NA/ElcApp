import React, { useState } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface ChatInputProps {
  onSend: (message: string) => void;
  loading?: boolean;
}

const ChatInput = ({ onSend, loading = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="请输入"
            autoSize={{ minRows: 1, maxRows: 6 }}
            className="resize-none"
            disabled={loading}
            style={{ minHeight: "80px" }}
          />
        </div>
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={loading}
          disabled={!message.trim()}
          className="h-auto px-6"
        >
          发送
        </Button>
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
        <span>按下 / 使用 prompt 模板</span>
        <span>按下 Shift + Enter 换行</span>
      </div>
    </div>
  );
};

export default ChatInput;
