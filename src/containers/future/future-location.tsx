import { Box, Card, CardContent, Typography } from "@mui/material";
import { useCallback, useState } from "react";

import crackTheProphecy from "../../assets/crack-the-prophecy.png";
import { CrosswordIntroduction } from "./crossword-introduction";
import { HiddenLocation } from "./hidden-location";

export function FutureLocation() {
  const [revealCrossword, setRevealCrossword] = useState<boolean>(false);

  const startTraining = useCallback(() => {
    setRevealCrossword(true);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        p: 0,
        m: 0,
        backgroundImage: `url(${crackTheProphecy})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Card
        sx={{
          maxWidth: "50vw",
          maxHeight: "90vh",
          overflowY: "auto",
          m: "auto",
          backgroundColor: "rgba(197, 203, 203, 0.9)",
          borderRadius: 4,
          p: 2,
        }}
      >
        <CardContent>
          {!revealCrossword && (
            <>
              <Box>
                <Typography variant="h6">
                  Great! You have arrived at the correct location. You are one step closer to proving yourself as the messiah.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  You are not seeing anything else here because liberators want to hide themselves from the AI cults. So they
                  concealed their presence with a force field around themselves. They exist right here, but they are not visible
                  to the eye. You need to alter the force field's source code and make them visible.
                </Typography>
              </Box>

              <HiddenLocation startTraining={startTraining} />
            </>
          )}

          {revealCrossword && <CrosswordIntroduction />}
        </CardContent>
      </Card>
    </Box>
  );
}
