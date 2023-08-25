import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions
} from "react-native";
import HorizontalCategoryList from "./HorizontalCategoryList";
import { HARDCODEDCATEGORIES } from "../data/hardcodedRecipeData";
import { useNavigation } from "@react-navigation/native";

/* 
This component renders all the recipe categories 
    Every recipe of a certain category is on a FlatList that can be scrolled horizontally (= see HorizontalCategoryList component)
*/

const CategoriesList = () => {
  const navigation = useNavigation();
  function seeAllHandler(id, name, iconName) {
    navigation.navigate("SingleCategoryScreen", {
      // categoryId: id,
      categoryName: name,
      iconName: iconName,
    });
  }

  return (
      <View style={styles.container}>
        {HARDCODEDCATEGORIES.map((item) => (
          <View key={item.id}>
            <View style={styles.categoryTitleContainer}>
              <Text style={styles.categoryTitle}>{item.name}</Text>
              <Pressable
                onPress={() => seeAllHandler(item.id, item.name, item.iconName)}
              >
                <Text style={styles.showAllText}>Näytä kaikki &gt;</Text>
              </Pressable>
            </View>
            <HorizontalCategoryList name={item.name} />
          </View>
        ))}
      </View>
  );
};

export default CategoriesList;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
  },
  categoryTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginRight: 20,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: deviceWidth > 650 ? 23 : 18,
    fontWeight: "bold",
    textAlignVertical: "bottom",
    // fontFamily: "noto-serif-bold",
  },
  showAllText: {
    fontSize: deviceWidth > 650 ? 18 : 15,
    fontWeight: "bold",
    // fontFamily: "noto-serif-bold",
    paddingHorizontal: 5,
    textAlign: "center",
    textAlignVertical: "bottom",
  },
});
