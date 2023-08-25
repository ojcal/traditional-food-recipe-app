import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { useState } from "react";
import { HARDCODEDRECIPES } from "../data/hardcodedRecipeData";

import GlobalColors from "../styles/globalColors";

/* 
    This component is used in SingleRecipeScreen
    As it's name states, this component displays steps of the recipe in SingleRecipeScreen
    One important functionality in this code is displaying a circle with a step number next to the step text
        As additional bonus, each circle is pressable, and when a circle is pressed to mark that the recipe step is "done", it color changes from navy blue to orange
            In addition to circle color changing, the text inside circle changes.
*/

const RecipeStepPressable = ({ id }) => {
  const recipe = HARDCODEDRECIPES.find((recipe) => recipe.id === id);

  const [pressedStep, setPressedStep] = useState(
    Array(recipe.steps.length).fill(false)
  );

  const circleStyle = (index) => ({
    backgroundColor: pressedStep[index]
      ? GlobalColors.secondary1
      : GlobalColors.primary1,
  });

  const textStyle = (index) => ({
    color: pressedStep[index] ? GlobalColors.primary1 : "white",
  });

  function toggleStep(stepIndex) {
    setPressedStep((prevState) => {
      const newPressedSteps = [...prevState];
      newPressedSteps[stepIndex] = !prevState[stepIndex];
      return newPressedSteps;
    });
  }

  return (
    <>
      {recipe.steps.map((step, index) => (
        <View key={Math.random()} style={styles.step}>
          <Pressable
            key={index}
            onPress={() => toggleStep(index)}
            style={({ pressed }) => [
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <View style={[styles.circle, circleStyle(index)]}>
              <Text
                key={Math.random()}
                style={[styles.circleText, textStyle(index)]}
              >
                {index + 1}
              </Text>
            </View>
          </Pressable>
          <Text key={Math.random()} style={styles.stepText}>
            {step}
          </Text>
        </View>
      ))}
    </>
  );
};

export default RecipeStepPressable;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  circle: {
    // backgroundColor: GlobalColors.primary1,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  circleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  stepText: {
    fontSize: deviceWidth > 650 ? 20 : 17,
    maxWidth: "85%",
    marginLeft: 6,
    marginRight: 10,
    fontFamily: "noto-serif",
  },
});
