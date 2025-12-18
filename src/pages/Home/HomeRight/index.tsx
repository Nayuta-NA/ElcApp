import React, { useState } from "react";
import { Button } from "antd";
import {
  PlusOutlined,
  ShareAltOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
export interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
}

interface HomeRightProps {
  conversations?: Conversation[];
  onSelectConversation?: (conversation: Conversation) => void;
  onNewConversation?: () => void;
  onDeleteConversation?: (id: string) => void;
  onShareConversation?: (id: string) => void;
}

const HomeRight: React.FC<HomeRightProps> = ({
  conversations = [],
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onShareConversation,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 默认示例数据
  const defaultConversations: Conversation[] = [
    {
      id: "1",
      title: "查看企业高管账号搜索发布记录详情",
      timestamp: new Date("2025-12-16T10:50:46"),
    },
    {
      id: "2",
      title: "用户表达自我及使用网络用语",
      timestamp: new Date("2025-12-16T10:27:31"),
    },
    {
      id: "3",
      title: "新对话",
      timestamp: new Date("2025-12-16T10:27:02"),
    },
    {
      id: "4",
      title: "与焦爽开会邀约",
      timestamp: new Date("2025-12-16T09:43:01"),
    },
    {
      id: "5",
      title: "小红书工作流查询",
      timestamp: new Date("2025-12-15T17:21:02"),
    },
    {
      id: "6",
      title: "小红书工作流详情查看需求",
      timestamp: new Date("2025-12-15T17:17:42"),
    },
    {
      id: "7",
      title: "小红书工作流查询",
      timestamp: new Date("2025-12-15T17:16:33"),
    },
    {
      id: "8",
      title: "新建名为小蓝书哈哈哈的工作流",
      timestamp: new Date("2025-12-15T17:05:02"),
    },
    {
      id: "9",
      title: '新建名为"小蓝书哈哈哈"的工作流',
      timestamp: new Date("2025-12-15T17:03:47"),
    },
    {
      id: "10",
      title: "小红书调试页面详情查看",
      timestamp: new Date("2025-12-15T16:47:08"),
    },
  ];
  const displayConversations =
    conversations.length > 0 ? conversations : defaultConversations;

  const formatTimestamp = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedId(conversation.id);
    onSelectConversation?.(conversation);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteConversation?.(id);
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleShare = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onShareConversation?.(id);
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      {/* 头部 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-green-400 rounded"></div>
          <div className="text-base font-medium text-gray-800 leading-none">
            历史会话
          </div>
        </div>
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          onClick={onNewConversation}
          className="bg-gradient-to-r from-blue-500 to-green-500 border-none hover:from-blue-600 hover:to-green-600"
        >
          新会话
        </Button>
      </div>

      {/* 会话列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="relative">
          {/* 时间轴虚线 */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-gray-300"></div>

          {/* 会话条目 */}
          <div className="space-y-0">
            {displayConversations.map((conversation) => {
              const isSelected = selectedId === conversation.id;
              return (
                <div
                  key={conversation.id}
                  className={`relative pl-8 py-3 cursor-pointer transition-colors ${
                    isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleConversationClick(conversation)}
                >
                  {/* 时间轴圆点 */}
                  <div className="absolute left-4 top-6 w-4 h-4 bg-green-500 rounded-full border-2 border-white z-10"></div>

                  {/* 会话内容 */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-800 font-medium mb-1 line-clamp-2">
                        {conversation.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTimestamp(conversation.timestamp)}
                      </div>
                    </div>

                    {/* 操作按钮（仅在选中时显示） */}
                    {isSelected && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => handleShare(e, conversation.id)}
                          className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                          title="分享"
                        >
                          <ShareAltOutlined className="text-sm" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, conversation.id)}
                          className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="删除"
                        >
                          <DeleteOutlined className="text-sm" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
