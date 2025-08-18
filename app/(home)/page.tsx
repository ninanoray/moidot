import { getServerSession } from "next-auth";
import Home from ".";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function home() {
  const session = await getServerSession(authOptions);

  if (session) return <Home />;
  else return <div></div>;
}
