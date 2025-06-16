'use client';
import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, XCircle, FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import styles from './styles.module.css';
import Image from 'next/image';

interface ImageUrlInputProps {
  id: string;
  label: string;
  placeholder?: string;
  onChange?: (value: string, isValid: boolean) => void;
  defaultValue?: string;
}

type ValidationState = 'idle' | 'loading' | 'valid' | 'invalid';

const colors = {
  valid: {
    fill: 'var(--secondary-400)',
    stroke: 'white',
  },
  invalid: {
    fill: 'var(--error-400)',
    stroke: 'white',
  },
}

export function ImageUrlInput({ id, label, placeholder, onChange, defaultValue }: ImageUrlInputProps) {
  const [inputValue, setInputValue] = useState(defaultValue || '');
  const [validationState, setValidationState] = useState<ValidationState>('idle');
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
      validateImageUrl(defaultValue);
    }
  }, [defaultValue]);

  const validateImageUrl = useCallback(async (url: string) => {
    if (!url) {
      setValidationState('idle');
      onChange?.(url, false);
      return;
    }

    setValidationState('loading');

    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      const isValid = response.ok && contentType?.startsWith('image/');
      setValidationState(isValid ? 'valid' : 'invalid');
      onChange?.(url, isValid ?? false);
    } catch (error) {
      console.error(error);
      setValidationState('invalid');
      onChange?.(url, false);
    }
  }, [onChange]);

  useEffect(() => {
    validateImageUrl(debouncedValue);
  }, [debouncedValue, validateImageUrl]);

  const StatusIcon = {
    idle: null,
    loading: <Loader2 className="h-4 w-4 animate-spin text-[--primary-400]" />,
    valid: <CheckCircle2 className="h-4 w-4 text-[--secondary-400]" fill={colors.valid.fill} stroke={colors.valid.stroke} />,
    invalid: <XCircle className="h-4 w-4 text-[--error-400]" fill={colors.invalid.fill} stroke={colors.invalid.stroke} />,
  }[validationState];

  return (
    <div className="grid w-full items-center gap-3">
      <Label htmlFor={id}>{label}</Label>
      <div className={styles.inputWrapper}>
        <Input
          type="url"
          id={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className={cn(
            styles.input,
            validationState === 'valid' && styles.valid,
            validationState === 'invalid' && styles.invalid
          )}
        />
        {StatusIcon && (
          <div className={styles.iconWrapper}>
            {StatusIcon}
          </div>
        )}
      </div>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border flex items-center justify-center bg-muted">
        {validationState === "loading" && (
          <Loader2 className="h-4 w-4 animate-spin text-[--primary-400]" />
        )}
        {validationState === "valid" && inputValue && (
          <Image
            width={100}
            height={100}
            src={inputValue}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        )}
        {validationState === "invalid" && (
          <h3 className="text-[--text-600] text-xl">Imagem não encontrada</h3>
        )}
        {validationState === "idle" && (
          <FileImage className="h-10 w-10 text-[--text-400]" />
        )}
      </div>
    </div>
  );
} 