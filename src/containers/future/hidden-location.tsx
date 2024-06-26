import { Box, Button, Typography } from "@mui/material";

import "./hidden-location.css";

export interface IHiddenLocationProps {
  startTraining: () => void;
}

export function HiddenLocation(props: IHiddenLocationProps) {
  const { startTraining } = props;

  return (
    <Box className="hidden" sx={{ mt: 4 }}>
      <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
        Great job on finding and altering the source code to expose the reality under the force field!
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
        Welcome to the League of Liberators!
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
        Now, it's time for training!!!
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={startTraining} sx={{ fontSize: "1rem" }}>
          Start training
        </Button>
      </Box>
    </Box>
  );
}
