import { Box, Button, Card, CardContent, CardHeader, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { AppRoutes } from "../../app-routes";
import crackTheProphecy from "../../assets/crack-the-prophecy.png";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { CompetitionRound } from "../../types";

const ROUND_ZERO_PDF_LINK = "https://talentica-js-saviour-hunt-public-files.s3.ap-south-1.amazonaws.com/Round-0.pdf";
const ROUND_ZERO_PASSKEY_LENGTH = 6;

export function Welcome() {
  const [passkey, setPasskey] = useState("");

  const navigate = useNavigate({ from: AppRoutes.WELCOME });
  const { mutateAsync } = useVerifySubmissionQuery(CompetitionRound.Zero);

  const handleSubmit = useCallback(async () => {
    await mutateAsync({ passkey, round: CompetitionRound.Zero });
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
          <Typography variant="h5">
            Enter the key from{" "}
            <Link href={ROUND_ZERO_PDF_LINK} underline="always" target="_blank" rel="noreferrer">
              Cracked Prophesy
            </Link>{" "}
            to accept the mission
          </Typography>

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
            inputProps={{
              maxLength: ROUND_ZERO_PASSKEY_LENGTH,
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleSubmit} sx={{ mt: 1, fontSize: "1rem" }} disabled={passkey.length !== ROUND_ZERO_PASSKEY_LENGTH}>
              Submit Key
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
