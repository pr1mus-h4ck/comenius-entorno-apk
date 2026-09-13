import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import ComentarioCard from "./ComentarioCard";
import FormularioComentario from "./FormularioComentario";

import Card from "../../../components/Card";


import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { TYPOGRAPHY } from "../../../constants/typography";

export default function PublicacionCard({

  publicacion,
  onComentado,

}) {

  return (

    <Card style={styles.card}>

      <View style={styles.header}>

        <Text style={styles.nombre}>
          {publicacion.NombreCompleto}
        </Text>

        <Text style={styles.fecha}>
          {publicacion.FechaHora}
        </Text>

      </View>

      {publicacion.Titulo ? (

        <Text style={styles.titulo}>
          {publicacion.Titulo}
        </Text>

      ) : null}

      <Text style={styles.contenido}>
        {publicacion.Contenido}
      </Text>

      <View style={styles.divisor} />

      {publicacion.comentarios?.map((comentario) => (

        <ComentarioCard
          key={comentario.id}
          comentario={comentario}
        />

      ))}

      <FormularioComentario
        publicacionId={publicacion.id}
        onComentado={onComentado}
      />

    </Card>

  );

}

const styles = StyleSheet.create({

  card: {

    marginHorizontal: SPACING.md,

  },

  header: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: SPACING.md,

  },

  nombre: {

    fontSize: TYPOGRAPHY.body,

    fontWeight: "bold",

    color: COLORS.text,

    flex: 1,

  },

  fecha: {

    fontSize: TYPOGRAPHY.small,

    color: COLORS.textSecondary,

    marginLeft: SPACING.sm,

  },

  titulo: {

    fontSize: TYPOGRAPHY.h3,

    fontWeight: "bold",

    color: COLORS.primaryDark,

    marginBottom: SPACING.sm,

  },

  contenido: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.text,

    lineHeight: 22,

  },

  divisor: {

    height: 1,

    backgroundColor: COLORS.border,

    marginVertical: SPACING.lg,

  },

});