import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { useContext, useRef, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn } from "react-native-reanimated";
import { FavoritesContext } from "../context/FavoriteContextProvider";
import { HARDCODEDRECIPES } from "../data/hardcodedRecipeData";
import SingleRecipeCard from "../components/SingleRecipeCard";
import ImageBackgroundForScreens from "../components/ImageBackgroundForScreens";

/* This component displays fevorites. If no favorites are set, a broken heart icon with text is displayed
    At the moment, favorites do not persist betweens app openings and thus, initial state for favRecipes is an empty array
   When there are recipes, they can be removed by swiping them from right to left: thus, the favorite recipe list is a swipeable list
    We have used this library when making the swipeable list: https://github.com/jemise111/react-native-swipe-list-view
*/
const FavoritesScreen = () => {
  const navigation = useNavigation();
  const favorites = useContext(FavoritesContext);
  const [favRecipes, setFavRecipes] = useState([]);


  // useEffect is needed to rerender the swipeable list every time favorites are updated
  useEffect(() => {
    const favoriteRecipes = HARDCODEDRECIPES.filter((recipe) =>
      favorites.ids.includes(recipe.id)
    );
    setFavRecipes([...favoriteRecipes]);
  }, [favorites]);

  function favoriteItemPressHandler(id) {
    navigation.navigate("SingleRecipeScreen", {
      id: id,
    });
  }

  const animationIsRunning = useRef(false);

  // Function to handle the situation where favorite item is swiped
  function swipeRecipeHandler(swipeData) {
    const { key, value } = swipeData;

    if (
      value < -Dimensions.get("window").width &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true;
      const recipe = favRecipes.find((recipe) => recipe.id === key);
      favorites.removeFromFavorites(key);
      Alert.alert(
        "Suosikeista poistaminen",
        `Haluatko varmasti poistaa reseptin ${recipe.name} suosikeista?`,
        [
          {
            text: "Ei",
            style: "cancel",
            onPress: () => {
              favorites.addToFavorites(key);
              animationIsRunning.current = false;
            },
          },
          {
            text: "Kyllä",
            onPress: () => {
              animationIsRunning.current = false;
              ToastAndroid.show(
                `${recipe.name} poistettu suosikeista!`,
                ToastAndroid.LONG
              );
            },
          },
        ]
      );
    }
  }

  return (
    <ImageBackgroundForScreens>
      <View style={styles.container}>
        <View style={{ marginTop: 15 }}>
          {favRecipes.length === 0 ? (
            <Animated.View
              style={styles.noFavoritesContainer}
              entering={FadeIn.duration(1250)}
            >
              <Image
                source={require("../assets/images/nofavorites.png")}
                style={{ width: 128, height: 97 }}
              />
              <Text style={styles.noFavoritesText}>
                Ei vielä suosikkireseptejä.
              </Text>
              <Text style={[styles.noFavoritesText, { marginTop: 0 }]}>
                Etsi resepti ja lisää se suosikkeihin!
              </Text>
            </Animated.View>
          ) : (
            <SwipeListView
              data={favRecipes}
              disableRightSwipe
              rightOpenValue={-Dimensions.get("window").width}
              onSwipeValueChange={swipeRecipeHandler}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable onPress={() => favoriteItemPressHandler(item.id)}>
                  <SingleRecipeCard {...item} />
                </Pressable>
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={36}
                    color="black"
                  />
                </View>
              )}
            />
          )}
        </View>
      </View>
    </ImageBackgroundForScreens>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFavoritesText: {
    fontSize: 18,
    marginTop: 15,
    textAlign: "center",
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingRight: 35,
    marginLeft: '15%',
  },
});

export default FavoritesScreen;
