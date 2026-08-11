import { useEffect, useState } from "react";

import { ScrollView } from "react-native";

import { obtenerTrabajos } from "../../services/materia-service";
import { useSessionService } from "../../services/session-service";

import FormularioTrabajo from "./components/FormularioTrabajo";
import TrabajoCard from "./components/TrabajoCard";

export default function ListaTrabajo() {

  const { session } = useSessionService();

  const [trabajos, setTrabajos] = useState([]);

  useEffect(() => {

    cargarTrabajos();

  }, []);

async function cargarTrabajos() {

  const datos = await obtenerTrabajos();

  setTrabajos(datos);

}

  return (

    <ScrollView>

      {session.rol === "instructor" && (

        <FormularioTrabajo />

      )}

      {trabajos.map((trabajo) => (

        <TrabajoCard

          key={trabajo.id}

          trabajo={trabajo}

        />

      ))}

    </ScrollView>

  );

}