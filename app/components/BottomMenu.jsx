import { Image } from "expo-image";

import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import Icon from "./Icon";

import { ICONS } from "../constants/icons";

import {
  cerrarSesion as cerrarSesionApi,
} from "../services/auth-service";

import {
  irInicio,
  irLogin,
} from "../services/navigation-service";

import {
  useSessionService,
} from "../services/session-service";


export default function BottomMenu() {

const {
  session,
  limpiarSesion,
  actualizarSesion,
} = useSessionService();


function irInicioLimpio() {

  actualizarSesion({

    enlace: "",

    trabajo: null,

    alumno: null,

    listaAlumno: null,

  });

  irInicio();

}

  function confirmarCerrarSesion() {

    if (Platform.OS === "web") {

      const confirmar =
        window.confirm(
          "¿Estás seguro de que querés cerrar sesión?"
        );

      if (confirmar) {
        ejecutarCerrarSesion();
      }

      return;
    }


    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que querés cerrar sesión?",
      [

        {
          text: "No",
          style: "cancel",
        },

        {
          text: "Sí",
          style: "destructive",
          onPress:
            ejecutarCerrarSesion,
        },

      ]
    );

  }


  async function ejecutarCerrarSesion() {

    try {

      const respuesta =
        await cerrarSesionApi(
          session.usuarioID,
          session.sessionID
        );

      console.log(
        "✅ Cerrar sesión:",
        respuesta
      );

    } catch (error) {

      console.log(
        "❌ Error al cerrar sesión:",
        error
      );

    } finally {

      await limpiarSesion();

      irLogin();

    }

  }


  return (

    <View style={styles.menu}>


      {/* ============================= */}
      {/* INICIO */}
      {/* ============================= */}

      <Pressable

        style={styles.boton}

        onPress={irInicioLimpio}

      >

        <Icon

          icon={ICONS.inicio}

          size={24}

        />

      </Pressable>


      {/* ============================= */}
      {/* LOGO */}
      {/* ============================= */}

      <Pressable

        style={styles.boton}

        onPress={irInicioLimpio}

      >

        <Image

          source={require(
            "../../assets/mini-logo.svg"
          )}

          style={styles.logo}

          contentFit="contain"

        />

      </Pressable>


      {/* ============================= */}
      {/* CERRAR SESIÓN */}
      {/* ============================= */}

      <Pressable

        style={styles.boton}

        onPress={confirmarCerrarSesion}

      >

        <Icon

          icon={ICONS.logout}

          size={24}

        />

      </Pressable>


    </View>

  );

}


const styles = StyleSheet.create({

  menu: {

    position: "absolute",

    bottom: 0,

    left: 0,

    right: 0,

    height: 65,

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,

    borderTopColor: "#DDDDDD",

    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-around",

    zIndex: 100,

  },


  boton: {

    flex: 1,

    height: 65,

    alignItems: "center",

    justifyContent: "center",

  },


  logo: {

    width: 32,

    height: 32,

  },

});