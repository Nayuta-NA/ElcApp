import { messageget } from "../fetch/base";

export interface BackendResponseItem {
  platform: string;
  function: string;
  param: Record<string, string | number | boolean | null>;
}

export const sendMessage = async (
  message: string
): Promise<BackendResponseItem> => {
  const data = (await messageget.post("/api/workflow/match", {
    prompt: message,
  })) as unknown as BackendResponseItem;
  console.log("【API 返回数据】", data);
  return data;
};
