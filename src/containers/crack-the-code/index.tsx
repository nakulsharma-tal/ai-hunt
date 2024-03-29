import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";

import crackTheProphecy from "../../assets/crack-the-prophecy.png";
import { TimeMachine } from "../time-machine";
import { QUESTION_MORSE_CODE, SAMPLE_MORSE_CODE } from "./morse-code.constant";

export function CrackTheCode() {
  const [showTimeMachine, setShowTimeMachine] = useState(false);

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
          maxWidth: "80vw",
          maxHeight: "90vh",
          overflowY: "auto",
          m: "auto",
          backgroundColor: "rgba(196, 213, 213, 0.9)",
          borderRadius: 4,
          p: 2,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" gutterBottom>
              Welcome to Time Machine!
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
              You are a brave one! For accepting the mission! And a smart one too for cracking the Prophesy. You have reached the
              location where the time machine is!
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
              Time Machine is already set to correct destination, but you will need a keyword to enter the future.
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
              Liberators wanted to test your puzzle solving knowledge before allowing you into the future, to make sure you are
              the one true Messiah. They sent you an encrypted message, the answer of the encrypted message will give you the
              keyword to enter in the time machine!
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
              <b>But oh oh!</b> AI somehow got hold of this encrypted message and messed up with the encryption little bit and
              made it hard to debug! Decrypt the message and find the keyword to enter the future! A true Messiah is more than
              capable of decrypting the messages!
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
              Encrypted Message:
            </Typography>
            <ReactSyntaxHighlighter
              language="text"
              customStyle={{
                fontVariantLigatures: "no-contextual",
                fontSize: "1.1rem",
              }}
            >
              {QUESTION_MORSE_CODE}
            </ReactSyntaxHighlighter>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
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
                    It's a morse code with a twist...
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem disableGutters disablePadding>
                <ListItemIcon>
                  <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText>
                  <Box>
                    <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                      If you use an online Morse decoder, it will fail to decode the message. For example, if you encode "awesome"
                      and "eyesome", their encodings will be the same after removing the spaces:
                    </Typography>

                    <ReactSyntaxHighlighter
                      language="text"
                      customStyle={{
                        fontVariantLigatures: "no-contextual",
                        fontSize: "1.1rem",
                      }}
                    >
                      {SAMPLE_MORSE_CODE}
                    </ReactSyntaxHighlighter>

                    <Typography variant="body1" sx={{ fontSize: "1.1rem" }} gutterBottom>
                      (try in any online Morse code editor for more understanding).
                    </Typography>
                  </Box>
                </ListItemText>
              </ListItem>
            </List>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 700, fontSize: "1.1rem" }} gutterBottom>
              Your task is to find the correct popular phrase from the Morse code message and that will act as the password for
              the{" "}
              <Button
                variant="text"
                onClick={() => setShowTimeMachine(true)}
                sx={{
                  fontSize: "inherit",
                  p: 0,
                  pb: "2px",
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "transparent",
                    textDecoration: "underline",
                  },
                  textTransform: "none",
                }}
                disableRipple
                disableFocusRipple
                disableElevation
                disableTouchRipple
              >
                Time Machine
              </Button>
              .
            </Typography>
          </Box>

          {showTimeMachine && <TimeMachine />}
        </CardContent>
      </Card>
    </Box>
  );
}
