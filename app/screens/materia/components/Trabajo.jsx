import { ScrollView } from "react-native";

import TrabajoAlumno from "./TrabajoAlumno";
import TrabajoInstructor from "./TrabajoInstructor";
import TrabajoChat from "./TrabajoChat";
import EntregaTrabajo from "./EntregaTrabajo";

export default function Trabajo() {

  return (

    <ScrollView>

        <TrabajoInstructor />

        <TrabajoAlumno />

        <TrabajoChat />

        <EntregaTrabajo />

    </ScrollView>

  );

}