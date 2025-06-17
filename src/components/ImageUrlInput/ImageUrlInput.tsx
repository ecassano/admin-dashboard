"use client";
import { useState, useEffect, useCallback, memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import styles from "./styles.module.css";
import Image from "next/image";
import { ValidationState } from "@/app/(services)/contracheque/CampaignForm";

interface ImageUrlInputProps {
  id: string;
  label: string;
  value: string;
  validationState: ValidationState;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (...event: any[]) => void;
}

const colors = {
  valid: {
    fill: "var(--secondary-400)",
    stroke: "white",
  },
  invalid: {
    fill: "var(--error-400)",
    stroke: "white",
  },
};

export const ImageUrlInput = ({
  id,
  value,
  validationState = "idle",
  label,
  placeholder,
  defaultValue,
  onChange,
}: ImageUrlInputProps) => {
  const StatusIcon = {
    idle: null,
    loading: <Loader2 className="h-4 w-4 animate-spin text-[--primary-400]" />,
    valid: (
      <CheckCircle2
        className="h-4 w-4 text-[--secondary-400]"
        fill={colors.valid.fill}
        stroke={colors.valid.stroke}
      />
    ),
    invalid: (
      <XCircle
        className="h-4 w-4 text-[--error-400]"
        fill={colors.invalid.fill}
        stroke={colors.invalid.stroke}
      />
    ),
  }[validationState];

  return (
    <div className="grid w-full items-center gap-3">
      <Label htmlFor={id}>{label}</Label>
      <div className={styles.inputWrapper}>
        <Input
          type="url"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            styles.input,
            validationState === "valid" && styles.valid,
            validationState === "invalid" && styles.invalid
          )}
        />
        {StatusIcon && <div className={styles.iconWrapper}>{StatusIcon}</div>}
      </div>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border flex items-center justify-center bg-muted">
        {validationState === "loading" && (
          <Loader2 className="h-4 w-4 animate-spin text-[--primary-400]" />
        )}
        {validationState === "valid" && value && (
          <Image
            width={100}
            height={100}
            src={value}
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
};
