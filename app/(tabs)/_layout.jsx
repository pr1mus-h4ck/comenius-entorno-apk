import { Tabs } from "expo-router";

import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import Icon from "../components/Icon";

import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";

import { useSessionService } from "../services/session-service";
import { irLogin } from "../services/navigation-service";

import {
  cerrarSesion as cerrarSesionApi,
} from "../services/auth-service";


export default function TabsLayout() {

  const {
    session,
    limpiarSesion,
  } = useSessionService();


  async function cerrarSesion() {

    try {

      await cerrarSesionApi(
        session.usuarioID,
        session.sessionID
      );

    } catch (error) {

      console.log(
        "Error cerrando sesión en backend:",
        error
      );

    } finally {

      // Siempre limpiar sesión local
      limpiarSesion();

      // Volver al login
      irLogin();

    }

  }


  return (

    <Tabs

      initialRouteName="inicio"

      screenOptions={{

        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,

        tabBarInactiveTintColor: COLORS.textSecondary,

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

                source={ICONS.logo}

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

              <Image

                source={ICONS.logout}

                style={{

                  width: 24,

                  height: 24,

                }}

                contentFit="contain"

              />

              <Text

                style={{

                  fontSize: 11,

                  color: COLORS.textSecondary,

                  marginTop: 2,

                }}

              >

                Cerrar sesión

              </Text>

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