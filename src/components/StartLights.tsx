import { cn } from "@/lib/utils";

interface StartLightsProps {
  activeLights: number;
  allOut: boolean;
}

const StartLights = ({ activeLights, allOut }: StartLightsProps) => {
  return (
    <div className="flex justify-center gap-3 md:gap-4 mb-12">
      {[1, 2, 3, 4, 5].map((panel) => (
        <div
          key={panel}
          className="w-20 md:w-24 bg-black/90 rounded-3xl border-4 border-gray-800 p-3 md:p-4 shadow-2xl"
        >
          <div className="flex flex-col gap-2 md:gap-3">
            {[1, 2].map((lightRow) => (
              <div
                key={lightRow}
                className={cn(
                  "w-full aspect-square rounded-full transition-all duration-300",
                  "border-2",
                  activeLights >= panel && !allOut
                    ? "bg-red-600 border-red-500 shadow-[0_0_20px_rgba(220,0,0,0.9),0_0_40px_rgba(220,0,0,0.6)]"
                    : "bg-gray-900 border-gray-800"
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StartLights;
