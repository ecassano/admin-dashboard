import { memo, useState, useEffect } from "react";
import { UseFormSetValue, FieldValues, Path, PathValue } from "react-hook-form";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { LABELS } from "@/utils/constants";

type DatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  date?: Date;
  onChange: (date: Date) => void;
  defaultValue?: Date;
};

function DatePickerInner<T extends FieldValues>({
  name,
  date,
  onChange,
  defaultValue,
}: DatePickerProps<T>) {
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (defaultValue) {
  //     setDate(defaultValue);
  //     setValue(name, defaultValue.toISOString() as PathValue<T, typeof name>);
  //   }
  // }, [defaultValue, name, setValue]);

  return (
    <div className="flex flex-col gap-3">
      <Label className="px-1">{LABELS[name as keyof typeof LABELS]}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Selecione a data"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              if (selectedDate) {
                onChange(selectedDate);
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const DatePicker = memo(DatePickerInner) as typeof DatePickerInner;
