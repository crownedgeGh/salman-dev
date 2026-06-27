import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ label, value, change, icon: Icon, color = "amber" }) {
  const isPositive = change >= 0;

  const colorMap = {
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };

  return (
    <Card className="overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 truncate">
              {label}
            </p>
            <p className="text-2xl font-bold text-foreground truncate">{value}</p>
          </div>
          {Icon && (
            <div className={`p-2.5 rounded-xl shrink-0 ${colorMap[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-green-500 shrink-0" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-red-500 shrink-0" />
          )}
          <span
            className={`text-xs font-semibold ${
              isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
