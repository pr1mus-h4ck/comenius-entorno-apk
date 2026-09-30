import { useState } from "react";

import { Image } from "expo-image";

import { Tabs } from "expo-router";

import {
  Pressable,
  View,
} from "react-native";

import Icon from "../components/Icon";
import ConfirmacionModal from "../components/ConfirmacionModal";

import {
  COLORS,
} from "../constants/colors";

import {
  ICONS,
} from "../constants/icons";

import {
  cerrarSesion as cerrarSesionApi,
} from "../services/auth-service";

import {
  irLogin,
} from "../services/navigation-service";

import {
  useSessionService,
} from "../services/session-service";


export default function TabsLayout() {

  const {
    session,
    limpiarSesion,
    setMostrarSesionFinalizada,
  } = useSessionService();


  const [
    mostrarConfirmacionCerrar,
    setMostrarConfirmacionCerrar,
  ] = useState(false);


  // ==========================================
  // MOSTRAR CONFIRMACIÓN
  // ==========================================

  function cerrarSesion() {

    setMostrarConfirmacionCerrar(true);

  }


  // ==========================================
  // CANCELAR
  // ==========================================

  function cancelarCerrarSesion() {

    setMostrarConfirmacionCerrar(false);

  }


  // ==========================================
  // CONFIRMAR CIERRE
  // ==========================================

  async function ejecutarCerrarSesion() {

    setMostrarConfirmacionCerrar(false);


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

      // ======================================
      // LIMPIAR SESIÓN
      // ======================================

      limpiarSesion();


      // ======================================
      // VOLVER AL LOGIN
      // ======================================

      irLogin();


      // ======================================
      // MOSTRAR SESIÓN FINALIZADA
      // ======================================

      setMostrarSesionFinalizada(true);


      // ======================================
      // OCULTAR DESPUÉS DE 2 SEGUNDOS
      // ======================================

      setTimeout(() => {

        setMostrarSesionFinalizada(false);

      }, 2000);

    }

  }


  return (

    <>

      <Tabs

        initialRouteName="inicio"

        screenOptions={{

          headerShown: false,

          tabBarActiveTintColor:
            COLORS.white,

          tabBarInactiveTintColor:
            COLORS.textSecondary,

          tabBarActiveBackgroundColor:
            COLORS.primary,

          tabBarStyle: {

            height: 65,

            paddingBottom: 8,

            paddingTop: 8,

          },

        }}

      >

        {/* ================================= */}
        {/* INICIO */}
        {/* ================================= */}

        <Tabs.Screen

          name="inicio"

          options={{

            title: "",

            tabBarIcon: ({
              focused,
            }) => (

              <Icon

                icon={
                  ICONS.inicio
                }

                active={
                  focused
                }

                size={24}

              />

            ),

          }}

        />


        {/* ================================= */}
        {/* LOGO */}
        {/* ================================= */}

        <Tabs.Screen

          name="logo"

          options={{

            title: "",

            tabBarButton: () => (

              <View
                style={{
                  flex: 1,
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                }}
              >

                <Image

                  source={
                    require(
                      "../../assets/mini-logo.svg"
                    )
                  }

                  style={{
                    width: 30,
                    height: 30,
                  }}

                  contentFit="contain"

                />

              </View>

            ),

          }}

        />


        {/* ================================= */}
        {/* CERRAR SESIÓN */}
        {/* ================================= */}

        <Tabs.Screen

          name="logout"

          options={{

            title: "Cerrar sesión",

            tabBarButton: () => (

              <Pressable

                style={({
                  pressed,
                }) => [

                  {
                    flex: 1,

                    justifyContent:
                      "center",

                    alignItems:
                      "center",
                  },

                  pressed && {

                    opacity: 0.6,

                    transform: [
                      {
                        scale: 0.94,
                      },
                    ],

                  },

                ]}

                android_ripple={{
                  color:
                    "#DDDDDD",
                }}

                onPress={
                  cerrarSesion
                }

              >

                <Icon

                  icon={
                    ICONS.logout
                  }

                  size={24}

                />

              </Pressable>

            ),

          }}

        />

      </Tabs>


      {/* ================================= */}
      {/* CONFIRMACIÓN CERRAR SESIÓN */}
      {/* ================================= */}

      <ConfirmacionModal

        visible={
          mostrarConfirmacionCerrar
        }

        titulo={
          "Estás a punto de\nCerrar la Sesión"
        }

        mensaje={
          "¿Estás seguro/a de\nquerer Cerrar la Sesión?"
        }

        textoConfirmar={
          "Sí, quiero Cerrar la Sesión"
        }

        textoCancelar={
          "No, no quiero Cerrar la Sesión"
        }

        onConfirmar={
          ejecutarCerrarSesion
        }

        onCancelar={
          cancelarCerrarSesion
        }

      />

    </>

  );

}