import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { FunctionMatch } from "./FunctionCard";
import ParameterForm, { Parameter } from "./ParameterForm";
import { EditOutlined, RightOutlined } from "@ant-design/icons";
import {
  buildWorkflowMatchUrl,
  WorkflowMatchResult,
  PLATFORM_NAME_MAP,
  FUNCTION_NAME_MAP,
} from "../../utils/workflowMatchNavigate";

interface FunctionMatchResultProps {
  functionMatch: FunctionMatch;
  parameters: Parameter[];
  platform?: string | null;
  onModify?: () => void;
  onProceed?: () => void;
  onParameterChange?: (parameters: Parameter[]) => void;
}

const FunctionMatchResult = ({
  functionMatch,
  parameters,
  platform,
  onModify,
  onProceed,
  onParameterChange,
}: FunctionMatchResultProps) => {
  const [expandedParams, setExpandedParams] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [localParameters, setLocalParameters] =
    useState<Parameter[]>(parameters);
  const [navigating, setNavigating] = useState(false);
  const visibleParams = expandedParams
    ? localParameters
    : localParameters.slice(0, 2);
  const hiddenCount = localParameters.length - 2;

  // 当外部参数更新时，同步本地参数
  useEffect(() => {
    console.log("【FunctionMatchResult 接收到的参数】", {
      functionMatch,
      parameters,
      platform,
    });
    setLocalParameters(parameters);
  }, [parameters, functionMatch, platform]);

  const handleModify = () => {
    console.log("打开修改参数 Modal");
    setModalVisible(true);
    onModify?.();
  };

  const handleModalOk = () => {
    console.log("【Modal 确定 - 保存的参数】", localParameters);
    console.log("【参数详情】", JSON.stringify(localParameters, null, 2));
    onParameterChange?.(localParameters);
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    // 取消时恢复原始参数
    setLocalParameters(parameters);
    setModalVisible(false);
  };

  const handleProceed = async () => {
    if (!functionMatch.name || !platform) {
      console.error("缺少必要信息：function 或 platform");
      return;
    }

    setNavigating(true);
    try {
      console.log("【开始构建跳转参数】", {
        functionMatch: functionMatch.name,
        platform,
        localParameters,
      });
      // 将参数转换为后端格式
      const param: Record<string, any> = {};
      localParameters.forEach((p) => {
        if (p.value !== undefined && p.value !== null && p.value !== "") {
          // 处理数组类型（如 roomList）
          if (
            p.type === "select" &&
            typeof p.value === "string" &&
            p.value.startsWith("[")
          ) {
            try {
              param[p.key] = JSON.parse(p.value);
            } catch {
              param[p.key] = p.value;
            }
          } else if (
            p.type === "select" &&
            (p.value === "true" || p.value === "false")
          ) {
            param[p.key] = p.value === "true";
          } else if (p.type === "number") {
            param[p.key] = Number(p.value);
          } else {
            param[p.key] = p.value;
          }
        }
      });

      console.log("【转换后的跳转参数 param】", param);
      console.log("【参数详情 JSON】", JSON.stringify(param, null, 2));

      const result: WorkflowMatchResult = {
        platform,
        function: functionMatch.name,
        param,
      };

      console.log("【构建 URL 的完整结果】", result);
      const url = await buildWorkflowMatchUrl(result);
      console.log("【最终构建的 URL】", url);
      if (url) {
        window.location.href = url;
      } else {
        console.error("无法构建 URL");
        alert("无法构建跳转 URL，请检查参数配置");
      }
    } catch (error) {
      console.error("跳转失败:", error);
      alert(
        `跳转失败: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setNavigating(false);
    }
  };

  const formatParameterValue = (param: Parameter) => {
    if (param.value === undefined || param.value === "") {
      return "未设置";
    }
    if (param.type === "select" && param.options) {
      const option = param.options.find((opt) => opt.value === param.value);
      return option ? option.label : param.value;
    }
    return String(param.value);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-800 m-0">
          功能匹配结果
        </h3>
      </div>
      <div className="px-4 py-3 space-y-3">
        <div>
          <span className="text-sm text-gray-500">平台</span>
          <span className="text-sm text-gray-800 ml-2">
            {platform ? PLATFORM_NAME_MAP[platform] || platform : "未知"}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-500">功能</span>
          <span className="text-sm text-gray-800 ml-2 font-medium">
            {FUNCTION_NAME_MAP[functionMatch.name] || functionMatch.name}
          </span>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-2">参数</div>
          <div className="space-y-1.5">
            {visibleParams.map((param) => (
              <div key={param.key} className="text-sm text-gray-800">
                <span className="text-gray-600">{param.label}:</span>{" "}
                <span className="font-medium">
                  {formatParameterValue(param)}
                </span>
              </div>
            ))}
            {!expandedParams && hiddenCount > 0 && (
              <button
                onClick={() => setExpandedParams(true)}
                className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                展开更多({hiddenCount}) ↓
              </button>
            )}
            {expandedParams && hiddenCount > 0 && (
              <button
                onClick={() => setExpandedParams(false)}
                className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                收起 ↑
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-gray-200 flex justify-end gap-2 bg-gray-50">
        <Button
          icon={<EditOutlined />}
          onClick={handleModify}
          className="border-gray-300"
        >
          修改参数
        </Button>
        <Button
          type="primary"
          icon={<RightOutlined />}
          onClick={handleProceed}
          loading={navigating}
          disabled={!platform || !functionMatch.name}
          className="bg-green-500 hover:bg-green-600 border-green-500"
        >
          前往
        </Button>
      </div>

      <Modal
        title="编辑参数"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText="确定"
        cancelText="取消"
        destroyOnClose={false}
        maskClosable={false}
      >
        <ParameterForm
          parameters={localParameters}
          onChange={setLocalParameters}
        />
      </Modal>
    </div>
  );
};

export default FunctionMatchResult;
