import { User } from './user.type';
import { ErrorResponse, SuccessResponse } from './utils.type';

export type AuthResponse = SuccessResponse<{
  access_token: string;
  expires: number;
  refresh_token: string;
  expires_refresh_token: number;
  user: User;
}>;

export type RefreshTokenResponse = SuccessResponse<{ access_token: string }>;
