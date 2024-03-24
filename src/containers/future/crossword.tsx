import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
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

interface IQuestionProps {
  question: IQuestion;
}

function Question(props: IQuestionProps) {
  const { question } = props;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }} gutterBottom>
        <b>{`${question.position}. `}</b>
        {question.question}
      </Typography>
      <Typography variant="caption" gutterBottom>
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
              fontSize: "1rem",
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
          <img
            src={CROSSWORD_IMAGE_URL}
            alt="Crossword"
            style={{ width: "100%", height: "auto", borderRadius: "16px", mixBlendMode: "darken" }}
          />

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Across
              <ArrowForwardIcon />
            </Typography>
            {ACROSS_QUESTIONS.map((question) => (
              <Question key={question.position} question={question} />
            ))}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Down
              <ArrowDownwardIcon />
            </Typography>
            {DOWN_QUESTIONS.map((question) => (
              <Question key={question.position} question={question} />
            ))}
          </Box>

          <Box sx={{ mt: 4 }}>
            {/* TODO: CHECK THE SEQUENCE ONCE */}
            <Typography variant="body1" sx={{ fontWeight: 700 }} gutterBottom>
              Passkey is made of the character sequence at positions (8A 3A 1D 4D 5D 6A 7D 2D) in the crossword and it is 8
              characters long. Enter the crossword key to complete the mission -
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
              inputProps={{ maxLength: 8 }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleSubmit} disabled={passkey.length !== 8}>
                Submit Password
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
