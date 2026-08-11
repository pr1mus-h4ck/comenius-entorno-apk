import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import { COLORS } from "../constants/colors";
import { RADIUS } from "../constants/radius";
import { SPACING } from "../constants/spacing";
import { TYPOGRAPHY } from "../constants/typography";

export default function Button({

  title,

  onPress,

  disabled = false,

  style,

  textStyle,

}) {

  return (

    <Pressable

      disabled={disabled}

      onPress={onPress}

      style={({ pressed }) => [

        styles.button,

        pressed && styles.buttonPressed,

        disabled && styles.buttonDisabled,

        style,

      ]}

    >

      <Text

        style={[

          styles.text,

          textStyle,

        ]}

      >

        {title}

      </Text>

    </Pressable>

  );

}

const styles = StyleSheet.create({

  button: {

    backgroundColor: COLORS.primary,

    paddingVertical: SPACING.lg,

    paddingHorizontal: SPACING.xl,

    borderRadius: RADIUS.md,

    alignItems: "center",

    justifyContent: "center",

  },

  buttonPressed: {

    backgroundColor: COLORS.primaryDark,

  },

  buttonDisabled: {

    opacity: 0.5,

  },

  text: {

    color: COLORS.white,

    fontSize: TYPOGRAPHY.button,

    fontWeight: "bold",

  },

});