// function 名称到路径的映射表

// 简单的 FlowList 类型定义（用于替代 API 类型）
interface FlowList {
  flowId: string;
  name: string;
  [key: string]: any;
}

/**
 * function 名称到路径的映射表
 */
const FUNCTION_PATH_MAP: Record<string, { path: string }> = {
  /** 新建工作流 */
  AiAgentsNewWorkflow: { path: "workflow" },
  /** 查询工作流 */
  AiAgentsCheckWorkflow: { path: "workflow" },
  /** 复制工作流 */
  AiAgentsCopyWorkflow: { path: "workflow" },
  /** 编辑工作流 */
  AiAgentsEditWorkflow: { path: "workflow" },
  /** 工作流详情 */
  AiAgentsDetailWorkflow: { path: "workflow/detail/" },
  /** 工作流调试 */
  AiAgentsAdjustWorkflow: { path: "workflow/detail/" },
  /** 工作流保存 */
  AiAgentsSaveWorkflow: { path: "workflow/detail/" },
  /** 工作流发布 */
  AiAgentsReleaseWorkflow: { path: "workflow/detail/" },

  /** 工作流调试记录详情 */
  AiAgentsViewWorkflow: { path: "workflow/detail/" },
  /** 工作流发布记录审查 */
  AiAgentsReviewReleaseWorkflow: { path: "workflow/detail/" },
  /** 工作流调试记录审查 */
  AiAgentsReviewWorkflow: { path: "workflow/detail/" },
  /** 调用查询 */
  AiAgentsSearchTaskID: { path: "search" },

  /** 任务审核 */
  AiAgentsTaskAudit: { path: "audit" },
  /** 查看会议 */
  AiMeetingView: { path: "home" },
  /** 查看全部会议 */
  AiMeetingAll: { path: "home" },
  /** 会议可视化 */
  AiMeetingFullCalendar: { path: "home" },
  /** 预约会议 */
  AiMeetingAppointment: { path: "home" },
};

/**
 * function 名称到显示名称的映射表
 */
export const FUNCTION_NAME_MAP: Record<string, string> = {
  AiAgentsNewWorkflow: "新建工作流",
  AiAgentsCheckWorkflow: "查询工作流",
  AiAgentsCopyWorkflow: "复制工作流",
  AiAgentsEditWorkflow: "编辑工作流",
  AiAgentsDetailWorkflow: "工作流详情",
  AiAgentsAdjustWorkflow: "工作流调试",
  AiAgentsSaveWorkflow: "工作流保存",
  AiAgentsReleaseWorkflow: "工作流发布",

  AiAgentsViewWorkflow: "工作流调试记录详情",
  AiAgentsReviewWorkflow: "工作流调试记录审查",
  AiAgentsReviewReleaseWorkflow: "工作流发布记录审查",
  AiAgentsSearchTaskID: "调用查询",
  AiAgentsTaskAudit: "批量任务审核",
  AiMeetingView: "查看会议",
  AiMeetingAll: "查看全部会议",
  AiMeetingFullCalendar: "会议可视化",
  AiMeetingAppointment: "预约会议",
};

/**
 * 平台名称映射
 */
export const PLATFORM_NAME_MAP: Record<string, string> = {
  agents: "Agents",
  meet: "Meeting",
};

/**
 * 参数字段名称映射
 */
export const PARAM_FIELD_NAME_MAP: Record<string, string> = {
  workname: "工作流名称",
  workid: "工作流ID",
  username: "负责人",
  app: "应用名称",
  scene: "使用场景",
  description: "描述",
  ismy: "是否是我的工作流",
  iscopy: "是否复制",
  name: "工作流名称",
  uuid: "调试记录ID",
  taskid: "uuid",
  action: "操作",
  obj: "新值",
  // meet 平台参数字段
  date: "查看日期",
  select: "选择查看（全部/我的）",
  search: "指定查看的人员（仅查看今日）",
  roomList: "选中的会议室名称数组",
  meetUser: "参会人姓名数组",
  viewDate: "查看时间维度",
  type: "会议类型",
  privateModel: "隐私模式",
  tags: "标签",
  reason: "隐私理由",
  meetUserNum: "客户接待参会人数",
  meetDate: "会议日期",
  meetTime: "会议时间",
  time: "预计时长(分钟)",
  subscribe: "是否例会",
  appointMeetType: "例会类型",
  deadline: "例会截止日期",
  title: "会议名称",
  regular: "查看我的例会",
  regulartag: "例会类型",
  tagName: "标签名称",
  joinModel: "参会方式",
};

/* *
 * 参数字段选项配置
 */
export const PARAM_FIELD_OPTIONS: Record<
  string,
  Array<{ value: string; label: string }>
> = {
  // meet_view 的 date 字段
  date: [
    { value: "today", label: "今天" },
    { value: "previous", label: "往期" },
    { value: "future", label: "未来" },
  ],
  // meet_view 的 select 字段
  select: [
    { value: "all", label: "查看全部" },
    { value: "my", label: "查看我的" },
  ],
  // meet_appointment 的 type 字段
  type: [
    { value: "0", label: "类型0" },
    { value: "1", label: "类型1" },
    { value: "2", label: "类型2" },
    { value: "3", label: "类型3" },
    { value: "4", label: "类型4" },
  ],
  // meet_appointment 的 privateModel 字段
  privateModel: [
    { value: "0", label: "文档全部可见" },
    { value: "1", label: "文档仅与会人可见" },
  ],
  // meet_visualization 的 viewDate 字段
  viewDate: [
    { value: "month", label: "月" },
    { value: "week", label: "周" },
    { value: "day", label: "天" },
  ],
  roomList: [
    { value: "502A", label: "502A" },
    { value: "502B", label: "502B" },
    { value: "602", label: "602" },
    { value: "701", label: "701" },
    { value: "C5", label: "C5" },
    { value: "801A", label: "801A" },
    { value: "801B", label: "801B" },
    { value: "802A", label: "802A" },
    { value: "802B", label: "802B" },
    { value: "803A", label: "803A" },
    { value: "803B", label: "803B" },
    { value: "904A", label: "904A" },
    { value: "904B", label: "904B" },
    { value: "904C", label: "904C" },
  ],
  // ismy 字段：是否是我的工作流
  ismy: [
    { value: "true", label: "是" },
    { value: "false", label: "否" },
  ],
  // meet_appointment 的 regular 字段
  regular: [
    { value: "true", label: "是" },
    { value: "false", label: "否" },
  ],
  // meet_all 的 regulartag 字段
  regulartag: [
    { value: "1", label: "日例会" },
    { value: "2", label: "周例会" },
    { value: "3", label: "全部例会" },
  ],
  joinModel: [
    { value: "0", label: "邀请加入" },
    { value: "1", label: "可自由加入" },
  ],
};

/**
 * 平台基础 URL 配置
 */
const PLATFORM_BASE_URL_MAP: Record<string, string> = {
  agents: "http://test.in.newrank.cn",
  meet: "http://test.meeting.newrank.cn",
};

export const ACTION_FIELD_NAME_MAP: Record<string, string> = {
  debug: "调试",
  save: "保存",
  release: "发布",
  format: "格式化工作流",
  refresh: "刷新",
  new: "新版本列表",
  old: "老版本列表",
  goto: "跳转页码",
};

// 工作流匹配结果类型
export interface WorkflowMatchResult {
  platform: string | null;
  function: string | null;
  param: Record<string, any> | null;
  error?: string;
}

/**
 * 根据平台获取基础 URL
 * @param platform 平台名称
 * @returns 基础 URL
 */
const getBaseUrl = (platform: string | null): string => {
  if (!platform) {
    // 默认使用 agents 平台的基础 URL
    return PLATFORM_BASE_URL_MAP.agents;
  }

  // 根据平台返回对应的基础 URL，如果平台不存在则使用默认值
  return PLATFORM_BASE_URL_MAP[platform] || PLATFORM_BASE_URL_MAP.agents;
};

/**
 * 验证参数值是否在固定选项中
 * @param key 参数字段名
 * @param value 参数值
 * @returns 是否有效
 */
const isValidParamValue = (key: string, value: any): boolean => {
  // 如果该字段没有固定选项配置，允许所有值
  const fieldOptions = PARAM_FIELD_OPTIONS[key];
  if (!fieldOptions) {
    return true;
  }

  // 获取所有有效的选项值
  const validValues = fieldOptions.map((option) => option.value);

  // 处理数组类型（如 checkedRoom 多选数组）
  if (Array.isArray(value)) {
    // 数组中的每个值都必须在有效选项中
    return value.every((item) => validValues.includes(String(item)));
  }

  // 处理布尔值类型（如 ismy 字段）
  // 将布尔值转换为对应的字符串值进行比较
  if (typeof value === "boolean") {
    const booleanString = value ? "true" : "false";
    return validValues.includes(booleanString);
  }

  // 处理基本类型，值必须在有效选项中
  return validValues.includes(String(value));
};

/**
 * 过滤参数对象，移除不在固定选项中的值
 * @param params 参数对象
 * @param isNested 是否为嵌套对象内的字段（嵌套对象内的字段不进行固定选项验证）
 * @returns 过滤后的参数对象
 */
const filterInvalidParams = (
  params: Record<string, any>,
  isNested = false
): Record<string, any> => {
  if (!params || typeof params !== "object" || Array.isArray(params)) {
    return params;
  }

  const filtered: Record<string, any> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    // 处理嵌套对象（递归过滤，但不对嵌套对象的 key 进行验证，因为嵌套对象的 key 可能是任意字段）
    if (typeof value === "object" && !Array.isArray(value)) {
      // 递归调用时，标记为嵌套对象内的字段
      const filteredNested = filterInvalidParams(value, true);
      // 如果过滤后的对象不为空，则添加
      if (Object.keys(filteredNested).length > 0) {
        filtered[key] = filteredNested;
      }
    } else {
      // 对于嵌套对象内的字段，不进行固定选项验证，直接保留
      // 对于顶层字段，检查是否有固定选项约束
      if (isNested || isValidParamValue(key, value)) {
        // 嵌套对象内的字段直接添加，或者值在固定选项中，或者字段没有固定选项约束
        filtered[key] = value;
      }
    }
  });

  return filtered;
};

/**
 * 将参数对象转换为 URL 查询字符串
 * @param params 参数对象
 * @returns URL 查询字符串（不包含 ?）
 */
const paramsToQueryString = (params: Record<string, any>): string => {
  const queryParams: string[] = [];

  const processValue = (key: string, value: any) => {
    // 跳过 null 和 undefined
    if (value === null || value === undefined) {
      return;
    }

    // 处理数组类型（如 roomList 多选数组）
    if (Array.isArray(value)) {
      // 将数组转换为 JSON 字符串
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(
          JSON.stringify(value)
        )}`
      );
    } else if (typeof value === "object") {
      // 处理对象类型（如 param 对象、action 对象等）
      // 将对象转换为 JSON 字符串
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(
          JSON.stringify(value)
        )}`
      );
    } else {
      // 处理基本类型
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      );
    }
  };

  // 遍历参数对象
  Object.entries(params).forEach(([key, value]) => {
    processValue(key, value);
  });

  return queryParams.join("&");
};

/**
 * 从参数对象中提取工作流查询参数并查询工作流列表
 * @param param 参数对象，包含 workname 和 workid 字段
 * @returns Promise<FlowList[]> 工作流列表数组
 * 注意：已移除 API 调用，直接返回空数组
 */
export const queryWorkflowListByParam = async (
  _param: Record<string, any>
): Promise<FlowList[]> => {
  // 已移除 API 调用，直接返回空数组
  return [];
};

/**
 * 构建完整的 URL
 * @param result 工作流匹配结果
 * @param workflowList 工作流列表
 * @returns Promise<string | null> 完整的 URL 字符串
 */

export const buildWorkflowMatchUrl = async (
  result: WorkflowMatchResult,
  workflowList?: FlowList[]
): Promise<string | null> => {
  // 验证必要字段
  if (!result.platform || !result.function) {
    return null;
  }

  const baseUrl = getBaseUrl(result.platform);
  const resolveFlowId = (
    currentWorkflowList?: FlowList[],
    param?: Record<string, any> | null
  ): string | null => {
    if (currentWorkflowList && currentWorkflowList.length > 0) {
      const byId = param?.workid
        ? currentWorkflowList.find((item) => item.flowId === param.workid)
        : null;
      if (byId) return byId.flowId;

      const byName = param?.workname
        ? currentWorkflowList.find((item) => item.name === param.workname)
        : null;
      if (byName) return byName.flowId;
    }
    return param?.workid || null;
  };

  const buildUrl = (
    currentWorkflowList?: FlowList[],
    currentResult?: WorkflowMatchResult
  ): string | null => {
    // 使用传入的 result 或默认使用外层 result
    const actualResult = currentResult || result;

    // 获取路径映射（使用最终确定的 function）
    const finalFunction = actualResult.function;
    if (!finalFunction) {
      console.warn("function 不能为 null");
      return null;
    }
    const functionRoute = FUNCTION_PATH_MAP[finalFunction];
    if (!functionRoute) {
      console.warn(`未找到 function "${finalFunction}" 的路径映射`);
      return null;
    }

    // meet 平台不拼接 platform 路径
    const platform = actualResult.platform || "agents";
    const basePath =
      platform === "meet"
        ? `/${functionRoute.path}`
        : `/${platform}/${functionRoute.path}`;

    let urlPath = basePath;
    const redirectToCheck = () =>
      buildUrl(currentWorkflowList, {
        ...actualResult,
        function: "AiAgentsCheckWorkflow",
      });

    // 处理 AiAgentsDetailWorkflow 的特殊路径拼接（统一使用 resolveFlowId，默认 tab=1）
    if (actualResult.function === "AiAgentsDetailWorkflow") {
      const flowId = resolveFlowId(currentWorkflowList, actualResult.param);
      if (!flowId) {
        return redirectToCheck();
      }
      urlPath = `${urlPath}${flowId}?tab=1`;
    }

    if (actualResult.function === "AiAgentsAdjustWorkflow") {
      const flowId = resolveFlowId(currentWorkflowList, actualResult.param);
      if (flowId) {
        urlPath = `${urlPath}${flowId}?tab=1`;
      } else {
        return redirectToCheck();
      }
    }

    if (actualResult.function === "AiAgentsSaveWorkflow") {
      const flowId = resolveFlowId(currentWorkflowList, actualResult.param);
      if (flowId) {
        urlPath = `${urlPath}${flowId}?tab=1`;
      } else {
        return redirectToCheck();
      }
    }

    if (actualResult.function === "AiAgentsReleaseWorkflow") {
      const flowId = resolveFlowId(currentWorkflowList, actualResult.param);
      if (flowId) {
        urlPath = `${urlPath}${flowId}?tab=1`;
      } else {
        return redirectToCheck();
      }
    }
    //
    if (actualResult.function === "AiAgentsViewWorkflow") {
      const flowId = resolveFlowId(currentWorkflowList, actualResult.param);
      if (!flowId) {
        return redirectToCheck();
      }
      const hasDebugId = actualResult.param?.debug_id;
      urlPath = hasDebugId
        ? `${urlPath}${flowId}?tab=2&taskId=${hasDebugId}&page=1`
        : `${urlPath}${flowId}?tab=2`;
    }
    if (actualResult.function === "AiAgentsReviewWorkflow") {
      const flowId = resolveFlowId(currentWorkflowList, actualResult.param);
      if (flowId) {
        urlPath = `${urlPath}${flowId}?tab=2`;
      } else {
        return redirectToCheck();
      }
    }
    if (actualResult.function === "AiAgentsReviewReleaseWorkflow") {
      const flowId = resolveFlowId(currentWorkflowList, actualResult.param);
      if (flowId) {
        urlPath = `${urlPath}${flowId}?tab=3`;
      } else {
        return redirectToCheck();
      }
    }
    if (actualResult.function === "workflow_debughistroy") {
      // 工作流调试记录：跳转到工作流详情页的调试记录标签页（tab=2）
      const flowId = resolveFlowId(currentWorkflowList, actualResult.param);
      if (flowId) {
        // 如果有 uuid（调试记录ID），添加到查询参数中
        const uuid = actualResult.param?.uuid;
        if (uuid) {
          urlPath = `${urlPath}${flowId}?tab=2&taskId=${uuid}&page=1`;
        } else {
          urlPath = `${urlPath}${flowId}?tab=2`;
        }
      } else {
        return null; // 如果找不到 flowId，返回 null
      }
    }
    if (actualResult.function === "workflow_releasehistroy") {
      // 工作流发布记录：跳转到工作流详情页的发布记录标签页（tab=3）
      const flowId =
        currentWorkflowList && currentWorkflowList.length > 0
          ? currentWorkflowList[0].flowId
          : actualResult.param?.workid;
      if (flowId) {
        urlPath = `${urlPath}${flowId}?tab=3`;
      } else {
        return null; // 如果找不到 flowId，返回 null
      }
    }
    if (
      actualResult.function === "AiAgentsSearchTaskID" &&
      actualResult.param?.taskID
    ) {
      urlPath = `${urlPath}?taskID=${actualResult.param.taskID}`;
    }

    const queryPayload: Record<string, any> = {
      function: actualResult.function,
    };
    if (actualResult.param && typeof actualResult.param === "object") {
      const filteredParam = filterInvalidParams(actualResult.param);

      // 特殊处理 AiMeetingAll：将 tagName 从 param 中提取出来作为独立查询参数
      //?tagName=丐帮&function=AiMeetingAll&param={"regulartag":"1"}
      if (actualResult.function === "AiMeetingAll") {
        const tagName = filteredParam.tagName;
        if (tagName !== null && tagName !== undefined) {
          queryPayload.tagName = tagName;
        }
        // 从 param 中移除 tagName，只保留其他参数（如 regulartag）
        const { tagName: _, ...paramWithoutTagName } = filteredParam;
        queryPayload.param = paramWithoutTagName;
      } else {
        queryPayload.param = filteredParam;
      }
    }

    const queryString = paramsToQueryString(queryPayload);

    // 拼接完整 URL
    const fullUrl = queryString
      ? `${baseUrl}${urlPath}${urlPath.includes("?") ? "&" : "?"}${queryString}`
      : `${baseUrl}${urlPath}`;

    console.log("[buildWorkflowMatchUrl] 构建的URL:", {
      platform: actualResult.platform,
      function: actualResult.function,
      baseUrl,
      urlPath,
      queryString,
      fullUrl,
      param: actualResult.param,
    });

    return fullUrl;
  };

  // 如果 param 中包含 workname 或 workid，且没有传入 workflowList，需要先查询工作流列表
  let finalWorkflowList = workflowList;
  let finalResult = result;

  if (result.param && typeof result.param === "object" && !workflowList) {
    const hasWorkname = result.param.workname;
    const hasWorkid = result.param.workid;

    // 对于 AiAgentsAdjustWorkflow，如果 workid 为 null，必须查询工作流列表
    const needsQuery =
      (hasWorkname || hasWorkid) &&
      (result.function === "AiAgentsAdjustWorkflow"
        ? !result.param.workid
        : true);

    if (needsQuery) {
      // 等待查询完成
      const queriedWorkflowList = await queryWorkflowListByParam(result.param);

      finalWorkflowList = queriedWorkflowList;

      // 判断是否完全匹配
      const workname = result.param.workname;
      const workid = result.param.workid;

      // 完全匹配的判断：
      // 1. 如果有 workid，查询结果中第一个的 flowId 必须等于 workid
      // 2. 如果有 workname，查询结果中第一个的 name 必须等于 workname
      // 3. 如果查询结果为空，不算完全匹配
      let isExactMatch = false;
      if (queriedWorkflowList.length > 0) {
        const firstResult = queriedWorkflowList[0];
        if (workid) {
          // 如果有 workid，必须完全匹配 flowId
          isExactMatch = firstResult.flowId === workid;
        } else if (workname) {
          // 如果只有 workname，必须完全匹配 name
          isExactMatch = firstResult.name === workname;
        } else {
          // 如果既没有 workid 也没有 workname，只要有结果就算匹配
          isExactMatch = true;
        }
      }

      // 如果不是完全匹配，且当前功能不是 AiAgentsCheckWorkflow，则改为 AiAgentsCheckWorkflow
      if (!isExactMatch && result.function !== "AiAgentsCheckWorkflow") {
        // 检查是否需要跳转到 AiAgentsCheckWorkflow
        // 对于需要 workid 的功能（如 AiAgentsDetailWorkflow, AiAgentsEditWorkflow 等），如果没有完全匹配，跳转到 AiAgentsCheckWorkflow
        const needsCheckWorkflow = [
          "AiAgentsDetailWorkflow",
          "AiAgentsEditWorkflow",
          "AiAgentsCopyWorkflow",
          "AiAgentsAdjustWorkflow",
          "AiAgentsSaveWorkflow",
          "AiAgentsReleaseWorkflow",
          "workflow_debughistroy",
          "workflow_releasehistroy",
          "AiAgentsViewWorkflow",
          "AiAgentsReviewWorkflow",
          "AiAgentsReviewReleaseWorkflow",
        ].includes(result.function);

        if (needsCheckWorkflow) {
          console.log("匹配筛选不是完全匹配，跳转到 check_workflow 功能", {
            workname,
            workid,
            firstResultName: queriedWorkflowList[0]?.name,
            firstResultFlowId: queriedWorkflowList[0]?.flowId,
            isExactMatch,
            queriedCount: queriedWorkflowList.length,
          });
          finalResult = { ...result, function: "AiAgentsCheckWorkflow" };
        }
      }
    }
  }

  // 使用查询到的工作流列表构建 URL
  const finalUrl = buildUrl(finalWorkflowList, finalResult);
  console.log("[buildWorkflowMatchUrl] 最终返回的URL:", finalUrl, {
    platform: finalResult.platform,
    function: finalResult.function,
    hasWorkflowList: !!finalWorkflowList && finalWorkflowList.length > 0,
  });
  return finalUrl;
};

/**
 * 跳转到工作流匹配结果对应的页面
 * @param result 工作流匹配结果
 * @param navigate React Router 的 navigate 函数（可选，如果提供则使用路由跳转，否则使用 window.location）
 */
export const navigateToWorkflowMatch = async (
  result: WorkflowMatchResult,
  navigate?: (path: string) => void
): Promise<boolean> => {
  const url = await buildWorkflowMatchUrl(result);

  if (!url) {
    console.error("无法构建 URL，匹配结果无效");
    return false;
  }

  // 如果提供了 navigate 函数，使用路由跳转（适用于同域跳转）
  if (navigate) {
    try {
      // 提取路径和查询参数
      const urlObj = new URL(url);
      const pathWithQuery = urlObj.pathname + (urlObj.search || "");
      navigate(pathWithQuery);
      return true;
    } catch (error) {
      console.error("路由跳转失败，使用 window.location:", error);
      // 降级到 window.location
      window.location.href = url;
      return true;
    }
  } else {
    // 使用 window.location 跳转（适用于跨域或完整 URL）
    window.location.href = url;
    return true;
  }
};

/**
 * 验证工作流匹配结果是否有效
 * @param result 工作流匹配结果
 * @returns 是否有效
 */
export const isValidWorkflowMatchResult = (
  result: WorkflowMatchResult
): boolean => {
  return !!(result.platform && result.function && !result.error);
};
