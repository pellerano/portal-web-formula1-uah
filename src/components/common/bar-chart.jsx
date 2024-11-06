'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A bar chart';

const chartData = [
  { name: 'January', votes: 186 },
  { name: 'February', votes: 305 },
  { name: 'March', votes: 237 },
  { name: 'April', votes: 73 },
  { name: 'May', votes: 209 },
  { name: 'June', votes: 214 },
];

const chartConfig = {
  votes: {
    label: 'Votos',
    color: 'hsl(var(--chart-1))',
  },
};

export function Chart({
  title,
  description,
  chartData,
  chartConfig,
  axisDataKey,
  barDataKey,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={axisDataKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey={barDataKey}
              fill={`var(--color-${barDataKey})`}
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
