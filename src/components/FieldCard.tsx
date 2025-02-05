import React from 'react';
import { Trash2 } from 'lucide-react';
import { Field } from '../types/form';

type FieldCardProps = {
  field: Field;
  onDelete: () => void;
};

export default function FieldCard({ field, onDelete }: FieldCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border relative group">
      <button
        onClick={onDelete}
        className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={18} />
      </button>
      
      <h4 className="font-medium capitalize text-gray-900">{field.type}</h4>
      <div className="text-sm text-gray-600 mt-2 space-y-1">
        {field.validation.minLength && (
          <p>Min Length: {field.validation.minLength}</p>
        )}
        {field.validation.maxLength && (
          <p>Max Length: {field.validation.maxLength}</p>
        )}
        {field.validation.specialCharacters?.length ? (
          <p>Special Characters: {field.validation.specialCharacters.join(' ')}</p>
        ) : null}
      </div>
    </div>
  );
}