import { Tabs } from "expo-router";

import Icon from "../components/Icon";
import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";

export default function TabsLayout() {

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

        name="materia"

        options={{

          title: "Materia",

          tabBarIcon: ({ focused }) => (

            <Icon

              icon={ICONS.portada}

              active={focused}

              size={24}

            />

          ),

        }}

      />

    </Tabs>

  );

}