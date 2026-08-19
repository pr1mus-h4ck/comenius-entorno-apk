import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import { COLORS } from "../constants/colors";
import { RADIUS } from "../constants/radius";

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

        <ScrollView
          style={styles.right}
          contentContainerStyle={styles.rightContent}
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

    backgroundColor: COLORS.background,

  },

  card: {

    flex: 1,

    width: "100%",

    backgroundColor: COLORS.white,

    overflow: "hidden",

  },

  left: {

    width: "100%",

    backgroundColor: COLORS.primary,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 25,

    paddingVertical: 35,

    borderBottomLeftRadius: 75,

    borderBottomRightRadius: 75,

  },

  right: {

    flex: 1,

    width: "100%",

    backgroundColor: COLORS.white,

  },

  rightContent: {

    flexGrow: 1,

    justifyContent: "flex-start",

    paddingHorizontal: 22,

    paddingVertical: 50,

  },

});