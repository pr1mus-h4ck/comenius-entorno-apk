import { Redirect } from "expo-router";

import { useSession } from "./context/SessionContext";

export default function Index() {

  const { session } = useSession();

  if (!session.sessionID) {
    return <Redirect href="/login" />;
  }

  if (!session.verificacion) {
    return <Redirect href="/otp" />;
  }

  return <Redirect href="/(tabs)/inicio" />;

}