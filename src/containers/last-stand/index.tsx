import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { AppRoutes } from "../../app-routes";
import riseOfTheSaviour from "../../assets/rise-of-the-saviour.jpg";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { ApiError, CompetitionRound } from "../../types";
import { RESPONSE_CAPTURE_SUCCESSFULLY } from "../../user-message.constant";

export function LastStand() {
  const [solutionUrl, setSolution] = useState("");
  const [teamId, setTeamId] = useState("");

  const navigate = useNavigate({ from: AppRoutes.HOME });
  const { mutateAsync } = useVerifySubmissionQuery(CompetitionRound.Third);

  const handleSubmit = useCallback(async () => {
    const data = await mutateAsync({
      round: CompetitionRound.Third,
      teamId,
      solutionUrl,
    });

    if (data?.statusCode === HttpStatusCode.Ok) {
      toast.success(RESPONSE_CAPTURE_SUCCESSFULLY);
    } else if ((data as ApiError).error) {
      toast.error((data as ApiError).error);
    } else {
      toast.error(data.message);
    }

    navigate({
      to: AppRoutes.CONGRATULATIONS,
    });
  }, [navigate, mutateAsync, solutionUrl, teamId]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        p: 0,
        m: 0,
        backgroundImage: `url(${riseOfTheSaviour})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: "80vw",
          maxHeight: "90vh",
          overflowY: "auto",
          m: "auto",
          backgroundColor: "rgba(240, 255, 255, 0.9)",
          borderRadius: 4,
          p: 2,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h2" gutterBottom>
              The Last Stand
            </Typography>
          </Box>

          <Typography variant="body1" gutterBottom>
            Last Stand! You have identified that AI is using worker thread model of distributed computing to distribute the
            responsibilities and avoid the single point of failure. You got to know that there are overall 5 worker nodes which
            are located at 5 key cities of United States, and there is a secret main node, the location of which is not known to
            anyone. However, main node needs to communicate with all the worker nodes from time to time, if you can somehow inject
            malware into all the worker nodes, you will be able to interpolate the location of main node. Once you receive the
            location of main node, it’s all done and dusted, you can kill it!
          </Typography>

          <Typography variant="body1" gutterBottom>
            By using JavaScript Proxy mechanism, you have created a Proxy malware, the code, which will just look and function
            exactly like intended from outside, but it is internally running your special code, which is helpful in interpolating
            the main node’s location. However, there is only one catch, in a typical JavaScript developer style, you wrote code
            which only works on your machine! And you have no idea which of the million node modules you are using is helping this
            code work on your machine and not on others. So, you have no option but to go to every worker location, and inject the
            malware by yourself!
          </Typography>

          <Typography variant="body1" gutterBottom>
            Liberators prepared a Dweller vehicle which they use to travel. After AI took over, most of the travel on road ways
            are abandoned, and only Pod travel in air is considered legal. However, Dwellers which are created by Liberators,
            travel underground, almost goes undetected by any of the drones and AI cults on top of surface. Dwellers’ routes
            closely follow the routes of the old US road ways of 2024. Liberators gave you the route maps.
          </Typography>

          <Typography variant="body1" gutterBottom>
            You need to create an algorithm which will help you reach all these 5 cities in the most optimal route while not
            emptying your dweller fuel tank, while avoiding the detection from AI cults and drones. You can refuel at the dweller
            fuel stations and get booster chargers from special booster stations which will allow you to travel you at 2x speed.
            (Fuel stations, Booster Stations, Cult houses and Drone locations are marked on the MAP) Tell us the order in which
            cities were visited and time taken for the visit
          </Typography>

          <Typography variant="body1" gutterBottom>
            Get your document data from here.
          </Typography>

          <TextField
            label="Team Id"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            variant="outlined"
            sx={{ mt: 2 }}
            fullWidth
          />

          <TextField
            label="Enter your answers here."
            value={solutionUrl}
            onChange={(e) => setSolution(e.target.value)}
            variant="outlined"
            sx={{ mt: 2 }}
            fullWidth
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleSubmit} sx={{ mt: 2 }}>
              Submit Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
