import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUrlInput } from "@/components/ImageUrlInput/ImageUrlInput";
import { DatePicker } from "@/components/DatePicker";
import { Controller, useForm } from "react-hook-form";
import { Campaign, FormData } from "./page";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export type ValidationState = "idle" | "loading" | "valid" | "invalid";

type CampaignFormProps = {
  prefilledValues: Campaign | null;
  handleSetPrefilledValues: (campaign: Campaign) => void;
};

export const CampaignForm = ({
  prefilledValues,
  handleSetPrefilledValues,
}: CampaignFormProps) => {
  const { handleSubmit, register, setValue, control, getValues, watch } =
    useForm<FormData>({
      defaultValues: {
        title: prefilledValues?.descricao || "",
        verticalBanner: prefilledValues?.urlImagem || "",
        horizontalBanner: prefilledValues?.urlImagem || "",
        // link: prefilledValues?.link || "",
        description: prefilledValues?.descricao || "",
        status: prefilledValues?.status ? "active" : "inactive",
        startDate: prefilledValues?.dataInicial
          ? typeof prefilledValues.dataInicial === "string"
            ? prefilledValues.dataInicial
            : new Date(prefilledValues.dataInicial).toISOString()
          : "",
        endDate: prefilledValues?.dataFinal
          ? typeof prefilledValues.dataFinal === "string"
            ? prefilledValues.dataFinal
            : new Date(prefilledValues.dataFinal).toISOString()
          : "",
      },
    });

  const bannerHorizontal = watch("horizontalBanner");
  const bannerVertical = watch("verticalBanner");

  const [verticalValidationState, setVerticalValidationState] =
    useState<ValidationState>("idle");
  const [horizontalValidationState, setHorizontalValidationState] =
    useState<ValidationState>("idle");

  const debouncedValueHorizontal = useDebounce(bannerHorizontal, 500);
  const debouncedValueVertical = useDebounce(bannerVertical, 500);

  const validateImageUrl = useCallback(
    async (url: string, type: "vertical" | "horizontal") => {
      if (!url) {
        type === "vertical"
          ? setVerticalValidationState("idle")
          : setHorizontalValidationState("idle");
        return;
      }

      type === "vertical"
        ? setVerticalValidationState("loading")
        : setHorizontalValidationState("loading");

      try {
        const response = await fetch(url, { method: "HEAD" });
        const contentType = response.headers.get("content-type");
        const isValid = response.ok && contentType?.startsWith("image/");
        type === "vertical"
          ? setVerticalValidationState(isValid ? "valid" : "invalid")
          : setHorizontalValidationState(isValid ? "valid" : "invalid");
      } catch (error) {
        console.error(error);
        type === "vertical"
          ? setVerticalValidationState("invalid")
          : setHorizontalValidationState("invalid");
      }
    },
    [getValues, setValue]
  );

  useEffect(() => {
    validateImageUrl(debouncedValueHorizontal, "horizontal");
  }, [debouncedValueHorizontal, validateImageUrl]);

  useEffect(() => {
    validateImageUrl(debouncedValueVertical, "vertical");
  }, [debouncedValueVertical, validateImageUrl]);

  const handleImageUrlChange = useCallback(
    (value: string, isValid: boolean, type: "vertical" | "horizontal") => {
      if (isValid) {
        setValue(
          type === "vertical" ? "verticalBanner" : "horizontalBanner",
          value
        );
      }
    },
    [setValue]
  );

  const onSubmit = useCallback(async (data: FormData) => {
    console.log(data);
  }, []);

  useEffect(() => {
    if (prefilledValues) {
      setValue("title", prefilledValues.descricao);
      setValue("verticalBanner", prefilledValues.urlImagem);
      setValue("horizontalBanner", prefilledValues.urlImagem);
      setValue("description", prefilledValues.descricao);
      setValue("status", prefilledValues.status ? "active" : "inactive");
      setValue(
        "startDate",
        typeof prefilledValues.dataInicial === "string"
          ? prefilledValues.dataInicial
          : prefilledValues.dataInicial.toISOString()
      );
      setValue(
        "endDate",
        typeof prefilledValues.dataFinal === "string"
          ? prefilledValues.dataFinal
          : prefilledValues.dataFinal.toISOString()
      );
    } else {
      setValue("title", "");
      setValue("verticalBanner", "");
      setValue("horizontalBanner", "");
      setValue("description", "");
      setValue("status", "inactive");
      setValue("startDate", "");
      setValue("endDate", "");
    }
  }, [prefilledValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="grid w-full items-center gap-3 mb-6">
          <Label htmlFor="Title">Título</Label>
          <Input
            type="text"
            id="title"
            placeholder="Título da campanha"
            {...register("title")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 w-full">
        <Controller
          name="horizontalBanner"
          control={control}
          defaultValue={prefilledValues?.urlImagem}
          render={({ field }) => (
            <ImageUrlInput
              id={field.name}
              value={field.value}
              onChange={field.onChange}
              validationState={horizontalValidationState}
              label="Banner Horizontal"
              placeholder="https://example.com/image.jpg"
            />
          )}
        />
        <Controller
          name="verticalBanner"
          control={control}
          defaultValue={prefilledValues?.urlImagem}
          render={({ field }) => (
            <ImageUrlInput
              id={field.name}
              value={field.value}
              onChange={field.onChange}
              validationState={verticalValidationState}
              label="Banner Vertical"
              placeholder="https://example.com/image.jpg"
            />
          )}
        />
      </div>

      <div className="grid w-full items-center gap-3 mb-6">
        <Label htmlFor="link">Link da Campanha</Label>
        <Input
          type="text"
          id="link"
          placeholder="https://example.com/campanha"
          {...register("link")}
        />
      </div>

      <div className="grid w-full mb-6 gap-3">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          className="h-24 resize-none"
          placeholder="Digite a descrição da campanha"
          id="description"
          {...register("description")}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-16">
        <div className="flex flex-col gap-3">
          <Label htmlFor="status" className="px-1">
            Status
          </Label>
          <Controller
            name="status"
            defaultValue={
              prefilledValues?.status
                ? prefilledValues.status
                  ? "active"
                  : "inactive"
                : undefined
            }
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <div>
              <DatePicker
                date={field.value ? new Date(field.value) : undefined}
                onChange={field.onChange}
                name={field.name}
                defaultValue={prefilledValues?.dataInicial}
              />
            </div>
          )}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <div>
              <DatePicker
                date={field.value ? new Date(field.value) : undefined}
                onChange={field.onChange}
                name={field.name}
                defaultValue={prefilledValues?.dataFinal}
              />
            </div>
          )}
        />
      </div>

      <div className="flex gap-4 justify-end">
        <Button
          type="submit"
          className="bg-[var(--primary-400)] text-white hover:bg-[var(--primary-600)] cursor-pointer"
        >
          {prefilledValues ? "Atualizar Campanha" : "Salvar Campanha"}
        </Button>
        {prefilledValues && (
          <Button
            variant="ghost"
            type="button"
            className="text-[var(--error-400)] hover:text-[var(--error-600)] hover:bg-transparent cursor-pointer"
            onClick={() => handleSetPrefilledValues(null)}
          >
            Limpar
          </Button>
        )}
      </div>
    </form>
  );
};
