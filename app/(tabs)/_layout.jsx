import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { Alert, Pressable, View, Platform } from "react-native";

import Icon from "../components/Icon";

import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";

import { cerrarSesion as cerrarSesionApi } from "../services/auth-service";
import { irLogin } from "../services/navigation-service";
import { useSessionService } from "../services/session-service";
import BottomMenu from "../components/BottomMenu";

export default function TabsLayout() {

  const { session, limpiarSesion } = useSessionService();

function cerrarSesion() {
  if (Platform.OS === "web") {
    const confirmar = window.confirm(
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
        onPress: ejecutarCerrarSesion,
      },
    ]
  );
}

async function ejecutarCerrarSesion() {
  try {
    const respuesta = await cerrarSesionApi(
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

              active={false}

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

    </Tabs>

  );

}