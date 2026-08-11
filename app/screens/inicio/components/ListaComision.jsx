import { Pressable, StyleSheet, Text, View } from "react-native";

import { irMateria } from "../../../services/navigation-service";
import { useSessionService } from "../../../services/session-service";

import Header from "../../../components/Header";

import { COLORS } from "../../../constants/colors";
import { RADIUS } from "../../../constants/radius";
import { SPACING } from "../../../constants/spacing";
import { TYPOGRAPHY } from "../../../constants/typography";

export default function ListaComision() {

const comisiones = [

  {
    id: 1,
    nombre: "Sistemas Operativos",
    comision: "A",
    profesor: "Mariana López",
  },

  {
    id: 2,
    nombre: "Programación II",
    comision: "B",
    profesor: "Juan Pérez",
  },

];    

  const { actualizarCampo } = useSessionService();

  function ingresarComision(comision) {

    actualizarCampo("comision", comision);

    actualizarCampo("comisionID", comision.id);

    actualizarCampo("item", "Materia");

    actualizarCampo("enlace", "Portada");

    irMateria();

  }

  return (

    <View style={styles.container}>

      <Header

        title="Mis Comisiones"

        subtitle="Seleccioná una comisión para ingresar."

      />

      {comisiones.map((comision) => (

        <Pressable
            key={comision.id}
            style={styles.card}
            onPress={() => ingresarComision(comision)}
        >

            <Text style={styles.nombre}>
            {comision.nombre}
            </Text>

            <Text style={styles.detalle}>
              Comisión {comision.comision}
            </Text>

            <Text style={styles.detalle}>
              Profesor: {comision.profesor}
            </Text>

        </Pressable>

        ))}
    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: COLORS.background,

    padding: SPACING.xl,

  },

  card: {

    backgroundColor: COLORS.card,

    borderRadius: RADIUS.lg,

    padding: SPACING.xl,

    marginBottom: SPACING.lg,

    borderWidth: 1,

    borderColor: COLORS.border,

  },

  nombre: {

    fontSize: TYPOGRAPHY.h3,

    fontWeight: "bold",

    color: COLORS.primary,

    marginBottom: SPACING.sm,

  },

  detalle: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.textSecondary,

    marginTop: SPACING.xs,

  },

});