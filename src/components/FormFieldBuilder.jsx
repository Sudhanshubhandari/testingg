import React, { useState } from 'react';
import TestCaseInputs from './TestCaseInputs';
import ValidationRules from './ValidationRules';
import FieldCard from './FieldCard';
import SaveSection from './SaveSection';
import FieldTypeSelector from './FieldTypeSelector';
import { saveTextConfiguration, saveDbConfiguration } from '../utils/api';

export default function FormFieldBuilder() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [selectedDbType, setSelectedDbType] = useState('');
  const [validation, setValidation] = useState({});
  const [positiveTestCases, setPositiveTestCases] = useState(1);
  const [negativeTestCases, setNegativeTestCases] = useState(1);
  const [dropdownProfiles, setDropdownProfiles] = useState(1);
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [customFieldName, setCustomFieldName] = useState('');

  // Track used field types (including both text and DB fields)
  const usedFields = fields.map(field => field.type);

  const resetForm = () => {
    setSelectedField('');
    setSelectedDbType('');
    setValidation({});
    setError('');
    setCustomFieldName('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFieldSelect = (type) => {
    if (type === 'db' && selectedDbType) {
      setSelectedDbType('');
    }
    setSelectedField(type);
    setValidation({});
    setError('');
    if (type !== 'other') {
      setCustomFieldName('');
    }
  };

  const handleDbTypeSelect = (type) => {
    if (usedFields.includes(type)) {
      setError('This DB field is already used');
      return;
    }
    setSelectedDbType(type);
    if (type) {
      setSelectedField('db');
    }
  };

  const isValidationValid = () => {
    if (!validation.minLength || !validation.maxLength) return true;
    return parseInt(validation.minLength) <= parseInt(validation.maxLength);
  };

  const handleAddField = () => {
    if (!isValidationValid()) {
      setError('Minimum length cannot be greater than maximum length');
      return;
    }

    let fieldData;
    
    if (selectedField === 'db' && selectedDbType) {
      if (usedFields.includes(selectedDbType)) {
        setError('This DB field is already used');
        return;
      }
      fieldData = {
        type: selectedDbType,
        isDbField: true
      };
    } else if (selectedField) {
      const fieldType = selectedField === 'other' ? customFieldName : selectedField;
      
      // Check if custom field name is already used
      if (selectedField === 'other' && !customFieldName.trim()) {
        setError('Please enter a custom field name');
        return;
      }
      if (selectedField === 'other' && usedFields.includes(customFieldName.trim())) {
        setError('This field name is already used');
        return;
      }
      
      fieldData = {
        type: fieldType,
        validation
      };
    }
    
    if (fieldData) {
      setFields([...fields, fieldData]);
      resetForm();
    }
  };

  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!email) {
      throw new Error('Please enter your email address');
    }
    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }
    if (fields.length === 0) {
      throw new Error('Please add at least one field');
    }
  };

  const handleSave = async () => {
    try {
      setError('');
      setIsSaving(true);
      
      validateForm();

      const textFields = fields.filter(field => !field.isDbField);
      const dropdownFields = fields.filter(field => field.isDbField);

      const payload = {
        email,
        positiveTestCases,
        negativeTestCases,
        dropdownProfiles,
        textField: textFields.length > 0 ? { fields: textFields } : undefined,
        dropdownField: dropdownFields.length > 0 ? { fields: dropdownFields } : undefined
      };

      const hasDbFields = fields.some(field => field.isDbField);
      if (hasDbFields) {
        await saveDbConfiguration(payload);
      } else {
        await saveTextConfiguration(payload);
      }

      setFields([]);
      setEmail('');
      setPositiveTestCases(1);
      setNegativeTestCases(1);
      setDropdownProfiles(1);
      
      alert('Configuration saved successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4">
        <TestCaseInputs
          positiveCount={positiveTestCases}
          negativeCount={negativeTestCases}
          dropdownProfiles={dropdownProfiles}
          onPositiveChange={setPositiveTestCases}
          onNegativeChange={setNegativeTestCases}
          onDropdownProfilesChange={setDropdownProfiles}
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <FieldTypeSelector
          selectedField={selectedField}
          selectedDbType={selectedDbType}
          customFieldName={customFieldName}
          onCustomFieldChange={setCustomFieldName}
          onFieldSelect={handleFieldSelect}
          onDbTypeSelect={handleDbTypeSelect}
          usedFields={usedFields}
        />

        {selectedField && !selectedField.includes('db') && (
          <div className="mt-4">
            <ValidationRules validation={validation} onChange={setValidation} />
          </div>
        )}

        {((selectedField && !selectedField.includes('db') && validation) || (selectedField === 'db' && selectedDbType)) && (
          <button
            onClick={handleAddField}
            disabled={!isValidationValid()}
            className={`w-full py-2.5 px-4 rounded-lg text-white transition-colors ${
              isValidationValid() 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Add Field
          </button>
        )}
      </div>

      {fields.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-3">Added Fields</h3>
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
        onEmailChange={setEmail}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}