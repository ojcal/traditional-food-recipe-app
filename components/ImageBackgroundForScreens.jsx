import { StyleSheet, ImageBackground } from "react-native";

/* 
    We have used the same "old paper" image background in many screen so it makes sense to make a separate component of it
        The benefit of this is naturally that we can change the background image of our app conveniently and quickly if we want
    Default opacity of the image is 0.5 but depending on the screen they may set it separately, in that case the default opacity of 0.5 is overridden
      For example, in SingleRecipeScreen, the opacity is set to 0.25
*/
const ImageBackgroundForScreens = ({ children, opacity = 0.5 }) => {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require("../assets/images/recipebackground.png")}
      imageStyle={{ opacity }}
    >
      {children}
    </ImageBackground>
  );
};

export default ImageBackgroundForScreens;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
});
