import React, { useState } from "react";
import Home from "./pages/Home";
import Settings from "./components/Settings";
import TitleBar from "./components/TitleBar";
console.log(1);

const App = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="h-screen bg-gray-50 overflow-hidden flex flex-col">
      {/* 标题栏区域 */}
      <TitleBar onSettingsClick={() => setShowSettings(true)} />

      {/* 主内容区域 */}
      {showSettings ? (
        <Settings onClose={() => setShowSettings(false)} />
      ) : (
        <div className="flex-1 overflow-hidden p-4">
          <Home />
        </div>
      )}
    </div>
  );
};

export default App;
