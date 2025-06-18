import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get("token");
    console.log("Token cookie:", tokenCookie);

    if (!tokenCookie || !tokenCookie.value) {
      console.log("No token cookie found");
      return null;
    }

    const token = tokenCookie.value;
    console.log("Token exists, attempting to verify");

    const decodedToken: any = jwt.verify(
      String(token),
      process.env.TOKEN_SECRET!
    );

    // Change this line to use userId instead of id
    console.log("Token verified, user ID:", decodedToken.userId);
    return decodedToken.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
