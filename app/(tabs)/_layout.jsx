import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { Pressable, View } from "react-native";

import Icon from "../components/Icon";

import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";

import { cerrarSesion as cerrarSesionApi } from "../services/auth-service";
import { irLogin } from "../services/navigation-service";
import { useSessionService } from "../services/session-service";

export default function TabsLayout() {

  const { session, limpiarSesion } = useSessionService();

  async function cerrarSesion() {

    try {

      await cerrarSesionApi(
        session.usuarioID,
        session.sessionID
      );

    } catch (error) {

      console.log(
        "Error al cerrar sesión en el servidor:",
        error
      );

    } finally {

      // Aunque el servidor falle,
      // siempre eliminamos la sesión local.
      limpiarSesion();

      irLogin();

    }

  }

  return (

    <Tabs

      initialRouteName="inicio"

      screenOptions={{

        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,

        tabBarInactiveTintColor:
          COLORS.textSecondary,

        tabBarStyle: {

          height: 65,

          paddingBottom: 8,

          paddingTop: 8,

        },

      }}

    >

      <Tabs.Screen

        name="inicio"

        options={{

          title: "Inicio",

          tabBarIcon: ({ focused }) => (

            <Icon

              icon={ICONS.inicio}

              active={focused}

              size={24}

            />

          ),

        }}

      />


      <Tabs.Screen

        name="logo"

        options={{

          title: "",

          tabBarButton: () => (

            <View

              style={{

                flex: 1,

                justifyContent: "center",

                alignItems: "center",

              }}

            >

              <Image
  source={require("../../assets/mini-logo.svg")}
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


      <Tabs.Screen

        name="logout"

        options={{

          title: "Cerrar sesión",

          tabBarButton: () => (

            <Pressable

              onPress={cerrarSesion}

              style={{

                flex: 1,

                justifyContent: "center",

                alignItems: "center",

              }}

            >

              <Icon

                icon={{

                  black: ICONS.logout,

                }}

                size={24}

              />

            </Pressable>

          ),

        }}

      />


      <Tabs.Screen

        name="materia"

        options={{

          href: null,

        }}

      />

    </Tabs>

  );

}