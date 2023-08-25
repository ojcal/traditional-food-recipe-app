import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/* This component has the logic of displaying Buttons of the SingleRecipeScreen's top-right header
 */
function HeaderButton({ iconName, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "red", borderless: true, radius: 25 }}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={35}
        color={color}
        style={styles.iconStyle}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    marginHorizontal: 3,
  },
});

export default HeaderButton;
