"use client";

import type { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { sanitizeInput, type InputFieldType } from "@/lib/character-rules";

type ValidatedInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  fieldType: InputFieldType;
  onValueChange: (value: string) => void;
};

export function ValidatedInput({ fieldType, onValueChange, value, ...props }: ValidatedInputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onValueChange(sanitizeInput(fieldType, e.target.value));
  }

  return <input {...props} value={value} onChange={handleChange} />;
}

type ValidatedTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
  fieldType: InputFieldType;
  onValueChange: (value: string) => void;
};

export function ValidatedTextarea({ fieldType, onValueChange, value, ...props }: ValidatedTextareaProps) {
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onValueChange(sanitizeInput(fieldType, e.target.value));
  }

  return <textarea {...props} value={value} onChange={handleChange} />;
}
