'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import styles from './styles.module.css';

interface ImageUrlInputProps {
  id: string;
  label: string;
  placeholder?: string;
  onChange?: (value: string, isValid: boolean) => void;
}

type ValidationState = 'idle' | 'loading' | 'valid' | 'invalid';

export function ImageUrlInput({ id, label, placeholder, onChange }: ImageUrlInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [validationState, setValidationState] = useState<ValidationState>('idle');
  const debouncedValue = useDebounce(inputValue, 500);

  const validateImageUrl = async (url: string) => {
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
  };

  useEffect(() => {
    validateImageUrl(debouncedValue);
  }, [debouncedValue]);

  const StatusIcon = {
    idle: null,
    loading: <Loader2 className="h-4 w-4 animate-spin text-[--primary-400]" color="blue" />,
    valid: <CheckCircle2 className="h-4 w-4 text-[--secondary-400]" />,
    invalid: <XCircle className="h-4 w-4 text-[--error-400]" />,
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
    </div>
  );
} 