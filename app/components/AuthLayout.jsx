import { View, StyleSheet } from "react-native";

import { COLORS } from "../constants/colors";
import { RADIUS } from "../constants/radius";
import { SPACING } from "../constants/spacing";

export default function AuthLayout({

  left,

  children,

}) {

  return (

    <View style={styles.container}>

      <View style={styles.card}>

        <View style={styles.left}>

          {left}

        </View>

        <View style={styles.right}>

          {children}

        </View>

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

    padding: SPACING.xxl,

  },

  card: {

    width: "100%",

    maxWidth: 900,

    minHeight: 520,

    flexDirection: "row",

    backgroundColor: COLORS.card,

    borderRadius: RADIUS.xl,

    overflow: "hidden",

  },

  left: {

    width: "42%",

    backgroundColor: COLORS.primary,

    justifyContent: "center",

    alignItems: "center",

    padding: SPACING.xxl,

  },

  right: {

    flex: 1,

    justifyContent: "center",

    paddingHorizontal: SPACING.xxl,

    paddingVertical: SPACING.xxl,

  },

});