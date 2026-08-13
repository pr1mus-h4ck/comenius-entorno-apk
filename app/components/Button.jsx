import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { COLORS } from "../constants/colors";
import { RADIUS } from "../constants/radius";
import { SPACING } from "../constants/spacing";
import { TYPOGRAPHY } from "../constants/typography";

export default function Button({
  title,
  onPress,
  style,
}) {

  return (
    <Pressable
      style={[
        styles.button,
        style,
      ]}
      onPress={onPress}
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

    backgroundColor: COLORS.primary,

    borderRadius: RADIUS.md,

    alignItems: "center",
    justifyContent: "center",

    paddingVertical: SPACING.sm,
  },

  text: {
    color: COLORS.white,

    fontSize: TYPOGRAPHY.small,

    fontWeight: "bold",
  },

});