import { Suspense } from "react";
import { CirclePlayIcon, Sparkles, WaypointsIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import PeriodSelector from "./_components/PeriodSelector";
import StatsCard from "./_components/StatsCard";
import ExecutionStatusChart from "./_components/ExecutionStatusChart";

import { getPeriods } from "@/actions/analytics/getPeriods";
import { getStatsCardsValues } from "@/actions/analytics/getStatsCardsValues";
import { getWorkflowExecutionStats } from "@/actions/analytics/getWorkflowExecutionStats";

import { Period } from "@/types/analytics";

export default function HomePage({
  searchParams,
}: {
  searchParams: { month?: string; year?: string };
}) {
  const currentDate = new Date();
  const { month, year } = searchParams;

  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">首页</h1>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <div className="h-full py-6 flex flex-col gap-4">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <StatsExecutionStatus selectedPeriod={period} />
        </Suspense>
      </div>
    </div>
  );
}

async function PeriodSelectorWrapper({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const periods = await getPeriods();

  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await getStatsCardsValues(selectedPeriod);

  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]">
      <StatsCard
        title="工作流总数"
        value={data.workflowExecutions}
        icon={CirclePlayIcon}
      />
      <StatsCard
        title="工作流执行次数"
        value={data.phaseExecutions}
        icon={WaypointsIcon}
      />
      <StatsCard
        title="工作流执行成功数"
        value={data.successExecutions}
        icon={Sparkles}
      />
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="w-full min-h-[120px]" />
      ))}
    </div>
  );
}

async function StatsExecutionStatus({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const data = await getWorkflowExecutionStats(selectedPeriod);

  return <ExecutionStatusChart data={data} />;
}
