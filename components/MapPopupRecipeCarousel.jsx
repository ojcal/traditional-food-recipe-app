import Carousel from "react-native-reanimated-carousel";
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import Animated, { ZoomOutEasyUp, ZoomInUp } from "react-native-reanimated";

import { HARDCODEDRECIPES } from "../data/hardcodedRecipeData";
import ImageBackgroundForScreens from "./ImageBackgroundForScreens";

/* 
    This component is the nice pop up recipe carousel that is displayed when a marker is tapped on the map
        The component we have used here is React-native-reanimated-carousel
        Documentation of the component can be found here: https://www.npmjs.com/package/react-native-reanimated-carousel
    Because the carousel uses React Native Reanimated, it is easy to implement animations, see example: https://docs.swmansion.com/react-native-reanimated/docs/api/LayoutAnimations/entryAnimations     
*/

const MapPopupRecipeCarousel = ({
  selectedMarker,
  onSnapToItem,
  onCarouselItemPress,
}) => {
  const screenHeight = Dimensions.get("window").height;

  function findIndexById(id) {
    const index = HARDCODEDRECIPES.findIndex((item) => item.id === id);
    return index;
  }

  const [currentItemIndex, setCurrentItemIndex] = useState(
    findIndexById(selectedMarker.id)
  );
  const carouselRef = useRef(null);

  function carouselSwipeHandler(index) {
    onSnapToItem(index);
  }

  useEffect(() => {
    if (selectedMarker) {
      const index = findIndexById(selectedMarker.id);
      carouselRef.current?.scrollTo({ index: index, animated: true });
    }
  }, [selectedMarker]);

  return (
    <Carousel
      ref={carouselRef}
      width={350}
      height={300}
      mode="parallax"
      useNativeDriver
      modeConfig={{
        parallaxScrollingOffset: 86,
        parallaxScrollingScale: 0.85,
        parallaxAdjacentItemScale: 0.6,
      }}
      windowSize={3}
      style={[styles.carouselContainer, { top: screenHeight - 340 }]}
      defaultIndex={currentItemIndex}
      data={HARDCODEDRECIPES}
      scrollAnimationDuration={500}
      onSnapToItem={(index) => carouselSwipeHandler(index)}
      renderItem={({ item, index }) => (
        <Animated.View
          style={[styles.markerPressedViewContainer]}
          entering={ZoomInUp.duration(350)}
          exiting={ZoomOutEasyUp.duration(450)}
        >
          <Pressable
            onPress={() => onCarouselItemPress(item.id)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, flex: 1 }]}
          >
            <Image
              style={styles.markerPressedViewImage}
              source={{ uri: item.imageUrl }}
            />
            <ImageBackgroundForScreens opacity={0.7}>
              <View style={styles.markerPressedTextContainer}>
                <Text style={styles.markerPressedViewTitle}>{item.name}</Text>
                <Text style={styles.markerPressedSubTitle}>
                  {item.locationName}
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.markerPressedViewDescription}
                >
                  {item.description}
                </Text>
              </View>
            </ImageBackgroundForScreens>
          </Pressable>
        </Animated.View>
      )}
    />
  );
};

export default MapPopupRecipeCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    zIndex: 1,
    position: "absolute",
    alignSelf: "center",
    borderColor: "black",
  },
  markerPressedViewContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignContent: "center",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 6,
    position: "absolute",
    zIndex: 2,
  },
  markerPressedViewImage: {
    width: "100%",
    height: "60%",
    borderRadius: 5,
  },
  markerPressedTextContainer: {
    flex: 1,
    marginBottom: 10,
  },
  markerPressedViewTitle: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  markerPressedSubTitle: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  markerPressedViewDescription: {
    fontSize: 17,
    marginHorizontal: 12,
    textAlign: "center",
    fontFamily: "noto-serif",
  },
});
