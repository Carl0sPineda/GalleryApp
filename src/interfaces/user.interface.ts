import { Posts } from "./post.interface";

export interface Users {
  id: string;
  email: string;
  name: string;
  password: string;
  otp_enabled: boolean;
  otp_verified: boolean;
  otp_ascii: string;
  otp_hex: string;
  otp_base32: string;
  otp_auth_url: string;
  posts: Posts[];
}
