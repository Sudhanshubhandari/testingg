import React from 'react';
import { ChevronDown } from 'lucide-react';
import CourseSelector from './CourseSelector';

const fieldTypes = [
  { value: 'name', label: 'Name' },
  { value: 'password', label: 'Password' },
  { value: 'UG', label: 'UG Courses' }
];

type FieldTypeSelectorProps = {
  selectedField: string;
  selectedCourse: string;
  selectedSpecializations: string[];
  customSpecialization: string;
  customField: string;
  onFieldSelect: (value: string) => void;
  onCourseSelect: (value: string) => void;
  onSpecializationToggle: (value: string[]) => void;
  onCustomSpecializationChange: (value: string) => void;
  onCustomFieldChange: (value: string) => void;
};

export default function FieldTypeSelector({
  selectedField,
  selectedCourse,
  selectedSpecializations,
  customSpecialization,
  customField,
  onFieldSelect,
  onCourseSelect,
  onSpecializationToggle,
  onCustomSpecializationChange,
  onCustomFieldChange
}: FieldTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <select
          value={selectedField}
          onChange={(e) => onFieldSelect(e.target.value)}
          className="w-full p-3 border rounded-lg appearance-none bg-white pr-10 cursor-pointer"
        >
          <option value="">Select Field Type</option>
          {fieldTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
      </div>

      {selectedField === 'UG' && (
        <CourseSelector
          selectedCourse={selectedCourse}
          selectedSpecializations={selectedSpecializations}
          customSpecialization={customSpecialization}
          onCourseSelect={onCourseSelect}
          onSpecializationToggle={onSpecializationToggle}
          onCustomSpecializationChange={onCustomSpecializationChange}
        />
      )}

      {selectedField === 'others' && (
        <input
          type="text"
          value={customField}
          onChange={(e) => onCustomFieldChange(e.target.value)}
          placeholder="Enter custom field name"
          className="w-full p-3 border rounded-lg"
        />
      )}
    </div>
  );
}