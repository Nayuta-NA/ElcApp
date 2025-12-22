import React from "react";
import SettingsButton from "./SettingsButton";

interface TitleBarProps {
  onSettingsClick: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ onSettingsClick }) => {
  return (
    <div className="h-10 bg-white flex items-center justify-end px-4 gap-1">
      <SettingsButton onClick={onSettingsClick} />
    </div>
  );
};

export default TitleBar;
