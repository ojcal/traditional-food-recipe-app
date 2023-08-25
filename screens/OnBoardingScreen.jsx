import { StyleSheet, Text, Image, Modal, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Onboarding from "react-native-onboarding-swiper";

import GlobalColors from "../styles/globalColors";
import { CarouselGif, RemoveFavGif } from "../components/OnBoardingGifs";

/* This screen will be shown when our app is opened for the first time 
    It is easy to customize this screen, you can change images, background color and text.
      For more information about this Onboarding screen's features, see https://github.com/jfilter/react-native-onboarding-swiper
   Note that modal is used here so that MapScreen and bottom tab navigation are loaded on the background
      Previously when there was no modal in use, a splash screen flashed after for a blink of an eye after completing onboardingscreen   
   This screen can also be reaccessed from the settings screen if the user want's to revisit it, hence the secondTimeHandler function  
*/
const OnBoardingScreen = ({ firstTime, modalShown, route }) => {
  const [modalVisible, setModalVisible] = useState(modalShown);

  // only assign fromScreen if route is not null because it IS null if the user launches the app for the first time
  const fromScreen = route?.params?.fromScreen;

  let navigation = null;

  function Next({ ...props }) {
    return (
      <Pressable {...props} style={styles.pressableStyle}>
        <Text style={styles.textStyle}>Seuraava</Text>
      </Pressable>
    );
  }

  function Skip({ ...props }) {
    return (
      <Pressable
        {...props}
        style={[styles.pressableStyle, { paddingLeft: 4, paddingRight: 10 }]}
      >
        <Text style={styles.textStyle}>Ohita</Text>
      </Pressable>
    );
  }

  function Done({ ...props }) {
    return (
      <Pressable {...props} style={styles.pressableStyle}>
        <Text style={styles.textStyle}>Valamis!</Text>
      </Pressable>
    );
  }

  function firstTimeHandler() {
    setModalVisible(false);
    firstTime();
  }

  // If fromScreen is truthy (= the user navigates to this screen from settings, reassign navigation that is declared null on line 21 to useNavigation)
  if (fromScreen) {
    navigation = useNavigation();
  }

  function secondTimeHandler() {
    setModalVisible(false);
    navigation.goBack();
  }

  return (
    <>
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          statusBarTranslucent={true}
          useNativeDriver
          onRequestClose={
            firstTime ? () => firstTimeHandler() : () => secondTimeHandler()
          }
        >
          <Onboarding
            onDone={
              firstTime ? () => firstTimeHandler() : () => secondTimeHandler()
            }
            onSkip={
              firstTime ? () => firstTimeHandler() : () => secondTimeHandler()
            }
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            subTitleStyles={{ fontSize: 17, marginHorizontal: 10 }}
            titleStyles={{ marginTop: 1 }}
            imageContainerStyles={{ paddingBottom: 30 }}
            transitionAnimationDuration={800}
            pages={[
              {
                backgroundColor: "#cfac4c",
                image: (
                  <Image
                    source={require("../assets/images/onboarding/oulurotisseurs.png")}
                    style={{ width: 250, height: 76 }}
                  />
                ),
                title: "Tervetuloa Rössy Appiin!",
                subtitle:
                  "Sovellus on kehitetty yhteistyössä Oulu2026:en ja Chaîne des Rôtisseurs Oulun kanssa",
                titleStyles: { color: GlobalColors.primary1 },
                subTitleStyles: { color: GlobalColors.primary1 },
              },
              {
                backgroundColor: "#f46e51",
                image: (
                  <Image
                    style={{ width: 160, height: 134 }}
                    source={require("../assets/images/onboarding/onboardingmap.png")}
                  />
                ),
                title: "Interaktiivinen kartta",
                subtitle:
                  "Etsi kartalta perinneruokareseptejä ja \n mielenkiintoisia ruokatapahtumia",
              },
              {
                backgroundColor: '#cfac4c',
                image: <CarouselGif />,
                title: 'Selaa reseptejä vaivattomasti',
                subtitle: 'Karttanäkymässä voit liikkua reseptien välillä swaippaamalla!',
                
              },
              {
                backgroundColor: "#ae465f",
                image: (
                  <Image
                    style={{ width: 200, height: 170 }}
                    source={require("../assets//images/onboarding/onboardingfavorite.png")}
                  />
                ),
                title: "Tallenna reseptejä",
                subtitle:
                  "Tallenna reseptejä suosikkeihin painamalla sydäntä reseptisivulla",
              },
              {
                backgroundColor: '#cfac4c',
                image: <RemoveFavGif />,
                title: 'Suosikkien poistaminen',
                subtitle: 'Voit poistaa reseptin suosikeista swaippaamalla vasemmalle',
                
              },
              {
                backgroundColor: "#1e2063",
                image: (
                  <Image
                    style={{ width: 200, height: 188 }}
                    source={require("../assets//images/onboarding/onboardingrossyapp.png")}
                  />
                ),
                title: "Valmiina aloittamaan?",
                subtitle: "Paina Valamis ja hyppää mukaan!",
              },
            ]}
          />
        </Modal>
    </>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  pressableStyle: {
    paddingVertical: 13,
  },
  textStyle: {
    marginHorizontal: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
