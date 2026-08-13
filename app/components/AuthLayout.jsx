import { View, StyleSheet, useWindowDimensions, ScrollView } from "react-native";

import { COLORS } from "../constants/colors";
import { RADIUS } from "../constants/radius";

export default function AuthLayout({
  left,
  children,
}) {

  const { width } = useWindowDimensions();

  const esMovil = width < 700;

  return (
    <View style={styles.container}>

      <View
        style={[
          styles.card,
          esMovil && styles.cardMovil,
        ]}
      >

        <View
          style={[
            styles.left,
            esMovil && styles.leftMovil,
          ]}
        >
          {left}
        </View>

        <ScrollView
          style={[
            styles.right,
            esMovil && styles.rightMovil,
          ]}
          contentContainerStyle={[
            styles.rightContent,
            esMovil && styles.rightContentMovil,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 30,
  },

  card: {
    width: "100%",
    maxWidth: 900,
    minHeight: 520,

    flexDirection: "row",

    backgroundColor: COLORS.white,

    borderRadius: RADIUS.xl,

    overflow: "hidden",
  },

  cardMovil: {
    width: "100%",
    maxWidth: 500,
    minHeight: 0,

    flexDirection: "column",

    borderRadius: RADIUS.xl,

    overflow: "hidden",
  },

  left: {
    width: "42%",

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    padding: 40,
  },

  leftMovil: {
    width: "100%",
    minHeight: 250,

    paddingHorizontal: 25,
    paddingVertical: 35,

    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 75,
  },

  right: {
    flex: 1,

    backgroundColor: COLORS.white,
  },

  rightContent: {
    flexGrow: 1,

    justifyContent: "center",

    paddingHorizontal: 50,
    paddingVertical: 40,
  },

  rightMovil: {
    width: "100%",
  },

  rightContentMovil: {
    paddingHorizontal: 22,
    paddingVertical: 50,

    justifyContent: "flex-start",
  },

});