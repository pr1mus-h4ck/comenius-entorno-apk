import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { obtenerEntrega } from "../../../services/materia-service";
import FileIcon from "../../../components/FileIcon";
import Card from "../../../components/Card";

import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { TYPOGRAPHY } from "../../../constants/typography";

export default function TrabajoAlumno() {

  const [entrega, setEntrega] = useState(null);

  useEffect(() => {

    cargarEntrega();

  }, []);

  async function cargarEntrega() {

  const datos = await obtenerEntrega();

  setEntrega(datos);

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

      {entrega.Archivos.map((archivo) => (

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

    color: COLORS.text,

  },

  sinEntrega: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.textSecondary,

    textAlign: "center",

  },

});