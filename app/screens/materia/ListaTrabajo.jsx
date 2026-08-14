import { useEffect, useState } from "react";

import { ScrollView } from "react-native";

import { obtenerTrabajos } from "../../services/auth-service";
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

  const respuesta = await obtenerTrabajos(

    session.usuarioID,

    session.sessionID,

    session.comisionID

  );

  if (!respuesta.ok) {

    console.log(
      "❌",
      respuesta.mensaje
    );

    return;
  }

  setTrabajos(
    respuesta.trabajos
  );

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