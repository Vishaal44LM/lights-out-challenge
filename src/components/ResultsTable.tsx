import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatTime } from "@/lib/formatTime";

interface ResultsTableProps {
  attempts: number[];
  bestTime: number | null;
}

const ResultsTable = ({ attempts, bestTime }: ResultsTableProps) => {
  if (attempts.length === 0) return null;

  const sortedAttempts = [...attempts].sort((a, b) => a - b);
  const best = sortedAttempts[0];
  const worst = sortedAttempts[sortedAttempts.length - 1];

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
      <h3 className="text-xl font-bold mb-4 text-foreground">Last 5 Attempts</h3>
      <div className="space-y-2">
        {attempts.map((time, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/30"
          >
            <span className="text-muted-foreground">Attempt {attempts.length - index}</span>
            <div className="flex items-center gap-2">
              <span
                className={`font-bold font-mono ${
                  time === best
                    ? "text-accent"
                    : time === worst
                    ? "text-destructive"
                    : "text-foreground"
                }`}
              >
                {formatTime(time)}
              </span>
              {time === best && <Trophy className="w-5 h-5 text-accent" />}
            </div>
          </div>
        ))}
      </div>
      {bestTime && (
        <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/30">
          <div className="flex items-center justify-between">
            <span className="text-foreground font-semibold">Personal Best</span>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              <span className="text-2xl font-bold text-accent font-mono">{formatTime(bestTime)}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResultsTable;
