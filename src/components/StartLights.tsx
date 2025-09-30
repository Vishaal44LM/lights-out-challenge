import { cn } from "@/lib/utils";

interface StartLightsProps {
  activeLights: number;
  allOut: boolean;
}

const StartLights = ({ activeLights, allOut }: StartLightsProps) => {
  return (
    <div className="flex justify-center gap-4 md:gap-6 mb-12">
      {[1, 2, 3, 4, 5].map((light) => (
        <div
          key={light}
          className={cn(
            "w-16 h-24 md:w-20 md:h-32 rounded-2xl border-4 transition-all duration-300",
            "flex items-center justify-center",
            activeLights >= light && !allOut
              ? "bg-primary border-primary light-glow-active"
              : "bg-secondary/50 border-muted"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300",
              activeLights >= light && !allOut
                ? "bg-primary shadow-[0_0_30px_rgba(220,0,0,0.8)]"
                : "bg-muted/30"
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default StartLights;
