import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState, useRef, useCallback } from "react";
import CategoriesList from "../components/CategoriesList";
import SingleRecipeCard from "../components/SingleRecipeCard";
import { HARDCODEDRECIPES } from "../data/hardcodedRecipeData";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import GlobalColors from "../styles/globalColors";
import ImageBackgroundForScreens from "../components/ImageBackgroundForScreens";

/* This screen displays different information depending on the users action (see the terniary operators) 
  1. By default All recipe divided into categories are shown (when searchQueryText is 0)
  2. If the user searches for a recipe using textbox, single recipe cards found by our search algo are shown
  3. If user search founds no recipes (filteredRecipes.length === 0), empty place is shown
*/

const RecipesScreen = () => {
  const navigation = useNavigation();
  const textinputRef = useRef();

  // useEffect(() => {
  //   textinputRef.current.focus();
  // }, []);

  const [searchQueryText, setSearchQueryText] = useState("");

  function searchItemPressHandler(id) {
    navigation.navigate("SingleRecipeScreen", {
      id: id,
    });
  }

  // This filter method is the search algorithm of our recipe search
  // For now, it can find recipes based on their title, "hometown", categories, and special diets
  // This algo may have to be optimized if the number of recipes increase, but a modern smartphone can probably handle easily 200 recipes
  let filteredRecipes = [];

  if (searchQueryText !== "") {
    const searchQueryTextLower = searchQueryText.toLowerCase();
    filteredRecipes = HARDCODEDRECIPES.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchQueryTextLower) ||
        recipe.locationName.toLowerCase().includes(searchQueryTextLower) ||
        recipe.categoryNames.some((categoryName) =>
          categoryName.toLowerCase().includes(searchQueryTextLower)
        ) ||
        recipe.specialDiets.some((specialDiet) =>
          specialDiet.toLowerCase().includes(searchQueryTextLower)
        )
    );
  }

 const recipeSearchHandler = useCallback((textInput) => {
   setSearchQueryText(textInput);
 }, []);

 const cancelButtonHandler = useCallback(() => {
   setSearchQueryText("");
 }, []);

  // This function focuses the search input if the user scrolls to the top of the page
  // As you can see, it is commented out but you may want to use if you prefer so
  // const handleScroll = (event) => {
  //   const scrollPosition = event.nativeEvent.contentOffset.y;
  //   if (scrollPosition === 0) {
  //     textinputRef.current.focus();
  //   }
  // };

  return (
    <ImageBackgroundForScreens opacity={0.6}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        // onScroll={handleScroll}
      >
        <View style={styles.headerView}>
          <TextInput
            ref={textinputRef}
            cursorColor={GlobalColors.primary1}
            style={styles.textInput}
            value={searchQueryText}
            onChangeText={recipeSearchHandler}
            placeholder="  Etsi: 'rössypottu', 'Muhos', 'vegetaarinen'"
            placeholderTextColor={GlobalColors.primary1}
          />

          {!searchQueryText ? (
            <View
              entering={FadeIn.duration(200)}
            >
              <Ionicons
                name="search"
                size={deviceWidth > 650 ? 62 : 48}
                color={GlobalColors.primary1}
                style={styles.iconStyle}
              />
            </View>
          ) : (
            <Animated.View entering={FadeIn.duration(400)}>
              <Pressable
                onPress={cancelButtonHandler}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Ionicons
                  name="ios-close"
                  size={deviceWidth > 650 ? 62 : 48.5}
                  color={GlobalColors.primary1}
                  style={styles.iconStyle}
                />
              </Pressable>
            </Animated.View>
          )}
        </View>

        {searchQueryText.length === 0 ? (
          <Animated.View
            style={styles.categoriesListContainer}
            entering={FadeIn.duration(250)}
            // exiting={FadeOut.duration(500)}
          >
            <CategoriesList />
          </Animated.View>
        ) : filteredRecipes.length === 0 ? (
          <View style={styles.noResultsView}>
            <Image
              source={require("../assets/images/nofoodsfound.png")}
              style={{ width: 150, height: 113 }}
            />
            <Text style={styles.noResultsText}>
              Ei reseptejä. Kokeile toista hakusanaa!
            </Text>
          </View>
        ) : (
          <View style={{ flex: 1, marginTop: 15 }}>
            {filteredRecipes.map((item) => (
              <Animated.View
                key={item.id}
                entering={FadeIn.duration(300)}
                // exiting={FadeOut.duration(300)}
              >
                <Pressable
                  key={item.id}
                  onPress={() => searchItemPressHandler(item.id)}
                >
                  <SingleRecipeCard {...item} />
                </Pressable>
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>
    </ImageBackgroundForScreens>
  );
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flexDirection: "row",
    flex: 1,
    marginTop: 3,
    justifyContent: "center",
  },
  categoriesListContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 15,
  },
  textInput: {
    height: deviceWidth > 650 ? 70 : 55,
    width: deviceWidth > 650 ? 450 : "82%",
    paddingLeft: 25,
    borderWidth: 1.5,
    borderRightWidth: 0,
    borderColor: GlobalColors.primary1,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    fontSize: deviceWidth > 650 ? 18 : 16,
  },
  iconStyle: {
    borderWidth: 1.5,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: GlobalColors.primary1,
    backgroundColor: GlobalColors.secondary1,
  },
  noResultsView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 175,
  },
  noResultsText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default RecipesScreen;
