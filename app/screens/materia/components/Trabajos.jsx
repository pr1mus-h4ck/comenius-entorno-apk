import { useSessionService } from "../../../services/session-service";

import ListaTrabajo from "../ListaTrabajo";
import ListaAlumno from "./ListaAlumno";
import Trabajo from "./Trabajo";

export default function Trabajos() {

  const { session } = useSessionService();

  // Alumno
  if (session.rol === "alumno") {

    if (session.trabajo) {
      return <Trabajo />;
    }

    return <ListaTrabajo />;

  }

  // Instructor
  if (session.trabajo) {

    if (!session.alumno) {
      return <ListaAlumno />;
    }

    return <Trabajo />;

  }

  return <ListaTrabajo />;

}