import { Box, Button, Typography } from "@mui/material";
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
    <Box>
      <Typography variant="body1" gutterBottom>
        This training is a crossword puzzle designed over 40 years ago by the original Liberators (who are no longer alive) who
        knew JavaScript and know how AI is originally designed, so, one or two tricks in the puzzle could come in handy in the
        future!
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 700 }} gutterBottom>
        Oh no! But wait!
      </Typography>
      <Typography variant="body1" gutterBottom>
        You exposed the hidden location by exposing the source code but forgot to close it after entering the location! Now, even
        the AI cults can see the location! Looks like the cults came in and messed with the crossword puzzle before LOL fought
        them away!
      </Typography>
      <Typography variant="body1" gutterBottom>
        These cults were started by once product managers, so, they possess special confusing powers! Looks like they have added
        some extra statements to the crossword puzzle to confuse you!
      </Typography>
      <Typography variant="body1" gutterBottom>
        None or more statements of each clue could be wrong and misleading. But the majority of the statements should be pointing
        to the correct answer. Fight through this confusing darkness and be the lightning that you are!
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={navigateToCrossWord}>Start Puzzle</Button>
      </Box>
    </Box>
  );
}
