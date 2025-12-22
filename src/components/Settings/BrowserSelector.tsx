import React, { useState, useEffect } from "react";
import { Button, Input, message } from "antd";
import { FolderOutlined } from "@ant-design/icons";

const BrowserSelector = () => {
  const [browserPath, setBrowserPath] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // 从本地缓存加载浏览器路径
  useEffect(() => {
    const loadBrowserPath = async () => {
      if (!window.electronAPI) {
        console.warn("electronAPI 不可用，无法加载浏览器路径");
        return;
      }
      try {
        const path = await window.electronAPI.getBrowserPath();
        if (path) {
          setBrowserPath(path);
        }
      } catch (error) {
        console.error("加载浏览器路径失败:", error);
      }
    };
    loadBrowserPath();
  }, []);

  // 选择浏览器路径
  const handleSelectBrowser = async () => {
    if (!window.electronAPI) {
      message.error("无法连接到 Electron API，请确保应用正常运行");
      return;
    }

    setLoading(true);
    try {
      const selectedPath = await window.electronAPI.selectBrowserPath();
      if (selectedPath) {
        // 保存到本地缓存
        const success = await window.electronAPI.saveBrowserPath(selectedPath);
        if (success) {
          setBrowserPath(selectedPath);
          message.success("浏览器路径已保存");
        } else {
          message.error("保存浏览器路径失败");
        }
      } else {
        message.info("已取消选择");
      }
    } catch (error) {
      message.error(
        `选择浏览器路径失败: ${error instanceof Error ? error.message : String(error)}`
      );
      console.error("选择浏览器路径错误:", error);
    } finally {
      setLoading(false);
    }
  };

  // 清除浏览器路径
  const handleClear = async () => {
    if (!window.electronAPI) {
      message.error("无法连接到 Electron API");
      return;
    }
    try {
      const success = await window.electronAPI.saveBrowserPath("");
      if (success) {
        setBrowserPath("");
        message.success("已清除浏览器路径，将使用默认浏览器");
      } else {
        message.error("清除浏览器路径失败");
      }
    } catch (error) {
      message.error(
        `清除浏览器路径失败: ${error instanceof Error ? error.message : String(error)}`
      );
      console.error(error);
    }
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          value={browserPath}
          placeholder="未设置，将使用您电脑上默认的浏览器"
          readOnly
          className="flex-1"
        />
        <Button
          icon={<FolderOutlined />}
          onClick={handleSelectBrowser}
          loading={loading}
        >
          选择浏览器
        </Button>
        {browserPath && (
          <Button danger onClick={handleClear}>
            清除
          </Button>
        )}
      </div>
      <div className="text-xs text-gray-500">
        当前浏览器路径: {browserPath || "（未设置）"}
      </div>
    </div>
  );
};

export default BrowserSelector;
