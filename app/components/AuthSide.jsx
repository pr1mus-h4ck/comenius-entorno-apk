import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";
import { SPACING } from "../constants/spacing";
import { RADIUS } from "../constants/radius";

export default function AuthSide({

  title,

  subtitle,

  buttonText,

  onPress,

}) {

  return (

    <View style={styles.container}>

      {/* Después pondremos el logo */}

      <View style={styles.logoContainer}>

        {/* Logo Comenius */}

        </View>

      <Text style={styles.title}>

        {title}

      </Text>

      <Text style={styles.subtitle}>

        {subtitle}

      </Text>

      <Pressable

        style={styles.button}

        onPress={onPress}

      >

        <Text style={styles.buttonText}>

          {buttonText}

        </Text>

      </Pressable>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

  },

  logoContainer: {

  height: 90,

  justifyContent: "center",

  alignItems: "center",

  marginBottom: SPACING.xl,

},

  title: {

    fontSize: TYPOGRAPHY.h2,

    fontWeight: "bold",

    color: COLORS.white,

    textAlign: "center",

    marginBottom: SPACING.sm,

  },

  subtitle: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.white,

    textAlign: "center",

    marginBottom: SPACING.xxl,

  },

  button: {

    borderWidth: 1,

    borderColor: COLORS.white,

    borderRadius: RADIUS.md,

    paddingVertical: SPACING.sm,

    paddingHorizontal: 40,

  },

  buttonText: {

    color: COLORS.white,

    fontWeight: "bold",

  },

});