import { Box, Button, Card, CardContent, Link, TextField, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";

import { AppRoutes } from "../../app-routes";
import riseOfTheSaviour from "../../assets/rise-of-the-saviour.jpg";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { CompetitionRound } from "../../types";
import { ACROSS_QUESTIONS, CROSSWORD_IMAGE_URL, DOWN_QUESTIONS } from "./crossword.constant";
import { IQuestion } from "./question.interface";

const ROUND_TWO_PASSKEY_POSITIONS = "[8G, 3G, 1G, 4C, 5E, 6B, 7D, 2E]";
const ROUND_TWO_PASSKEY_LENGTH = 8;

interface IQuestionProps {
  question: IQuestion;
}

function Question(props: IQuestionProps) {
  const { question } = props;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" sx={{ whiteSpace: "pre-line", fontSize: "1.1rem" }} gutterBottom>
        <b>{`Q. ${question.position}) `}</b>
        {question.question}
      </Typography>
      <Typography variant="caption" gutterBottom sx={{ fontSize: "0.9rem" }}>
        {question.hint}
      </Typography>

      {question.codeSnippet && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ReactSyntaxHighlighter
            language="javascript"
            customStyle={{
              width: "80%",
              borderRadius: "8px",
              padding: "24px",
              fontSize: "1.1rem",
            }}
          >
            {question.codeSnippet}
          </ReactSyntaxHighlighter>
        </Box>
      )}
    </Box>
  );
}

export function Crossword() {
  const [passkey, setPasskey] = useState("");

  const navigate = useNavigate({ from: AppRoutes.CROSSWORD });
  const { mutateAsync } = useVerifySubmissionQuery(CompetitionRound.Second);

  const handleSubmit = useCallback(async () => {
    await mutateAsync({ passkey, round: CompetitionRound.Second });
    navigate({
      to: AppRoutes.LAST_STAND,
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
              The Training Puzzle
            </Typography>
          </Box>

          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            Your mission is to solve the crossword puzzle and find out the passkey to complete the training designed by LOL. The
            passkey is made of the character sequence at positions {ROUND_TWO_PASSKEY_POSITIONS} (in that order) marked in the
            crossword.
          </Typography>

          <img
            src={CROSSWORD_IMAGE_URL}
            alt="Crossword"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "16px",
              marginTop: "16px",
            }}
          />

          <Typography variant="body1" sx={{ mt: 2, fontSize: "1.1rem" }} gutterBottom>
            Click{" "}
            <Link href={CROSSWORD_IMAGE_URL} underline="always" target="_blank" rel="noreferrer">
              here
            </Link>{" "}
            to open the crossword in a new tab.
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              Across
              <ArrowForwardIcon />
            </Typography>
            {ACROSS_QUESTIONS.map((question) => (
              <Question key={question.position} question={question} />
            ))}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              Down
              <ArrowDownwardIcon />
            </Typography>
            {DOWN_QUESTIONS.map((question) => (
              <Question key={question.position} question={question} />
            ))}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 700, fontSize: "1.1rem" }} gutterBottom>
              Enter the passkey key to complete your training -
            </Typography>

            <TextField
              id="round-2-passkey"
              label="Passkey"
              variant="outlined"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              fullWidth
              sx={{
                my: 2,
              }}
              inputProps={{ maxLength: ROUND_TWO_PASSKEY_LENGTH }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleSubmit} sx={{ fontSize: "1rem" }} disabled={passkey.length !== ROUND_TWO_PASSKEY_LENGTH}>
                Submit Passkey
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
