import { StyleSheet, TextInput } from "react-native";

import { COLORS } from "../constants/colors";
import { RADIUS } from "../constants/radius";
import { SPACING } from "../constants/spacing";
import { TYPOGRAPHY } from "../constants/typography";

export default function Input({

  value,

  onChangeText,

  placeholder,

  secureTextEntry = false,

  keyboardType = "default",

  autoCapitalize = "none",

  style,

  ...props

}) {

  return (

    <TextInput

      value={value}

      onChangeText={onChangeText}

      placeholder={placeholder}

      placeholderTextColor={COLORS.textSecondary}

      secureTextEntry={secureTextEntry}

      keyboardType={keyboardType}

      autoCapitalize={autoCapitalize}

      style={[styles.input, style]}

      {...props}

    />

  );

}

const styles = StyleSheet.create({

  input: {

    width: "100%",

    backgroundColor: COLORS.white,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: RADIUS.md,

    paddingVertical: SPACING.md,

    paddingHorizontal: SPACING.md,

    marginBottom: SPACING.md,

    color: COLORS.text,

    fontSize: TYPOGRAPHY.body,

  },

});