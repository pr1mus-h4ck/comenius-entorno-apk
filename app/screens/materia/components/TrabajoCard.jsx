import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";


import Icon from "../../../components/Icon";
import { ICONS } from "../../../constants/icons";

import Card from "../../../components/Card";

import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { TYPOGRAPHY } from "../../../constants/typography";

import { useSessionService } from "../../../services/session-service";

export default function TrabajoCard({ trabajo }) {

  const { actualizarCampo } = useSessionService();

function seleccionarTrabajo() {
  actualizarCampo(
    "trabajo",
    trabajo
  );
}

  return (

    <Pressable
  onPress={seleccionarTrabajo}
>

  <Card style={styles.card}>

      <Icon
      icon={ICONS.listaTrabajo}
      active={false}
      size={36}
    />

      <View style={styles.info}>

        <Text style={styles.titulo}>
          {trabajo.Titulo}
        </Text>

        <Text style={styles.fecha}>
          {trabajo.FechaHora}
        </Text>

      </View>

      </Card>

    </Pressable>

  );

}

const styles = StyleSheet.create({

  card: {

    flexDirection: "row",

    alignItems: "center",

    marginHorizontal: SPACING.md,

  },

  info: {

    flex: 1,

    marginLeft: SPACING.lg,

  },

  titulo: {

    fontSize: TYPOGRAPHY.h3,

    fontWeight: "bold",

    color: COLORS.text,

    marginBottom: SPACING.xs,

  },

  fecha: {

    fontSize: TYPOGRAPHY.small,

    color: COLORS.textSecondary,

  },

});