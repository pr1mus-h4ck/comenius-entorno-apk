import ListaComision from "./components/ListaComision";
import MateriaScreen from "../materia";

import { useSessionService } from "../../services/session-service";

export default function InicioScreen() {

  const { session } = useSessionService();

  if (session.comision) {
    return <MateriaScreen />;
  }

  return <ListaComision />;

}