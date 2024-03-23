import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { HttpStatusCode } from "axios";
import React from "react";
import { toast } from "react-toastify";

import { AppRoutes } from "../../app-routes";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { ApiError, CompetitionRound } from "../../types";
import { CORRECT_PASSKEY } from "../../user-message.constant";

export function TimeMachine() {
  const [passkey, setPasskey] = React.useState("");

  const navigate = useNavigate({ from: AppRoutes.TIME_MACHINE });
  const { mutateAsync } = useVerifySubmissionQuery(CompetitionRound.First);

  const handleSubmit = React.useCallback(async () => {
    const data = await mutateAsync({ passkey, round: CompetitionRound.First });
    if (data?.statusCode === HttpStatusCode.Ok) {
      toast.success(CORRECT_PASSKEY);
    } else if ((data as ApiError).error) {
      toast.error((data as ApiError).error);
    } else {
      toast.error(data.message);
    }

    navigate({
      to: AppRoutes.LOCATION,
    });
  }, [mutateAsync, navigate, passkey]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Time Machine!
      </Typography>

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
