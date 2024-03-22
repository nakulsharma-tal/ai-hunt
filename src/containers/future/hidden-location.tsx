import { useState } from "react";

import { CrosswordIntroduction } from "./crossword-introduction";

export function HiddenLocation() {
  const [revealCrossword, setRevealCrossword] = useState<boolean>(false);

  return (
    <div className="hidden mt-4">
      <p className="text-lg font-semibold">
        Great job on finding and altering the source code to expose the reality under the force field!
      </p>
      <p className="text-lg font-semibold">Welcome to the League of Liberators!</p>
      <p className="text-lg font-semibold">Now, it's time for training!!!</p>
      {!revealCrossword && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setRevealCrossword(true)}
        >
          Start training
        </button>
      )}
      {revealCrossword && <CrosswordIntroduction />}
    </div>
  );
}
