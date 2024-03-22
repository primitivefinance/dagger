import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dispatch, SetStateAction } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

type CardToggleGroupProps = {
  options: CardToggleOption[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export type CardToggleOption = {
  value: string;
  title: string;
  description: string;
};

function CardToggleGroup({ options, value, setValue }: CardToggleGroupProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => {
        if (v) setValue(v);
      }}
      className="w-full grid grid-cols-3 gap-4"
    >
      {options.map((opt) => (
        <ToggleGroupItem asChild value={opt.value}>
          <Card className="flex flex-col gap-4 items-start cursor-pointer">
            <CardHeader className="w-full">
              <div className="flex items-center justify-between">
                <CardTitle>{opt.title}</CardTitle>
                {value === opt.value ? (
                  <CheckCircledIcon className="w-4 h-4" />
                ) : null}
              </div>
              <CardDescription>{opt.description}</CardDescription>
            </CardHeader>
          </Card>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export default CardToggleGroup;
