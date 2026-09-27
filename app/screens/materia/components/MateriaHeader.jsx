import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { RADIUS } from "../../../constants/radius";

export default function MateriaHeader({
  nombre,
  comision,
  turno,
  horarios,
  profesor,
}) {

  return (

    <View style={styles.container}>

      <Text style={styles.nombre}>
        {nombre}
      </Text>

      <Text style={styles.info}>
        Comision: {comision}
      </Text>

      <Text style={styles.info}>
        Turno: {turno}
      </Text>

      <Text style={styles.info}>
        {horarios}
      </Text>

      <Text style={styles.info}>
        Profesor: {profesor}
      </Text>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {

    backgroundColor: COLORS.card,

    margin: SPACING.md,

    padding: SPACING.lg,

    borderRadius: RADIUS.lg,

    borderWidth: 1,

    borderColor: COLORS.border,

  },

  nombre: {

    fontSize: 24,

    fontWeight: "bold",

    color: COLORS.primaryDark,

    marginBottom: SPACING.sm,

  },

  info: {

    color: COLORS.text,

    marginTop: 2,

  },

});