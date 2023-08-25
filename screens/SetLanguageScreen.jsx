import { StyleSheet, Text, View } from "react-native";
import ImageBackgroundForScreens from "../components/ImageBackgroundForScreens";

const SetLanguageScreen = () => {
  // const [currentLanguage, setCurrentLanguage] = useState();

  return (
    <ImageBackgroundForScreens>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}
          >
            Valitse sovelluksen kieli
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.optionText}>Suomi</Text>
          <Text style={styles.optionText}>Englanti</Text>
        </View>
      </View>
    </ImageBackgroundForScreens>
  );
};

export default SetLanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 25,
  },
  optionsContainer: {
    flex: 1,
    width: "85%",
    marginHorizontal: 20,
    marginTop: 10,
  },
  optionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
