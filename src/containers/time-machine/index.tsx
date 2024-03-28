import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

import { AppRoutes } from "../../app-routes";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { CompetitionRound } from "../../types";

const ROUND_ONE_PASSKEY_LENGTH = 2;

export function TimeMachine() {
  const [teamId, setTeamId] = React.useState("");
  const [passkey, setPasskey] = React.useState("");

  const navigate = useNavigate({ from: AppRoutes.TIME_MACHINE });
  const { mutateAsync } = useVerifySubmissionQuery(CompetitionRound.First);

  const handleSubmit = React.useCallback(async () => {
    await mutateAsync({ teamId, passkey, round: CompetitionRound.First });
    navigate({
      to: AppRoutes.LOCATION,
    });
  }, [mutateAsync, navigate, passkey, teamId]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
        Your Destination is set to year <b>2100</b>. Enter your passkey for the destination.
      </Typography>

      <TextField
        id="team-id"
        label="Team ID"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        variant="outlined"
        sx={{ mt: 4 }}
        fullWidth
      />

      <TextField
        id="round-1-passkey"
        label="Passkey"
        variant="outlined"
        value={passkey}
        onChange={(e) => setPasskey(e.target.value)}
        fullWidth
        sx={{ mt: 1, mb: 4 }}
        inputProps={{
          maxLength: ROUND_ONE_PASSKEY_LENGTH,
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleSubmit}
          sx={{ fontSize: "1rem" }}
          disabled={teamId.length === 0 || passkey.length !== ROUND_ONE_PASSKEY_LENGTH}
        >
          Submit Password
        </Button>
      </Box>
    </Box>
  );
}
