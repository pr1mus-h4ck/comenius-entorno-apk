import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import FileIcon from "../../../components/FileIcon";
import Card from "../../../components/Card";

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

    cargarTrabajo();

  }, []);


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

        <View

          key={archivo.id}

          style={styles.archivo}

        >

          <FileIcon

            fileName={archivo.Nombre}

            size={28}

          />

          <Text style={styles.nombreArchivo}>

            {archivo.Nombre}

          </Text>

        </View>

      ))}

    </Card>

  );

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