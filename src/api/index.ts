// 保留你的类型定义（无需修改）
import { FunctionMatch } from "../pages/Home/FunctionCard";
import { Parameter } from "../pages/Home/ParameterForm";
import { Message } from "../pages/Home/MessageList";
import {
  PARAM_FIELD_NAME_MAP,
  PARAM_FIELD_OPTIONS,
  FUNCTION_NAME_MAP,
  PLATFORM_NAME_MAP,
} from "../utils/workflowMatchNavigate";

// 1. 修正：后端服务地址（改为FastAPI的实际地址，端口8000）
const API_BASE_URL = "http://localhost:8000";

// 2. 修正：请求参数名（后端需要 prompt，而非 message）
interface SendMessageRequest {
  prompt: string; // 原 message 改为 prompt
}

// 3. 修正：响应类型（匹配后端实际返回格式，而非前端期望格式）
interface BackendResponse {
  platform: string | null;
  function: string | null;
  param: Record<string, string | number | boolean | null>; // 后端返回的参数对象
  error?: string;
}

// 后端返回标准格式：{ platform, function, param }

export const sendMessage = async (message: string): Promise<Message> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/workflow/match`, // 4. 修正：接口路径（后端定义的 /api/workflow/match）
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: message, // 5. 修正：参数名（message 改为 prompt，与后端一致）
        } as SendMessageRequest),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`请求失败：${errorData.detail || response.statusText}`);
    }

    // 后端返回标准格式：{ platform, function, param }
    const data: BackendResponse = await response.json();
    console.log("【API 返回原始数据】", data);
    console.log("【后端返回的参数 param】", data.param);

    // 6. 关键：将后端返回格式 映射为 前端需要的 Message 格式
    const matchedFunction: FunctionMatch | undefined = data.function
      ? {
          id: Date.now().toString(), // 用时间戳生成唯一ID（后端未返回id，前端自增）
          name: data.function, // 后端返回的功能名（如 AiAgentsViewWorkflow）
          description: `平台：${data.platform ? PLATFORM_NAME_MAP[data.platform] || data.platform : "未知"}`, // 使用映射表获取平台名称
          confidence: 0.95, // 默认置信度（后端未返回，可自定义）
        }
      : undefined;

    // 7. 将后端的 param 转换为前端需要的 Parameter 数组
    console.log("【开始转换参数】", Object.entries(data.param || {}));
    const parameters: Parameter[] = data.param
      ? Object.entries(data.param).map(([key, value]) => {
          // 根据值的类型判断字段类型
          let type: "text" | "number" | "select" | "textarea" = "text";
          let convertedValue: string | number | undefined = undefined;
          let options:
            | Array<{ label: string; value: string | number }>
            | undefined = undefined;

          // 检查是否有固定选项配置
          const fieldOptions = PARAM_FIELD_OPTIONS[key];
          if (fieldOptions) {
            type = "select";
            options = fieldOptions.map((opt) => ({
              label: opt.label,
              value: opt.value,
            }));
          }

          if (typeof value === "number") {
            if (!fieldOptions) {
              type = "number";
            }
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
            if (!fieldOptions) {
              if (value.length > 50) {
                type = "textarea";
              }
            }
            convertedValue = value;
          } else if (Array.isArray(value)) {
            // 处理数组类型（如 roomList）
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
            key, // 参数名（如 workid、username）
            label: PARAM_FIELD_NAME_MAP[key] || key, // 使用映射表获取中文标签
            type, // 字段类型
            value: convertedValue, // 参数值
            options, // 选项配置
            required: false, // 可根据后端字段约束调整是否必填
          };
        })
      : [];
    console.log("【转换后的参数数组】", parameters);

    const result: Message = {
      id: Date.now().toString(),
      role: "assistant" as const,
      content: data.error
        ? `错误：${data.error}`
        : `匹配功能：${data.function ? FUNCTION_NAME_MAP[data.function] || data.function : "无"}`, // 使用映射表获取功能名称
      timestamp: new Date(),
      functionMatch: matchedFunction,
      parameters: parameters,
      platform: data.platform || null,
    };
    console.log("【最终返回的 Message】", result);
    return result;
  } catch (error) {
    console.error("发送请求失败：", error);
    // 错误处理：返回错误信息给前端
    return {
      id: Date.now().toString(),
      role: "assistant",
      content: `连接失败：${(error as Error).message}`,
      timestamp: new Date(),
      functionMatch: undefined,
      parameters: [],
    };
  }
};
