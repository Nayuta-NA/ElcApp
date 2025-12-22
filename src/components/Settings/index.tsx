import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import BrowserSelector from "./BrowserSelector";

interface SettingsProps {
  onClose: () => void;
}
//后续可能添加其他设置项
type SettingsSection = "browser";

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const activeSection: SettingsSection = "browser";

  const menuItems = [
    {
      key: "browser" as SettingsSection,
      label: "浏览器设置",
      icon: <GlobalOutlined />,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "browser":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-50 rounded">
                  <GlobalOutlined className="text-xl text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  浏览器设置
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  指定用于打开链接的浏览器。如果不设置，将使用您电脑系统默认的浏览器。
                </p>
                <BrowserSelector />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            此功能开发中...
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col">
      <div className="h-10 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <h2 className="text-sm font-medium text-gray-800">设置</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          关闭
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 bg-gray-100 border-r border-gray-200 overflow-y-auto">
          <div className="p-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.key}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeSection === item.key
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-150 hover:text-gray-800"
                }`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Settings;
