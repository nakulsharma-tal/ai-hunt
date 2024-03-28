import { HttpStatusCode } from "axios";

export type ApiResponseBase = { message: string; statusCode: HttpStatusCode };

export type ApiError = ApiResponseBase & { error: string };

export type ApiSuccess<T> = ApiResponseBase & { data: T };

export type ApiResponse<T> = ApiError | ApiSuccess<T>;

export interface ISubmission {
  timestamp: string;
  teamId?: string;
  round: CompetitionRound;
  passkey?: string;
  solutionUrl?: string;
}

export interface ITeam {
  id: string;
  name: string;
  members: Array<string>;
  skypeId: string;
  email: string;
}

export interface ISubmissionWithTeam extends Omit<ISubmission, "teamId"> {
  team: ITeam;
}

export enum CompetitionRound {
  Zero = "Zero",
  First = "First",
  Second = "Second",
  Third = "Third",
}

export interface VerifySubmissionDtoForRoundThird {
  round: CompetitionRound.Third;
  solutionUrl: string;
  teamId: string;
}

export interface VerifySubmissionDtoForRoundZeroFirstAndSecond {
  round: CompetitionRound.Zero | CompetitionRound.First | CompetitionRound.Second;
  passkey: string;
  teamId: string;
}

export type VerifySubmissionDto = VerifySubmissionDtoForRoundThird | VerifySubmissionDtoForRoundZeroFirstAndSecond;
