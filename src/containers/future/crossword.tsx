import { useNavigate } from "@tanstack/react-router";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { toast } from "react-toastify";

import { AppRoutes } from "../../app-routes";
import { useVerifySubmissionQuery } from "../../hooks/useVerifySubmissionQuery";
import { ApiError, CompetitionRound } from "../../types";
import { CORRECT_PASSKEY } from "../../user-message.constant";
import { ACROSS_QUESTIONS, DOWN_QUESTIONS } from "./question.constant";

export function Crossword() {
  const [passkey, setPassword] = useState("");

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
    <div className="bg-gray-200 p-4 w-96 h-auto">
      <img src="crossword-image.png" alt="Crossword" />

      <div>
        <h3 className="text-xl font-bold">Across</h3>
        {ACROSS_QUESTIONS.map((question) => (
          <div>
            <p>{question.question}</p>
            <p>{question.hint}</p>
            {question.codeSnippet && (
              <ReactSyntaxHighlighter language="javascript" style={undefined}>
                {[question.codeSnippet]}
              </ReactSyntaxHighlighter>
            )}
          </div>
        ))}
      </div>

      <div>
        {DOWN_QUESTIONS.map((question) => (
          <div>
            <p>{question.question}</p>
            <p>{question.hint}</p>
            {question.codeSnippet && (
              <ReactSyntaxHighlighter language="javascript" style={undefined}>
                {[question.codeSnippet]}
              </ReactSyntaxHighlighter>
            )}
          </div>
        ))}
      </div>

      <div>
        Enter the crossword key.
        <div className="flex flex-col">
          <input
            type="text"
            value={passkey}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded"
          />

          <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Submit Password
          </button>
        </div>
      </div>
    </div>
  );
}
