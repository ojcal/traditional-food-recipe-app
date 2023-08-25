import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import { useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import SingleRecipeCard from "../components/SingleRecipeCard";
import ImageBackgroundForScreens from "../components/ImageBackgroundForScreens";
import { HARDCODEDRECIPES } from "../data/hardcodedRecipeData";

/* Recipes of one single category (e.g., Meat) are displayed here
    The user ends up in the screen after tapping "See All" button of ".this" category in the RecipesScreen
    Correct category is found by utilizing React Navigation's route.params 
*/
const SingleCategoryScreen = () => {
  const route = useRoute();
  const { categoryName, iconName } = route.params;

  const navigation = useNavigation();

  const iconSize = deviceWidth > 650 ? 44 : 35;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => (
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name={iconName}
            size={iconSize}
            style={styles.icon}
          />
          <Text style={styles.title}>{categoryName}</Text>
        </View>
      ),
    });
  }, [navigation, categoryName, iconName]);

  // Tapping single meal card takes the user to SingleRecipeScreen
  function mealCardHandler(id) {
    navigation.navigate("SingleRecipeScreen", {
      id: id,
    });
  }

  // finding recipes that belong to the category we display
  const recipesOfThisCategory = HARDCODEDRECIPES.filter((recipe) =>
    recipe.categoryNames.includes(categoryName)
  );

  return (
    <ImageBackgroundForScreens>
      <View style={styles.container}>
        <FlatList
          data={recipesOfThisCategory}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => mealCardHandler(item.id)}>
              <View>
                <SingleRecipeCard {...item} />
              </View>
            </Pressable>
          )}
        />
      </View>
    </ImageBackgroundForScreens>
  );
};

export default SingleCategoryScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
  },
  title: {
    fontSize: deviceWidth > 650 ? 30 : 22,
  },
  icon: {
    marginRight: 7,
  },
});
