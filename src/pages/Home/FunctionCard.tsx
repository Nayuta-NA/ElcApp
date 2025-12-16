import React from "react";
import { Card } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

export interface FunctionMatch {
  id: string;
  name: string;
  description?: string;
  confidence?: number;
}

interface FunctionCardProps {
  functionMatch: FunctionMatch;
  onSelect?: (functionMatch: FunctionMatch) => void;
  selected?: boolean;
}

const FunctionCard = ({
  functionMatch,
  onSelect,
  selected = false,
}: FunctionCardProps) => {
  return (
    <Card
      hoverable
      onClick={() => onSelect?.(functionMatch)}
      className={`cursor-pointer transition-all ${
        selected
          ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-800 m-0">
              {functionMatch.name}
            </h3>
            {selected && (
              <CheckCircleOutlined className="text-blue-500 text-lg" />
            )}
          </div>
          {functionMatch.description && (
            <p className="text-sm text-gray-600 mb-2">
              {functionMatch.description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FunctionCard;
