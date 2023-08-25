import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid,
  Alert,
  Share,
  Dimensions
} from "react-native";
import { useLayoutEffect, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { FavoritesContext } from "../context/FavoriteContextProvider";
import { HARDCODEDRECIPES } from "../data/hardcodedRecipeData";
import HeaderButton from "../components/HeaderButton";
import RecipeStepPressable from "../components/RecipeStepPressable";
import GlobalColors from "../styles/globalColors";
import ImageBackgroundForScreens from "../components/ImageBackgroundForScreens";

/*  This screen displays a single recipe
      The user can end up here from multiple places which pass the recipe id here through route.params
        After we get the recipe id, we can use that to get the rest recipe information (name, ingredients etc.) easily by filterin hardcoded recipedata
*/
const SingleRecipeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { id } = route.params;

  // Find recipe from the hardcoded data using the id we get through route.params.
  // Using this combination, we don't have to list a ton of route params in other screen which reduces the amount of code written a lot
  // In the future, this needs to happen from database using async function
  const singleRecipe = HARDCODEDRECIPES.find((recipe) => recipe.id === id);

  // Using object destucturing for singleRecipe properties so we don't have to use singleRecipe.name, singleRecipe.steps and so forth
  // alternativename, categorynames and description are not used at the moment (12th of March, 2023)
  const {
    name,
    alternativeName,
    locationName,
    categoryNames,
    specialDiets,
    description,
    numberOfPortions,
    pricePerPortion,
    difficulty,
    duration,
    imageUrl,
    ingredients,
  } = singleRecipe;

  const favoriteMealContext = useContext(FavoritesContext);
  const isAlreadyFavorite = favoriteMealContext.ids.includes(id);

  // This does not do anything fancy at the moment
  function onSharePress() {
    Share.share({
      message: `Katso resepti ${name} sovelluksessa RössyApp`,
    });
  }

  function favoriteButtonHandler() {
    if (isAlreadyFavorite) {
      Alert.alert(
        "Suosikeista poistaminen",
        `Haluatko varmasti poistaa reseptin ${name} suosikeista?`,
        [
          {
            text: "Ei",
            style: "cancel",
          },
          {
            text: "Kyllä",
            onPress: () => {
              favoriteMealContext.removeFromFavorites(id);
              ToastAndroid.show(
                `${name} poistettu suosikeista!`,
                ToastAndroid.LONG
              );
            },
          },
        ]
      );
    } else {
      favoriteMealContext.addToFavorites(id);
      ToastAndroid.show(`${name} lisätty suosikkeihin!`, ToastAndroid.LONG);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerIconsContainer}>
          <View style={[styles.iconContainer, { marginRight: 20 }]}>
            <HeaderButton
              iconName="share-variant"
              color={GlobalColors.primary1}
              onPress={onSharePress}
            />
          </View>
          <View style={[styles.iconContainer]}>
            <HeaderButton
              iconName={
                !isAlreadyFavorite ? "cards-heart-outline" : "cards-heart"
              }
              color={GlobalColors.primary1}
              onPress={favoriteButtonHandler}
            />
          </View>
        </View>
      ),
    });
  }, [navigation, favoriteButtonHandler]);

  return (
    <ImageBackgroundForScreens opacity={0.25}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 75 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <Text style={styles.recipeNameText}>{name}</Text>
        <Text style={styles.locationNameText}>{locationName}</Text>
        <View style={styles.specialDietsContainer}>
          {specialDiets.map((specialDiet, index) => (
            <Text key={index} style={styles.specialDietText}>
              {`${specialDiet}  `}
            </Text>
          ))}
        </View>
        <View style={styles.additionalInfoContainer}>
          <Ionicons name="time" size={24} color="black" style={styles.icon} />
          <Text style={styles.additionalInfoText}>{duration}</Text>
          <Ionicons name="person" size={24} color="black" style={styles.icon} />
          <Text style={styles.additionalInfoText}>{numberOfPortions}</Text>
          <MaterialCommunityIcons
            name="chef-hat"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.additionalInfoText}>{difficulty}</Text>
          <FontAwesome
            name="euro"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.additionalInfoText}>{pricePerPortion}</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.descriptionText}>{description}</Text>
        <View style={styles.line} />
        <View style={styles.ingredientsContainer}>
          <Text style={styles.ingredientsAndStepsTitle}>Raaka-aineet</Text>
          {ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>
              {ingredient.includes(":") ? ingredient : `• ${ingredient}`}
            </Text>
          ))}
        </View>
        <View style={styles.line} />
        <View style={styles.ingredientsContainer}>
          <Text style={styles.ingredientsAndStepsTitle}>Valmistus</Text>
          <View style={styles.stepsList}>
            <RecipeStepPressable id={id} />
          </View>
        </View>
      </ScrollView>
    </ImageBackgroundForScreens>
  );
};

export default SingleRecipeScreen;

const deviceWidth = Dimensions.get("window").width;

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
    height: deviceWidth > 650 ? 450 : 250,
    borderRadius: 8,
  },
  recipeNameText: {
    fontSize: deviceWidth > 650 ? 28 : 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  locationNameText: {
    fontSize: deviceWidth > 650 ? 22 : 17,
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
    fontSize: deviceWidth > 650 ? 18 : 14,
    textAlign: "center",
    // fontFamily: "noto-serif",
  },
  additionalInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
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
    fontSize: deviceWidth > 650 ? 20 : 17,
    alignSelf: "center",
    paddingVertical: 10,
    width: "88%",
    fontFamily: "noto-serif",
  },
  additionalInfoText: {
    marginLeft: 3,
    fontSize: deviceWidth > 650 ? 18 : 17,
    textAlignVertical: "center",
  },
  ingredientsContainer: {
    flexDirection: "column",
    marginTop: 8,
    marginBottom: 10,
  },
  ingredientsAndStepsTitle: {
    fontWeight: "bold",
    fontSize: deviceWidth > 650 ? 25: 22,
    textAlign: "center",
    marginBottom: 10,
  },
  ingredient: {
    marginLeft: 30,
    marginVertical: 5,
    fontSize: deviceWidth > 650 ? 20 : 17,
    fontFamily: "noto-serif",
  },
  stepsList: {
    marginLeft: 12,
  },
});
