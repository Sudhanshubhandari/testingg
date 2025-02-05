import React from 'react';

type TestCaseInputsProps = {
  positiveCount: number;
  negativeCount: number;
  onPositiveChange: (count: number) => void;
  onNegativeChange: (count: number) => void;
};

export default function TestCaseInputs({
  positiveCount,
  negativeCount,
  onPositiveChange,
  onNegativeChange
}: TestCaseInputsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Positive Test Cases
        </label>
        <input
          type="number"
          min="0"
          value={positiveCount}
          onChange={(e) => onPositiveChange(parseInt(e.target.value) || 0)}
          className="w-full p-2.5 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Negative Test Cases
        </label>
        <input
          type="number"
          min="0"
          value={negativeCount}
          onChange={(e) => onNegativeChange(parseInt(e.target.value) || 0)}
          className="w-full p-2.5 border rounded-lg"
        />
      </div>
    </div>
  );
}