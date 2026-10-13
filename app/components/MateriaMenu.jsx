import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import Icon from "./Icon";

import { ICONS } from "../constants/icons";
import { menuMateria } from "../constants/menus";
import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import { RADIUS } from "../constants/radius";
import { TYPOGRAPHY } from "../constants/typography";

import {
  useSessionService,
} from "../services/session-service";


export default function MateriaMenu() {

  const {
    session,
    actualizarSesion,
  } = useSessionService();


  const opciones =
    menuMateria[session.rol] || [];


  function seleccionarOpcion(opcion) {

    actualizarSesion({

      enlace: opcion.label,

      trabajo: null,

      alumno: null,

      listaAlumno: null,

    });

  }


  return (

    <View style={styles.container}>

      {opciones.map((opcion) => {

        const activo =
          session.enlace ===
          opcion.label;


        return (

          <Pressable

            key={opcion.label}

            style={[

              styles.boton,

              activo &&
                styles.botonActivo,

            ]}

            onPress={() =>
              seleccionarOpcion(opcion)
            }

          >

            <Icon

              icon={
                ICONS[opcion.icon]
              }

              active={activo}

              size={28}

            />


            <Text

              style={[

                styles.texto,

                activo &&
                  styles.textoActivo,

              ]}

            >

              {opcion.label}

            </Text>

          </Pressable>

        );

      })}

    </View>

  );

}


const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    justifyContent:
      "space-between",

    marginHorizontal:
      SPACING.md,

    marginBottom:
      SPACING.md,

  },


  boton: {

    flex: 1,

    minHeight: 72,

    marginHorizontal:
      SPACING.xs,

    paddingVertical:
      SPACING.md,

    paddingHorizontal:
      SPACING.sm,

    borderRadius:
      RADIUS.md,

    backgroundColor:
      COLORS.surface,

    alignItems: "center",

    justifyContent:
      "center",

    borderWidth: 1,

    borderColor:
      COLORS.border,

  },


  botonActivo: {

    backgroundColor:
      COLORS.primary,

    borderColor:
      COLORS.primary,

  },


  texto: {

    marginTop:
      SPACING.sm,

    color:
      COLORS.text,

    fontWeight:
      "500",

    fontSize:
      TYPOGRAPHY.small,

    textAlign:
      "center",

  },


  textoActivo: {

    color:
      COLORS.white,

    fontWeight:
      "bold",

  },

});