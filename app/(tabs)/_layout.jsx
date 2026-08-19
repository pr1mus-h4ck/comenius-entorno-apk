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


export default function TabsLayout() {

  const { limpiarSesion } = useSessionService();


  // ==========================================
  // CERRAR SESIÓN
  // ==========================================

  function cerrarSesion() {

    // Elimina todos los datos de la sesión
    limpiarSesion();

    // Vuelve al Login
    irLogin();

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

      {/* ======================================
          INICIO
      ====================================== */}

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


      {/* ======================================
          LOGO CENTRAL
      ====================================== */}

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

                source={require("../../assets/pre-logo.svg")}

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


      {/* ======================================
          CERRAR SESIÓN
      ====================================== */}

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

              <Text

                style={{

                  fontSize: 22,

                }}

              >

                🚪

              </Text>

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


      {/* ======================================
          MATERIA
          No aparece en el menú.
          Se accede mediante irMateria().
      ====================================== */}

      <Tabs.Screen

        name="materia"

        options={{

          href: null,

        }}

      />

    </Tabs>

  );

}