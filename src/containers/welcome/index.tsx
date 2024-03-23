import { Box, Button, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { AppRoutes } from "../../app-routes";
import crackTheProphecy from "../../assets/crack-the-prophecy.png";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { ApiError, CompetitionRound } from "../../types";
import { CORRECT_PASSKEY } from "../../user-message.constant";

export function Welcome() {
  const [passkey, setPasskey] = useState("");

  const navigate = useNavigate({ from: AppRoutes.WELCOME });
  const { mutateAsync } = useVerifySubmissionQuery(CompetitionRound.Zero);

  const handleSubmit = useCallback(async () => {
    const data = await mutateAsync({ passkey, round: CompetitionRound.Zero });
    if (data?.statusCode === HttpStatusCode.Ok) {
      toast.success(CORRECT_PASSKEY);
    } else if ((data as ApiError).error) {
      toast.error((data as ApiError).error);
    } else {
      toast.error(data.message);
    }

    navigate({
      to: AppRoutes.TIME_MACHINE,
    });
  }, [mutateAsync, navigate, passkey]);

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
          mixBlendMode: "lighten",
          backgroundColor: "rgba(196, 213, 213, 0.9)",
          borderRadius: 4,
          p: 2,
        }}
      >
        <CardHeader
          title="Liberators welcome you!!!"
          titleTypographyProps={{
            variant: "h3",
            align: "center",
          }}
        />

        <CardContent>
          <Typography variant="h5">Enter the key from Cracked Prophesy to accept the mission</Typography>

          <TextField
            id="round-0-passkey"
            label="Passkey"
            variant="outlined"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            fullWidth
            sx={{
              my: 2,
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleSubmit}>Submit Key</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
