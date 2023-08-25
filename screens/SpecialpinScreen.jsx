import { View, Text, StyleSheet, Image, ScrollView, Share } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderButton from "../components/HeaderButton";
import { HARDCODEDSPECIALPINS } from "../data/hardcodedSpecialpinsData";
import ImageBackgroundForScreens from "../components/ImageBackgroundForScreens";

/*  This screen displays a special pin
        The user can end up here from map view, when cliking the special pin on the map, and then clicking the opened card.
        After we get the special pin id, we can use that to get the rest information (name, description etc.) easily by filterin hardcoded special pins
  */
const SpecialpinScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { id } = route.params;

  // Find special pin from the hardcoded data using the id we get through route.params.
  // Using this combination, we don't have to list a ton of route params in other screen which reduces the amount of code written a lot
  // In the future, this needs to happen from database using async function
  const singleSP = HARDCODEDSPECIALPINS.find(
    (specialpin) => specialpin.id === id
  );

  // Using object destucturing for single special pin properties so we don't have to use singleRecipe.name, singleRecipe.steps and so forth
  const {
    name, // string
    locationName, // string
    latlng, // object with lat and long coords ("double")
    description, // string
    imageURL, // string
  } = singleSP;

  // This does not do anything fancy at the moment
  function onSharePress() {
    Share.share({
      message: `Katso siisti paikka ${name} sovelluksessa RössyApp`,
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerIconsContainer}>
          <View style={[styles.iconContainer, { marginRight: 20 }]}>
            <HeaderButton
              iconName="share-variant"
              color="#0b205d"
              onPress={onSharePress}
            />
          </View>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <ImageBackgroundForScreens opacity={0.25}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 75 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageURL }} style={styles.image} />
        </View>

        <Text style={styles.recipeNameText}>{name}</Text>
        <View style={styles.ingredientsContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </ScrollView>
    </ImageBackgroundForScreens>
  );
};

export default SpecialpinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIconsContainer: {
    flexDirection: "row",
    marginRight: 0,
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 3,
  },
  icon: {
    marginLeft: 10,
  },
  imageContainer: {
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
    marginHorizontal: 5,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  recipeNameText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  locationNameText: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  specialDietsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  specialDietText: {
    fontSize: 14,
    textAlign: "center",
    // fontFamily: "noto-serif",
  },
  additionalInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    paddingBottom: 13,
  },
  line: {
    alignSelf: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "#868484",
    width: "85%",
  },
  descriptionText: {
    fontSize: 16,
    alignSelf: "center",
    paddingVertical: 10,
    width: "88%",
    fontFamily: "noto-serif",
  },
  additionalInfoText: {
    marginLeft: 3,
    fontSize: 17,
    textAlignVertical: "center",
  },
  ingredientsContainer: {
    flexDirection: "column",
    marginTop: 8,
    marginBottom: 10,
  },
  ingredientsAndStepsTitle: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    marginVertical: 4,
  },
  ingredient: {
    marginLeft: 30,
    marginVertical: 5,
    fontSize: 17,
    fontFamily: "noto-serif",
  },
  stepsList: {
    marginLeft: 12,
  },
});
