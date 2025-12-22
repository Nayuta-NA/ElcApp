import React from "react";
import { SettingOutlined } from "@ant-design/icons";

interface SettingsButtonProps {
  onClick: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
      title="设置"
    >
      <SettingOutlined className="text-base" />
    </button>
  );
};

export default SettingsButton;

