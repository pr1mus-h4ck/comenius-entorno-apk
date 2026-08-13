import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import { Image } from "expo-image";

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

  const { width } = useWindowDimensions();

  const esMovil = width < 700;

  return (
    <View
      style={[
        styles.container,
        esMovil && styles.containerMovil,
      ]}
    >

      <Image
        source={require("../../assets/pre-logo.svg")}
        style={[
          styles.logo,
          esMovil && styles.logoMovil,
        ]}
        contentFit="contain"
      />

      <Text
        style={[
          styles.title,
          esMovil && styles.titleMovil,
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.subtitle,
          esMovil && styles.subtitleMovil,
        ]}
      >
        {subtitle}
      </Text>

      <Pressable
        style={[
          styles.button,
          esMovil && styles.buttonMovil,
        ]}
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

    width: "100%",
  },

  containerMovil: {
    flex: 0,

    justifyContent: "center",
  },

  logo: {
    width: 100,
    height: 100,

    marginBottom: SPACING.md,
  },

  logoMovil: {
    width: 90,
    height: 90,

    marginBottom: SPACING.sm,
  },

  title: {
    fontSize: TYPOGRAPHY.h2,

    fontWeight: "bold",

    color: COLORS.white,

    textAlign: "center",

    marginBottom: SPACING.xs,
  },

  titleMovil: {
    fontSize: 22,

    marginBottom: 2,
  },

  subtitle: {
    fontSize: TYPOGRAPHY.body,

    color: COLORS.white,

    textAlign: "center",

    marginBottom: SPACING.xxl,
  },

  subtitleMovil: {
    fontSize: 16,

    marginBottom: SPACING.md,
  },

  button: {
    borderWidth: 1,

    borderColor: COLORS.white,

    borderRadius: RADIUS.md,

    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,

    alignItems: "center",
  },

  buttonMovil: {
    paddingVertical: 10,

    paddingHorizontal: 35,

    minWidth: 150,
  },

  buttonText: {
    color: COLORS.white,

    fontWeight: "bold",

    fontSize: TYPOGRAPHY.body,
  },

});