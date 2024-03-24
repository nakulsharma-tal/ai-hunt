import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

import { AppRoutes } from "../../app-routes";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { CompetitionRound } from "../../types";

export function TimeMachine() {
  const [passkey, setPasskey] = React.useState("");

  const navigate = useNavigate({ from: AppRoutes.TIME_MACHINE });
  const { mutateAsync } = useVerifySubmissionQuery(CompetitionRound.First);

  const handleSubmit = React.useCallback(async () => {
    await mutateAsync({ passkey, round: CompetitionRound.First });
    navigate({
      to: AppRoutes.LOCATION,
    });
  }, [mutateAsync, navigate, passkey]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body1" gutterBottom>
        Your Destination is set to year <b>2100</b>. Enter your password for the destination.
      </Typography>

      <TextField
        id="round-1-passkey"
        label="Passkey"
        variant="outlined"
        value={passkey}
        onChange={(e) => setPasskey(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleSubmit} sx={{ mt: 1 }}>
          Submit Password
        </Button>
      </Box>
    </Box>
  );
}
