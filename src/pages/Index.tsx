import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import StartLights from "@/components/StartLights";
import Commentary from "@/components/Commentary";
import { BarChart3 } from "lucide-react";

type GameState = "waiting" | "countdown" | "ready" | "reacted" | "jumpStart";

const Index = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [activeLights, setActiveLights] = useState(0);
  const [allOut, setAllOut] = useState(false);
  const [lightsOutTime, setLightsOutTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [jumpStart, setJumpStart] = useState(false);

  // Load best time from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("f1BestTime");
    if (saved) {
      setBestTime(parseInt(saved));
    }
  }, []);

  const handleClick = useCallback(() => {
    if (gameState === "countdown") {
      // Jump start!
      setGameState("jumpStart");
      setJumpStart(true);
      return;
    }

    if (gameState === "ready" && lightsOutTime) {
      const clickTime = Date.now();
      const reaction = clickTime - lightsOutTime;
      setReactionTime(reaction);
      setGameState("reacted");
      setJumpStart(false);

      // Update attempts
      const newAttempts = [reaction, ...attempts].slice(0, 5);
      setAttempts(newAttempts);
      localStorage.setItem("f1Attempts", JSON.stringify(newAttempts));

      // Update best time
      if (bestTime === null || reaction < bestTime) {
        setBestTime(reaction);
        localStorage.setItem("f1BestTime", reaction.toString());
      }
    }
  }, [gameState, lightsOutTime, attempts, bestTime]);

  const startGame = () => {
    setGameState("countdown");
    setActiveLights(0);
    setAllOut(false);
    setReactionTime(null);
    setJumpStart(false);

    // Turn on lights one by one
    let lightCount = 0;
    const lightInterval = setInterval(() => {
      lightCount++;
      setActiveLights(lightCount);
      if (lightCount === 5) {
        clearInterval(lightInterval);

        // Random delay before lights out (2-5 seconds)
        const randomDelay = 2000 + Math.random() * 3000;
        setTimeout(() => {
          setAllOut(true);
          setLightsOutTime(Date.now());
          setGameState("ready");
        }, randomDelay);
      }
    }, 500);
  };

  const resetGame = () => {
    setGameState("waiting");
    setActiveLights(0);
    setAllOut(false);
    setReactionTime(null);
    setJumpStart(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
      onClick={handleClick}
    >
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/results");
          }}
          className="gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          View Results
        </Button>
      </div>

      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-xl text-muted-foreground">
            {gameState === "countdown" && "Wait for the lights..."}
            {gameState === "ready" && "⚡ LIGHTS OUT! Click now! ⚡"}
            {gameState === "reacted" && "Great reaction!"}
            {gameState === "jumpStart" && "Jump Start - Too Early!"}
          </p>
        </div>

        {/* Start Lights */}
        <StartLights activeLights={activeLights} allOut={allOut} />

        {/* Action Button */}
        {(gameState === "waiting" || gameState === "reacted" || gameState === "jumpStart") && (
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                gameState === "waiting" ? startGame() : resetGame();
              }}
              className="text-xl px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all"
            >
              {gameState === "waiting" ? "LIGHTS OUT" : "TRY AGAIN"}
            </Button>
          </div>
        )}

        {/* Commentary */}
        {(reactionTime !== null || jumpStart) && (
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Commentary time={reactionTime} jumpStart={jumpStart} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Index;
