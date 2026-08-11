import { Redirect } from "expo-router";

import { useSession } from "./context/SessionContext";

export default function Index() {

  const { session } = useSession();

  // Todavía no existe una sesión.
  // Siempre comienza en Login.
  if (!session.sessionID) {
    return <Redirect href="/login" />;
  }

  // Existe sesión pero falta validar OTP
  if (!session.verificacion) {
    return <Redirect href="/otp" />;
  }

  // Sesión completa
  return <Redirect href="/(tabs)/inicio" />;

}