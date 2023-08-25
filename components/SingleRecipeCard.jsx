import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/*  This component is used at various place at the moment:
    1. SingleCategoryScreen
    2. After finding search items in RecipesScreen
    3. FavoritesScreen (if there are recipes added to favorites)
*/
const SingleRecipeCard = ({
  id,
  name,
  alternativeName,
  imageUrl,
  specialDiets,
  duration,
  difficulty,
  pricePerPortion,
  steps,
  color = "transparent",
}) => {
  const iconSize = deviceWidth > 650 ? 32 : 24;

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.recipeTitle}>{name}</Text>
        <View style={styles.specialDietsAndDurationContainer}>
          <View style={styles.specialDietsContainer}>
            {specialDiets.map((specialDiet) => (
              <Text key={specialDiet} style={styles.specialDietText}>
                {specialDiet}
              </Text>
            ))}
          </View>
          <View style={styles.durationAndOthersContainer}>
            <Ionicons name="time" size={iconSize} color="black" />
            <Text style={styles.durationAndDifficultyText}>{duration}</Text>
            <MaterialCommunityIcons
              name="chef-hat"
              size={iconSize}
              color="black"
              style={{ marginTop: 15 }}
            />
            <Text style={styles.durationAndDifficultyText}>{difficulty}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SingleRecipeCard;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "93%",
    alignSelf: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    marginBottom: 15,
  },
  imageContainer: {
    padding: 10,
  },
  detailsContainer: {
    flexDirection: "column",
    flexShrink: 1,
    width: "100%",
  },
  specialDietsAndDurationContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  specialDietsContainer: {
    marginRight: 15,
    flexDirection: "column",
    justifyContent: "center",
  },
  durationAndOthersContainer: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  image: {
    height: deviceWidth > 650 ? 220 : 150,
    width: deviceWidth > 650 ? 350 : 170,
    borderRadius: 3,
  },
  recipeTitle: {
    marginTop: 10,
    fontSize: deviceWidth > 650 ? 27 : 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  specialDietText: {
    borderWidth: 1,
    borderColor: "#e7e4e4",
    borderRadius: 6,
    padding: 2,
    marginVertical: 3,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#e7e4e4",
    fontSize: deviceWidth > 650 ? 23 : 14,
  },
  durationAndDifficultyText: {
    fontSize: deviceWidth > 650 ? 23 : 14,
    textAlignVertical: "center",
  },
});
