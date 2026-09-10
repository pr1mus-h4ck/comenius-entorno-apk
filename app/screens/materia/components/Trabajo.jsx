import { ScrollView } from "react-native";

import TrabajoAlumno from "./TrabajoAlumno";
import TrabajoInstructor from "./TrabajoInstructor";
import TrabajoChat from "./TrabajoChat";
import EntregaTrabajo from "./EntregaTrabajo";

import {
  useSessionService,
} from "../../../services/session-service";

export default function Trabajo() {
  const { session } =
    useSessionService();

  return (
    <ScrollView>

      {session.rol === "instructor" ? (
        <>
          <TrabajoInstructor />

          <TrabajoChat />
        </>
      ) : (
        <>
          <TrabajoAlumno />

          <EntregaTrabajo />

          <TrabajoChat />
        </>
      )}

    </ScrollView>
  );
}