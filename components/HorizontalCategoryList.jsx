import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { HARDCODEDRECIPES } from "../data/hardcodedRecipeData";

/* This component displays category recipes in a horizontal-scrollable list 
  It is used inside CategoriesList component
  Tapping item (recipe) in this list navigates the user to SingleRecipeScreen
*/

const HorizontalCategoryList = ({ name }) => {
  const navigation = useNavigation();

  const filteredArray = HARDCODEDRECIPES.filter((element) =>
    element.categoryNames.includes(name)
  );

  function pressHandler(id) {
    navigation.navigate("SingleRecipeScreen", {
      id: id,
    });
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={filteredArray}
        horizontal={true}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Pressable
              onPress={() => pressHandler(item.id)}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                defaultSource={require("../assets/images/placeholder.png")}
              />
            </Pressable>
            <Text style={styles.recipeTitle}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HorizontalCategoryList;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginBottom: 15,
  },
  listItemContainer: {
    marginRight: 10,
  },
  image: {
    height: deviceWidth > 650 ? 200 : 100,
    width: deviceWidth > 650 ? 270 : 150,
    borderRadius: 6,
  },
  recipeTitle: {
    fontWeight: "bold",
    fontSize: deviceWidth > 650 ? 18 : 14,
    // fontFamily: "noto-serif-bold"
  },
});
