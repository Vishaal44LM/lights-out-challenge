import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ResultsTable from "@/components/ResultsTable";

const Results = () => {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<number[]>([]);
  const [bestTime, setBestTime] = useState<number | null>(null);

  useEffect(() => {
    const savedAttempts = localStorage.getItem("f1Attempts");
    const savedBestTime = localStorage.getItem("f1BestTime");
    
    if (savedAttempts) {
      setAttempts(JSON.parse(savedAttempts));
    }
    if (savedBestTime) {
      setBestTime(parseInt(savedBestTime));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Test
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <ResultsTable attempts={attempts} bestTime={bestTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
