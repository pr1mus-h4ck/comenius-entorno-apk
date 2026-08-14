import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet
} from "react-native";

import { obtenerPublicaciones } from "../../../services/auth-service";
import { useSessionService } from "../../../services/session-service";

import { COLORS } from "../../../constants/colors";

import FormularioPublicacion from "./FormularioPublicacion";
import PublicacionCard from "./PublicacionCard";

export default function PanelClase() {

  const { session } = useSessionService();

  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {

    cargarPublicaciones();

  }, []);

async function cargarPublicaciones() {

  const respuesta = await obtenerPublicaciones(

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

  setPublicaciones(
    respuesta.publicaciones
  );

}

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >

      {session.rol === "instructor" && (

        <FormularioPublicacion />

      )}

      {publicaciones.map((publicacion) => (

        <PublicacionCard
          key={publicacion.id}
          publicacion={publicacion}
        />

      ))}

</ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: COLORS.background,

  },

});