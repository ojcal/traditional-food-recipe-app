import { StyleSheet, Text, View, Image } from "react-native";
import SettingsOptionComponent from "../components/SettingsOptionComponent";
import ImageBackgroundForScreens from "../components/ImageBackgroundForScreens";

/* Settings are supposed to be in this screen file.
  Here use can set the language of the app and increase text size. However, at the moment, these things are not possible
*/

const SettingsScreen = () => {
  return (
    <ImageBackgroundForScreens>
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <SettingsOptionComponent
            iconName={"language"}
            textContent={"Kieli"}
            value={"Suomi"}
          />
          <SettingsOptionComponent
            iconName={"text"}
            textContent={"Fonttikoko"}
            value={"Normaali"}
          />
          <SettingsOptionComponent
            iconName={"help"}
            textContent={"Tietoa sovelluksesta"}
          />
          <SettingsOptionComponent
            iconName={"information"}
            textContent={"Sovelluksen esittely"}
          />
        </View>

        <View style={styles.bottomImagesContainer}>
          <Image
            style={styles.imageStyle}
            source={require("")}
          />
        </View>
      </View>
    </ImageBackgroundForScreens>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
  },
  optionsContainer: {
    marginTop: 35,
    alignItems: "center",
  },
  imageStyle: {
    width: 200,
    height: 60,
  },
  bottomImagesContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default SettingsScreen;
