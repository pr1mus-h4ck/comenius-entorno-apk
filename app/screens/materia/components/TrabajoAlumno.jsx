import { useEffect, useState } from "react";

import {
  Linking,
  Pressable,
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  obtenerTrabajoAlumno,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";

import FileIcon from "../../../components/FileIcon";
import Card from "../../../components/Card";

import {
  COLORS
} from "../../../constants/colors";

import {
  SPACING
} from "../../../constants/spacing";

import {
  TYPOGRAPHY
} from "../../../constants/typography";


export default function TrabajoAlumno({
  entregaActualizada,
}) {

  const [entrega, setEntrega] = useState(null);

  const { session } = useSessionService();

  async function abrirArchivo(archivo) {

  if (!archivo?.URL) {
    return;
  }

  try {

    await Linking.openURL(
      archivo.URL
    );

  } catch (error) {

    console.log(
      "❌ No se pudo abrir el archivo:",
      error
    );

  }

}


  // ==========================================
  // OBTENER ENTREGA
  // ==========================================

  useEffect(() => {

    if (!session?.trabajo?.id) {
      return;
    }

    cargarEntrega();

  }, [
    session?.trabajo?.id,
    session?.listaAlumno,
    entregaActualizada,
  ]);


  async function cargarEntrega() {

    const respuesta =
      await obtenerTrabajoAlumno(
        session.usuarioID,
        session.sessionID,
        session.comisionID,
        session.trabajo.id,
        session.listaAlumno,
        session.rol,
        session.instructorID
      );


    if (!respuesta.ok) {

      console.log(
        "❌ Error:",
        respuesta.mensaje
      );

      return;

    }


    setEntrega(
      respuesta.trabajo
    );

  }


  if (!entrega) {

    return (

      <Card style={styles.card}>

        <Text style={styles.sinEntrega}>

          Sin entregas

        </Text>

      </Card>

    );

  }


  return (

    <Card style={styles.card}>

      <Text style={styles.titulo}>

        Entrega del alumno

      </Text>


{entrega.Archivos?.map((archivo) => (

  <Pressable
    key={archivo.id}
    style={styles.archivo}
    onPress={() =>
      abrirArchivo(archivo)
    }
  >

    <FileIcon
      fileName={archivo.Nombre}
      size={28}
    />

    <Text
      style={styles.nombreArchivo}
    >
      {archivo.Nombre}
    </Text>

  </Pressable>

))}
    </Card>

  );

}


const styles = StyleSheet.create({

  card: {

    marginHorizontal: SPACING.md,

  },

  titulo: {

    fontSize: TYPOGRAPHY.h3,

    fontWeight: "bold",

    color: COLORS.primaryDark,

    marginBottom: SPACING.lg,

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

  color: COLORS.primary,

  textDecorationLine: "underline",

  flex: 1,

},

  sinEntrega: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.textSecondary,

    textAlign: "center",

  },

});