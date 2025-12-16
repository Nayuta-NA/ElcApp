import React from "react";
import { Form, Input, Select } from "antd";

const { TextArea } = Input;

export interface Parameter {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  value: string | number | undefined;
  options?: Array<{ label: string; value: string | number }>;
  required?: boolean;
  description?: string;
}

interface ParameterFormProps {
  parameters: Parameter[];
  onChange?: (parameters: Parameter[]) => void;
}

const ParameterForm = ({ parameters, onChange }: ParameterFormProps) => {
  const [form] = Form.useForm();

  const handleValueChange = (
    key: string,
    value: string | number | undefined
  ) => {
    const updated = parameters.map((param) =>
      param.key === key ? { ...param, value } : param
    );
    onChange?.(updated);
  };

  const renderField = (param: Parameter) => {
    switch (param.type) {
      case "select": {
        // 检查是否是数组类型字段（如 roomList）
        const isMultiple = param.key === "roomList" || param.key === "meetUser";
        const selectValue =
          isMultiple &&
          typeof param.value === "string" &&
          param.value.startsWith("[")
            ? JSON.parse(param.value)
            : param.value;

        return (
          <Select
            mode={isMultiple ? "multiple" : undefined}
            value={selectValue as string | string[]}
            onChange={(value) => {
              if (isMultiple && Array.isArray(value)) {
                handleValueChange(param.key, JSON.stringify(value));
              } else {
                handleValueChange(param.key, value as string | number);
              }
            }}
            options={param.options}
            className="w-full"
            showSearch
            allowClear
            placeholder={`请选择${param.label}`}
          />
        );
      }
      case "textarea":
        return (
          <TextArea
            value={param.value as string}
            onChange={(e) => handleValueChange(param.key, e.target.value)}
            rows={3}
            placeholder={`请输入${param.label}`}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={param.value as string | number}
            onChange={(e) =>
              handleValueChange(
                param.key,
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder={`请输入${param.label}`}
          />
        );
      default:
        return (
          <Input
            value={param.value as string}
            onChange={(e) => handleValueChange(param.key, e.target.value)}
            placeholder={`请输入${param.label}`}
          />
        );
    }
  };

  if (parameters.length === 0) {
    return null;
  }

  return (
    <Form form={form} layout="vertical" className="space-y-4">
      {parameters.map((param) => (
        <Form.Item
          key={param.key}
          label={param.label}
          tooltip={param.description}
          required={param.required}
        >
          {renderField(param)}
        </Form.Item>
      ))}
    </Form>
  );
};

export default ParameterForm;
