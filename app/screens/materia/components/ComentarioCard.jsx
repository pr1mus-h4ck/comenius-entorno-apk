import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../../constants/colors";
import { RADIUS } from "../../../constants/radius";
import { SPACING } from "../../../constants/spacing";
import { TYPOGRAPHY } from "../../../constants/typography";

export default function ComentarioCard({ comentario }) {

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.nombre}>
          {comentario.NombreCompleto}
        </Text>

        <Text style={styles.fecha}>
          {comentario.FechaHora}
        </Text>

      </View>

      <Text style={styles.contenido}>
        {comentario.Contenido}
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    marginTop: SPACING.md,

    marginLeft: SPACING.xl,

    padding: SPACING.md,

    backgroundColor: COLORS.surface,

    borderRadius: RADIUS.md,

    borderLeftWidth: 4,

    borderLeftColor: COLORS.primary,

  },

  header: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: SPACING.xs,

  },

  nombre: {

    fontWeight: "bold",

    fontSize: TYPOGRAPHY.small,

    color: COLORS.text,

    flex: 1,

  },

  fecha: {

    fontSize: 11,

    color: COLORS.textSecondary,

    marginLeft: SPACING.sm,

  },

  contenido: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.text,

    lineHeight: 20,

  },

});