import {
  View,
  Text,
  Pressable,
  StyleSheet,
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

  return (

    <View style={styles.container}>

      <Image

        source={require("../../assets/pre-logo.svg")}

        style={styles.logo}

        contentFit="contain"

      />


      {title ? (

        <Text style={styles.title}>

          {title}

        </Text>

      ) : null}


      {subtitle ? (

        <Text style={styles.subtitle}>

          {subtitle}

        </Text>

      ) : null}


      {buttonText ? (

        <Pressable

          style={styles.button}

          onPress={onPress}

        >

          <Text style={styles.buttonText}>

            {buttonText}

          </Text>

        </Pressable>

      ) : null}

    </View>

  );
}


const styles = StyleSheet.create({

  container: {

    justifyContent: "center",

    alignItems: "center",

    width: "100%",

  },

  logo: {

    width: 90,

    height: 90,

    marginBottom: SPACING.sm,

  },

  title: {

    fontSize: 22,

    fontWeight: "bold",

    color: COLORS.white,

    textAlign: "center",

    marginBottom: 2,

  },

  subtitle: {

    fontSize: 16,

    color: COLORS.white,

    textAlign: "center",

    marginBottom: SPACING.md,

  },

  button: {

    borderWidth: 1,

    borderColor: COLORS.white,

    borderRadius: RADIUS.md,

    paddingVertical: 10,

    paddingHorizontal: 35,

    minWidth: 150,

    alignItems: "center",

  },

  buttonText: {

    color: COLORS.white,

    fontWeight: "bold",

    fontSize: TYPOGRAPHY.body,

  },

});