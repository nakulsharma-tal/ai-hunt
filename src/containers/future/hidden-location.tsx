import { Box, Button, Typography } from "@mui/material";

export interface IHiddenLocationProps {
  startTraining: () => void;
}

export function HiddenLocation(props: IHiddenLocationProps) {
  const { startTraining } = props;

  return (
    <Box className="hidden" sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Great job on finding and altering the source code to expose the reality under the force field!
      </Typography>

      <Typography variant="h6" gutterBottom>
        Welcome to the League of Liberators!
      </Typography>

      <Typography variant="h6" gutterBottom>
        Now, it's time for training!!!
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={startTraining}>Start training</Button>
      </Box>
    </Box>
  );
}
