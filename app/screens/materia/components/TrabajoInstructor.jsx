import { useEffect, useState } from "react";

import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import Card from "../../../components/Card";
import FileIcon from "../../../components/FileIcon";

import { obtenerTrabajoInstructor } from "../../../services/auth-service";
import { useSessionService } from "../../../services/session-service";

import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { TYPOGRAPHY } from "../../../constants/typography";

export default function TrabajoInstructor() {

  const [trabajo, setTrabajo] = useState(null);

  const { session } = useSessionService();


  // ==========================================
  // OBTENER TRABAJO
  // ==========================================

useEffect(() => {
  if (
    session?.trabajo?.id
  ) {
    cargarTrabajo();
  }
}, [
  session?.trabajo?.id,
  session?.usuarioID,
  session?.sessionID,
  session?.comisionID,
]);


  async function cargarTrabajo() {

    const respuesta = await obtenerTrabajoInstructor(

      session.usuarioID,

      session.sessionID,

      session.comisionID,

      session.trabajo?.id

    );


    if (!respuesta.ok) {

      console.log(
        "❌ Error:",
        respuesta.mensaje
      );

      return;

    }


    setTrabajo(
      respuesta.trabajo
    );

  }


  if (!trabajo) {

    return null;

  }


  return (

    <Card style={styles.card}>

      <Text style={styles.titulo}>

        {trabajo.Titulo}

      </Text>


      <Text style={styles.contenido}>

        {trabajo.Contenido}

      </Text>


      <Text style={styles.subtitulo}>

        Archivos

      </Text>


      {trabajo.Archivos?.map((archivo) => (

       <Pressable
  key={archivo.id}
  style={styles.archivo}
  onPress={() => abrirArchivo(archivo.URL)}
>

  <FileIcon
    fileName={archivo.Nombre}
    size={28}
  />

  <Text style={styles.nombreArchivo}>
    {archivo.Nombre}
  </Text>

</Pressable>

      ))}

    </Card>

  );

}

async function abrirArchivo(url) {

  if (!url) {
    console.log("❌ El archivo no tiene URL.");
    return;
  }

  const puedeAbrir = await Linking.canOpenURL(url);

  if (!puedeAbrir) {
    console.log("❌ No se puede abrir el archivo:", url);
    return;
  }

  await Linking.openURL(url);
}

const styles = StyleSheet.create({

  card: {

    marginHorizontal: SPACING.md,

  },

  titulo: {

    fontSize: TYPOGRAPHY.h2,

    fontWeight: "bold",

    color: COLORS.primaryDark,

    marginBottom: SPACING.md,

  },

  contenido: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.text,

    lineHeight: 24,

    marginBottom: SPACING.xl,

  },

  subtitulo: {

    fontSize: TYPOGRAPHY.h3,

    fontWeight: "bold",

    color: COLORS.text,

    marginBottom: SPACING.md,

  },

  archivo: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.surface,

    padding: SPACING.md,

    borderRadius: 8,

    marginBottom: SPACING.sm,

  },

  nombreArchivo: {

    marginLeft: SPACING.md,

    fontSize: TYPOGRAPHY.body,

    color: COLORS.text,

  },

});