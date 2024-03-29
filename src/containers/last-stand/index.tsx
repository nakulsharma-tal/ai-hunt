import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { AppRoutes } from "../../app-routes";
import riseOfTheSaviour from "../../assets/rise-of-the-saviour.jpg";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { CompetitionRound } from "../../types";

const ROUND_THREE_ZIP_URL = "https://talentica-js-saviour-hunt-public-files.s3.ap-south-1.amazonaws.com/Round-3.zip";
const CORE_TEAM_MEMBERS: Array<{
  name: string;
  github: string;
}> = [
  {
    name: "Mayank Kansal",
    github: "mayank-kansal15",
  },
  {
    name: "Nakul Sharma",
    github: "nakulsharma-tal",
  },
  {
    name: "Govind Vijay",
    github: "govind-vijay-tal",
  },
  {
    name: "Sanny Kumar",
    github: "sunnykumar43",
  },
];

export function LastStand() {
  const [solutionUrl, setSolution] = useState("");
  const [teamId, setTeamId] = useState("");

  const navigate = useNavigate({ from: AppRoutes.HOME });
  const { mutateAsync } = useVerifySubmissionQuery(CompetitionRound.Third);

  const handleSubmit = useCallback(async () => {
    await mutateAsync({
      round: CompetitionRound.Third,
      teamId,
      solutionUrl,
    });
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
          backgroundColor: "rgba(197, 203, 203, 0.9)",
          borderRadius: 4,
          p: 2,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" gutterBottom>
              The Last Stand
            </Typography>
          </Box>

          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            Last Stand! You have identified that AI is using worker thread model of distributed computing to distribute the
            responsibilities and avoid the single point of failure. You got to know that there are overall 5 worker nodes which
            are located at 5 key cities of United States, and there is a secret main node, the location of which is not known to
            anyone. However, main node needs to communicate with all the worker nodes from time to time, if you can somehow inject
            malware into all the worker nodes, you will be able to interpolate the location of main node. Once you receive the
            location of main node, it's all done and dusted, you can kill it!
          </Typography>

          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            By using JavaScript Proxy mechanism, you have created a Proxy malware, the code, which will just look and function
            exactly like intended from outside, but it is internally running your special code, which is helpful in interpolating
            the main node's location. However, there is only one catch, in a typical JavaScript developer style, you wrote code
            which only works on your machine! And you have no idea which of the million node modules you are using is helping this
            code work on your machine and not on others. So, you have no option but to go to every worker location, and inject the
            malware by yourself!
          </Typography>

          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            Liberators prepared a Dweller vehicle which they use to travel. After AI took over, most of the travel on road ways
            are abandoned, and only Pod travel in air is considered legal. However, Dwellers which are created by Liberators,
            travel underground, almost goes undetected by any of the drones and AI cults on top of surface. Dwellers' routes
            closely follow the routes of the old US road ways of 2024. Liberators gave you the route maps.
          </Typography>

          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            You need to create an algorithm which will help you reach all these 5 cities in the most optimal route while not
            emptying your dweller fuel tank, while avoiding the detection from AI cults and drones. You can refuel at the dweller
            fuel stations and get booster chargers from special booster stations which will allow you to travel you at 2x speed.
            (Fuel stations, Booster Stations, Cult houses and Drone locations are marked on the map). Tell us the order in which
            cities were visited and time taken for the visit.
          </Typography>

          <Typography variant="body1" gutterBottom sx={{ mt: 2, mb: 2, fontSize: "1.1rem" }}>
            Get other details and the map data from{" "}
            <Link href={ROUND_THREE_ZIP_URL} underline="always" target="_blank" rel="noreferrer">
              here
            </Link>
            .
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 700, fontSize: "1.1rem" }} gutterBottom>
              GuideLines:
            </Typography>

            <List>
              <ListItem disableGutters disablePadding>
                <ListItemIcon>
                  <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
                    Liberators will need to verify your code. To facilitate this, set up a{" "}
                    <i>
                      <b>private</b>
                    </i>{" "}
                    GitHub repository and upload your code there. Ensure that your code is written in either JavaScript or
                    TypeScript.
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem disableGutters disablePadding>
                <ListItemIcon>
                  <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
                    In the <code>README</code> file, describe what your code accomplishes using simple language.
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>

            <ListItem disableGutters disablePadding>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
                  Include a file named <code>ROUND_3_ANSWER.txt</code> with your solution in the same repo. This file should
                  contain the output of your code formatted as described in the provided PDF document.
                </Typography>
              </ListItemText>
            </ListItem>

            <ListItem disableGutters disablePadding>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
                  Grant access to your private GitHub repository to the following individuals:{" "}
                  <b>
                    {CORE_TEAM_MEMBERS.map((m) => {
                      return `${m.name} (${m.github})`;
                    }).join(", ")}
                  </b>
                  .
                </Typography>
              </ListItemText>
            </ListItem>

            <ListItem disableGutters disablePadding>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
                  Once you have completed these steps, submit the link to your GitHub repository.
                </Typography>
              </ListItemText>
            </ListItem>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
              Submit your team ID and the link to the GitHub repository URL to complete the mission -
            </Typography>

            <TextField
              id="team-id"
              label="Team ID"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              variant="outlined"
              sx={{ mt: 2 }}
              fullWidth
            />

            <TextField
              id="solution-url"
              label="Public GitHub repository link"
              value={solutionUrl}
              onChange={(e) => setSolution(e.target.value)}
              variant="outlined"
              sx={{ mt: 2, mb: 1 }}
              fullWidth
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleSubmit} sx={{ fontSize: "1rem" }} disabled={teamId.length === 0 || solutionUrl.length === 0}>
                Submit Password
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
