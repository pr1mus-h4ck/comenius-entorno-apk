import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import {
  COLORS,
} from "../constants/colors";

import {
  RADIUS,
} from "../constants/radius";

import {
  SPACING,
} from "../constants/spacing";

import {
  TYPOGRAPHY,
} from "../constants/typography";


export default function Button({
  title,
  onPress,
  style,
  disabled = false,
}) {

  return (

    <Pressable

      style={({ pressed }) => [

        styles.button,

        style,

        disabled &&
          styles.buttonDisabled,

        pressed &&
          !disabled &&
          styles.buttonPressed,

      ]}

      onPress={onPress}

      disabled={disabled}

    >

      <Text style={styles.text}>

        {title}

      </Text>

    </Pressable>

  );

}


const styles = StyleSheet.create({

  button: {

    width: "100%",

    minHeight: 42,

    backgroundColor:
      COLORS.primary,

    borderRadius:
      RADIUS.md,

    alignItems:
      "center",

    justifyContent:
      "center",

    paddingVertical:
      SPACING.sm,

  },


  buttonDisabled: {

    opacity: 0.6,

  },


  buttonPressed: {

    opacity: 0.75,

    transform: [
      {
        scale: 0.98,
      },
    ],

  },


  text: {

    color:
      COLORS.white,

    fontSize:
      TYPOGRAPHY.small,

    fontWeight:
      "bold",

  },

});