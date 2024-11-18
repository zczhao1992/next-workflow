"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Period } from "@/types/analytics";

const MONTH_NAMES = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

export default function PeriodSelector({
  selectedPeriod,
  periods,
}: {
  selectedPeriod: Period;
  periods: Period[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      value={`${selectedPeriod.month}-${selectedPeriod.year}`}
      onValueChange={(value) => {
        const [month, year] = value.split("-");
        const params = new URLSearchParams(searchParams);

        params.set("month", month);
        params.set("year", year);

        router.push(`?${params.toString()}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {periods.map((period, index) => {
          return (
            <SelectItem
              key={index}
              value={`${period.month}-${period.year}`}
            >{`${MONTH_NAMES[period.month]} ${period.year}`}</SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
