import { HttpStatusCode } from 'axios';

export type ApiResponse<T> =
  | { message: 'success'; response: T; statusCode: 200 }
  | { statusCode: Omit<HttpStatusCode, 200>; message: string };

export type ISubmission = VerifySubmissionDto & { timestamp: string };

export interface VerifySubmissionDto {
  round: CompetitionRound;

  passkey?: string;

  solutionUrl?: string;

  teamId?: string;
}

export enum CompetitionRound {
  Zero = 'Zero',

  First = 'First',

  Second = 'Second',

  Third = 'Third',
}
