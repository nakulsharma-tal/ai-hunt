import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "@tanstack/react-router";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { toast } from "react-toastify";

import { AppRoutes } from "../../app-routes";
import riseOfTheSaviour from "../../assets/rise-of-the-saviour.jpg";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { ApiError, CompetitionRound } from "../../types";
import { CORRECT_PASSKEY } from "../../user-message.constant";
import { ACROSS_QUESTIONS, CROSSWORD_IMAGE_URL, DOWN_QUESTIONS } from "./crossword.constant";
import { IQuestion } from "./question.interface";

interface IQuestionProps {
  question: IQuestion;
}

function Question(props: IQuestionProps) {
  const { question } = props;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" gutterBottom>
        {question.question}
      </Typography>
      <Typography variant="caption" gutterBottom>
        {question.hint}
      </Typography>

      {question.codeSnippet && (
        <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "80%" }}>
            <ReactSyntaxHighlighter language="javascript">{[question.codeSnippet]}</ReactSyntaxHighlighter>
          </Box>
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
    const data = await mutateAsync({ passkey, round: CompetitionRound.Second });
    if (data?.statusCode === HttpStatusCode.Ok) {
      toast.success(CORRECT_PASSKEY);
    } else if ((data as ApiError).error) {
      toast.error((data as ApiError).error);
    } else {
      toast.error(data.message);
    }

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
          backgroundColor: "rgba(240, 255, 255, 0.9)",
          borderRadius: 4,
          p: 2,
        }}
      >
        <CardMedia
          sx={{
            height: 0,
            paddingTop: "56.25%", // 16:9,
            marginTop: "30",
            backgroundSize: "contain",
          }}
          image={CROSSWORD_IMAGE_URL}
          title="Crossword"
        />
        <CardContent>
          <Box>
            <Typography variant="h6" gutterBottom>
              Across
              <ArrowForwardIcon />
            </Typography>
            {ACROSS_QUESTIONS.map((question) => (
              <Question question={question} />
            ))}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Down
              <ArrowDownwardIcon />
            </Typography>
            {DOWN_QUESTIONS.map((question) => (
              <Question question={question} />
            ))}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }} gutterBottom>
              Passkey is made of the character sequence at positions 8A 3A 1D 4D 5D 6A 7D 2D in the crossword and it is 8
              characters long. Enter the crossword key to complete the mission -
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
