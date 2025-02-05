export type ValidationRule = {
  maxLength?: number;
  minLength?: number;
  specialCharacters?: string[];
};

export type Field = {
  type: 'text' | 'dropdown';
  validation: ValidationRule;
};