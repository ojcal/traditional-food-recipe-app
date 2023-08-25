import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


/* 
This component is used only in SettingScreen
*/
const SettingsOptionComponent = ({ iconName, textContent, value }) => {

    const navigation = useNavigation();

    function handlePress(textContent) {
        
        if (textContent === 'Kieli') {
             navigation.navigate("SetLanguageScreen", {
               currentLanguage: value,
             });
        } else if (textContent === 'Fonttikoko') {
            console.log(`Pressed btn fonttikoko`);
        } else if (textContent === 'Tietoa sovelluksesta') {
            console.log(`Pressed btn tietoa sovelluksesta`);
        } else {
          navigation.navigate("OnBoardingScreen", {fromScreen: 'SettingsScreen'});
        }
    }

  return (
    <Pressable
      onPress={() => handlePress(textContent)}
      style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1}]}
    >
      <View style={styles.contentContainer}>
        <Ionicons name={iconName} size={35} style={styles.iconStyle} />
        <Text style={styles.textContentStyle}>{textContent}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.arrowText}>&gt;</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SettingsOptionComponent;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
    width: "90%",
  },
  iconStyle: {
    paddingLeft: 11,
  },
  textContentStyle: {
    fontSize: 19,
    fontWeight: "bold",
    paddingVertical: 15,
    marginLeft: 16,
  },
  valueContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 15,
  },
  valueText: {
    fontSize: 20,
    marginRight: 12,
    fontWeight: "bold",
    color: "grey",
  },
  arrowText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "grey",
  },
});
