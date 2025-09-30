import { AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CommentaryProps {
  time: number | null;
  jumpStart: boolean;
}

const getCommentary = (time: number) => {
  if (time < 200) {
    return {
      text: "Lightning fast! Perfect getaway!",
      icon: CheckCircle,
      color: "text-success",
    };
  } else if (time <= 300) {
    return {
      text: "Good reaction, strong start!",
      icon: TrendingUp,
      color: "text-accent",
    };
  } else {
    return {
      text: "Slow off the line, work on it!",
      icon: AlertCircle,
      color: "text-destructive",
    };
  }
};

const Commentary = ({ time, jumpStart }: CommentaryProps) => {
  if (jumpStart) {
    return (
      <Card className="p-6 bg-warning/10 border-warning/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-warning" />
          <div>
            <h3 className="text-xl font-bold text-warning">Jump Start!</h3>
            <p className="text-warning-foreground">Too Early ⚠️</p>
          </div>
        </div>
      </Card>
    );
  }

  if (time === null) return null;

  const commentary = getCommentary(time);
  const Icon = commentary.icon;

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-8 h-8 ${commentary.color}`} />
        <div>
          <h3 className="text-2xl font-bold text-foreground">{time} ms</h3>
          <p className={`${commentary.color} font-semibold`}>{commentary.text}</p>
        </div>
      </div>
    </Card>
  );
};

export default Commentary;
