import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { AppRoutes } from "../../app-routes";
import crackTheProphecy from "../../assets/crack-the-prophecy.png";

export function Congratulations() {
  const navigate = useNavigate({ from: AppRoutes.CONGRATULATIONS });

  const goBack = useCallback(async () => {
    navigate({
      to: AppRoutes.LAST_STAND,
    });
  }, [navigate]);

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
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: "50vw",
          maxHeight: "90vh",
          overflowY: "auto",
          m: "auto",
          backgroundColor: "rgba(196, 213, 213, 0.6)",
          borderRadius: 4,
          p: 2,
        }}
      >
        <CardHeader
          title="Congratulations!"
          titleTypographyProps={{
            variant: "h2",
            align: "center",
          }}
        />

        <CardContent>
          <Typography variant="h4" gutterBottom>
            You have successfully traveled across the country to kill the AI!
          </Typography>
          <Typography variant="h6" gutterBottom>
            You have completed the mission. Hope you have saved humanity!
          </Typography>

          <Typography variant="h6" gutterBottom>
            Liberators will make sure that you will be rewarded well in the future if you are quick enough to stop the AI.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={goBack}>Submit a different answer</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
