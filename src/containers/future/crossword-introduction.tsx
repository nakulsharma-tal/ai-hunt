import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { AppRoutes } from "../../app-routes";

export function CrosswordIntroduction() {
  const navigate = useNavigate({ from: AppRoutes.LOCATION });

  const navigateToCrossWord = useCallback(() => {
    navigate({
      to: AppRoutes.CROSSWORD,
    });
  }, [navigate]);

  return (
    <div>
      <div>
        <p className="m-4">
          This training is a crossword puzzle designed over 40 years ago by the original Liberators (who are no longer alive) who
          knew JavaScript and know how AI is originally designed, so, one or two tricks in the puzzle could come in handy in the
          future!
        </p>
        <p className="font-bold">Oh no! But wait!</p>
        <p className="m-4">
          You exposed the hidden location by exposing the source code but forgot to close it after entering the location! Now,
          even the AI cults can see the location! Looks like the cults came in and messed with the crossword puzzle before LOL
          fought them away!
        </p>
        <p>
          These cults were started by once product managers, so, they possess special confusing powers! Looks like they have added
          some extra statements to the crossword puzzle to confuse you!
        </p>
        <p>
          None or more statements of each clue could be wrong and misleading. But the majority of the statements should be
          pointing to the correct answer. Fight through this confusing darkness and be the lightning that you are!
        </p>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={navigateToCrossWord}>
          Start Puzzle
        </button>
      </div>
    </div>
  );
}
