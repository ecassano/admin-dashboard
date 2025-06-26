"use client";
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
import { FormData } from "./page";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Campaign } from "@/utils/types";
import { schema } from "@/schemas/campaign_form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarCampanha } from "@/api/criarCampanha";
import { toast } from "sonner";
import { parseDateAsLocal } from "@/utils/parseDate";
import { atualizarCampanha } from "@/api/atualizarCampanha";

export type ValidationState = "idle" | "loading" | "valid" | "invalid";

type CampaignFormProps = {
  prefilledValues: Campaign | null;
  handleSetPrefilledValues: (campaign: Campaign) => void;
};

export const CampaignForm = ({
  prefilledValues,
  handleSetPrefilledValues,
}: CampaignFormProps) => {
  const { handleSubmit, register, setValue, control, watch, formState: { errors }, reset } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        id: prefilledValues?.id || undefined,
        title: prefilledValues?.nomeCampanha || "",
        description: prefilledValues?.descricao || "",
        horizontalBanner: prefilledValues?.urlImagem || "",
        verticalBanner: prefilledValues?.urlImagem || "",
        link: prefilledValues?.urlLink || null,
        status: prefilledValues?.status ? prefilledValues.status ? "active" : "inactive" : "active",
        startDate: prefilledValues?.dataInicial ? new Date(prefilledValues.dataInicial) : undefined,
        endDate: prefilledValues?.dataFinal ? new Date(prefilledValues.dataFinal) : undefined,
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

  const queryClient = useQueryClient();

  const createCampaignMutation = useMutation({
    mutationFn: criarCampanha,
    onSuccess: () => {
      toast.success("Campanha criada com sucesso!", {
        style: {
          background: "var(--secondary-400)",
          color: "var(--white)",
          border: "none",
        }
      });
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
    onError: (err) => {
      console.error("Erro ao criar campanha", err);
      toast.error("Erro ao criar campanha", {
        style: {
          background: "var(--error-400)",
          color: "var(--white)",
          border: "none",
        }
      });
    },
  });

  const updateCampaignMutation = useMutation({
    mutationFn: atualizarCampanha,
    onSuccess: () => {
      toast.success("Campanha atualizada com sucesso!", {
        style: {
          background: "var(--secondary-400)",
          color: "var(--white)",
          border: "none",
        }
      });
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
    onError: (err) => {
      console.error("Erro ao atualizar campanha", err);
      toast.error("Erro ao atualizar campanha", {
        style: {
          background: "var(--error-400)",
          color: "var(--white)",
          border: "none",
        }
      });
    },
  });

  const validateImageUrl = useCallback(
    async (url: string, type: "vertical" | "horizontal") => {
      if (!url) {
        if (type === "vertical") {
          setVerticalValidationState("idle");
        } else {
          setHorizontalValidationState("idle");
        }
        return;
      }

      if (type === "vertical") {
        setVerticalValidationState("loading");
      } else {
        setHorizontalValidationState("loading");
      }

      try {
        const response = await fetch(url, { method: "HEAD" });
        const contentType = response.headers.get("content-type");
        const isValid = response.ok && contentType?.startsWith("image/");
        if (type === "vertical") {
          setVerticalValidationState(isValid ? "valid" : "invalid");
        } else {
          setHorizontalValidationState(isValid ? "valid" : "invalid");
        }
      } catch (error) {
        console.error(error);
        if (type === "vertical") {
          setVerticalValidationState("invalid");
        } else {
          setHorizontalValidationState("invalid");
        }
      }
    },
    []
  );

  useEffect(() => {
    validateImageUrl(debouncedValueHorizontal, "horizontal");
  }, [debouncedValueHorizontal, validateImageUrl]);

  useEffect(() => {
    validateImageUrl(debouncedValueVertical, "vertical");
  }, [debouncedValueVertical, validateImageUrl]);

  const onSubmit = useCallback(async (data: FormData) => {
    const formattedData = {
      nomeCampanha: data.title,
      descricao: data.description,
      urlImagem: data.horizontalBanner,
      urlLink: data.link,
      dataInicial: format(data.startDate, "yyyy-MM-dd"),
      dataFinal: format(data.endDate, "yyyy-MM-dd"),
      status: data.status === "active" ? true : false,
      cpfProprietario: "16232350731",
    }

    try {
      if (prefilledValues) {
        if (!data.id) {
          throw new Error("ID da campanha é obrigatório");
        }
        await updateCampaignMutation.mutateAsync({ id: data.id, ...formattedData });
      } else {
        await createCampaignMutation.mutateAsync(formattedData);
      }

      handleSetPrefilledValues(null);
      reset();
    } catch (error) {
      console.error("Erro ao criar campanha", error);
    }
  }, [createCampaignMutation, updateCampaignMutation, handleSetPrefilledValues, reset, prefilledValues]);

  useEffect(() => {
    if (prefilledValues) {
      setValue("id", prefilledValues.id);
      setValue("title", prefilledValues.nomeCampanha);
      setValue("verticalBanner", prefilledValues.urlImagem);
      setValue("horizontalBanner", prefilledValues.urlImagem);
      setValue("link", prefilledValues.urlLink);
      setValue("description", prefilledValues.descricao);
      setValue("status", prefilledValues.status ? "active" : "inactive");
      setValue(
        "startDate",
        prefilledValues.dataInicial ? parseDateAsLocal(prefilledValues.dataInicial) : new Date()
      );
      setValue(
        "endDate",
        prefilledValues.dataFinal ? parseDateAsLocal(prefilledValues.dataFinal) : new Date()
      );
    } else {
      setValue("title", "");
      setValue("verticalBanner", "");
      setValue("horizontalBanner", "");
      setValue("link", null);
      setValue("description", "");
      setValue("status", "active");
      setValue("startDate", new Date());
      setValue("endDate", new Date());
    }
  }, [prefilledValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="grid w-full items-center gap-3 mb-6">
          <Label htmlFor="nomeCampanha">Título</Label>
          <Input
            type="text"
            id="nomeCampanha"
            placeholder="Título da campanha"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-[var(--error-400)]">{errors.title.message}</p>
          )}
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
        {errors.description && (
          <p className="text-sm text-[var(--error-400)]">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-16">
        <div className="flex flex-col gap-3">
          <Label htmlFor="status" className="px-1">
            Status
          </Label>
          <Controller
            name="status"
            defaultValue={prefilledValues?.status ? prefilledValues.status ? "active" : "inactive" : "active"}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
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
                defaultValue={prefilledValues?.dataInicial
                  ? parseDateAsLocal(prefilledValues.dataInicial)
                  : undefined}
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
                defaultValue={prefilledValues?.dataFinal ? new Date(prefilledValues.dataFinal) : undefined}
              />
              {errors.endDate && (
                <p className="text-sm text-[var(--error-400)]">{errors.endDate.message}</p>
              )}
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
            Nova Campanha
          </Button>
        )}
      </div>
    </form>
  );
};
