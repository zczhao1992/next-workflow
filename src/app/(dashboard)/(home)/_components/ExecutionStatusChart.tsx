"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Layers2Icon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { getWorkflowExecutionStats } from "@/actions/analytics/getWorkflowExecutionStats";

type ChartData = Awaited<ReturnType<typeof getWorkflowExecutionStats>>;

const chartConfig = {
  success: {
    label: "成功",
    color: "hsl(var(--chart-2))",
  },
  failed: {
    label: "失败",
    color: "hsl(var(--chart-1))",
  },
};

export default function ExecutionStatusChart({ data }: { data: ChartData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Layers2Icon className="w-6 h-6 text-primary" />
          工作流执行状态
        </CardTitle>
        <CardDescription>每日成功和失败的工作流程执行次数</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <AreaChart
            data={data}
            height={200}
            accessibilityLayer
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("zh-cn", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[250px]" />}
            />
            <Area
              min={0}
              type="bump"
              fillOpacity={0.6}
              fill="var(--color-success)"
              stroke="var(--color-success)"
              dataKey="success"
              stackId="a"
            />
            <Area
              min={0}
              type="bump"
              fillOpacity={0.6}
              fill="var(--color-failed)"
              stroke="var(--color-failed)"
              dataKey="failed"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
