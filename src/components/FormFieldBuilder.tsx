import React, { useState } from 'react';
import TestCaseInputs from './TestCaseInputs';
import ValidationRules from './ValidationRules';
import FieldCard from './FieldCard';
import SaveSection from './SaveSection';
import { Field, ValidationRule } from '../types/form';
import { saveTextConfiguration, saveDbConfiguration } from '../utils/api';

type FormFieldBuilderProps = {
  selectedType: 'text' | 'dropdown' | null;
};

export default function FormFieldBuilder({ selectedType }: FormFieldBuilderProps) {
  const [fields, setFields] = useState<Field[]>([]);
  const [validation, setValidation] = useState<ValidationRule>({});
  const [positiveTestCases, setPositiveTestCases] = useState(1);
  const [negativeTestCases, setNegativeTestCases] = useState(1);
  const [email, setEmail] = useState('');
  const [path, setPath] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAddField = () => {
    if (selectedType) {
      const newField: Field = {
        type: selectedType,
        validation: selectedType === 'text' ? validation : {}
      };
      setFields([...fields, newField]);
      setValidation({});
    }
  };

  const handleDeleteField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!email || !path || fields.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        email,
        path,
        positiveTestCases,
        negativeTestCases,
        fields,
        fieldType: selectedType
      };

      // Call different APIs based on the field type
      if (selectedType === 'text') {
        await saveTextConfiguration(payload);
        alert('Text field configuration saved successfully!');
      } else {
        await saveDbConfiguration(payload);
        alert('DB field configuration saved successfully!');
      }
      
      setFields([]);
      setValidation({});
      setEmail('');
      setPath('');
      setPositiveTestCases(1);
      setNegativeTestCases(1);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <TestCaseInputs
        positiveCount={positiveTestCases}
        negativeCount={negativeTestCases}
        onPositiveChange={setPositiveTestCases}
        onNegativeChange={setNegativeTestCases}
      />

      {/* Only show ValidationRules for text field type */}
      {selectedType === 'text' && (
        <ValidationRules validation={validation} onChange={setValidation} />
      )}

      <button
        onClick={handleAddField}
        className={`w-full py-2.5 px-4 rounded-lg text-white transition-colors ${
          selectedType === 'text' 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        Add {selectedType} Field
      </button>

      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Added Fields</h3>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <FieldCard
                key={index}
                field={field}
                onDelete={() => handleDeleteField(index)}
              />
            ))}
          </div>
        </div>
      )}

      <SaveSection
        email={email}
        path={path}
        onEmailChange={setEmail}
        onPathChange={setPath}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}