// import { jwtVerify } from 'jose/jwt/verify';
import * as jose from "jose";
export async function getSession(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const verify: jose.JWTVerifyResult<jose.JWTPayload> = await jose.jwtVerify(
      token,
      secret
    );
    return verify.payload.userId;
  } catch (error) {
    console.log(error);
    return null;
  }
}
