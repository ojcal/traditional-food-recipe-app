import { StyleSheet, View, Image } from "react-native";
import { useState, useRef } from "react";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import { HARDCODEDRECIPES } from "../data/hardcodedRecipeData";
import { HARDCODEDSPECIALPINS } from "../data/hardcodedSpecialpinsData";
import Map from "../components/Map";
import MapScreenSearchBox from "../components/MapScreenSearchBox";
import MapPopupRecipeCarousel from "../components/MapPopupRecipeCarousel";
import GlobalColors from "../styles/globalColors";

/* This screen renders the map of our application.
    In addition to map, the screen has a Google Places Autocomplete searchbox as separate component which can be used to find places on the map
      The map renders markers from the hard coded recipe data and hard coded special pin data
        If a marker is tapped, a popup view with navigation arrows is displayed (with the help of useState hook).
   The map itself is located in a separate component (Map)
*/

const MapScreen = () => {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const navigation = useNavigation();

  const [selectedMarker, setSelectedMarker] = useState(null);

  // This state is used as a workaround to prevent a very common error of custom markers not being visible in react-native-maps. Check onLayout prop of custom marker renders.
  // More info: https://github.com/react-native-maps/react-native-maps/issues/3384#issuecomment-613660727
  // https://itnext.io/performant-custom-map-markers-for-react-native-maps-ddc8d5a1eeb0
  // However, this still might not work in the iOS environment so you may have to find another workaround to make the markers visible
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  function stopTrackViewChanges() {
    setTracksViewChanges(false);
  }

  // this handles the marker press for recipes
  function handleMarkerPress(recipe) {
    setSelectedMarker(recipe);
    if (searchBoxRef.current?.isFocused) {
      searchBoxRef.current.blur();
    }
  }

  // this can be used handling the marker press for special pins but not in use now
  function handleMarkerPressSP(specialpin) {
    searchBoxRef.current.blur();
    setSelectedMarker(specialpin);
  }

  // handling to SingleRecipeScreen when recipe card is pressed
  function recipeCardPressHandler(id) {
    navigation.navigate("SingleRecipeScreen", {
      id: id,
    });
  }

  // opens new view when special pin is pressed on the map
  function specialpinPressHandler(id) {
    navigation.navigate("SpecialpinScreen", {
      id: id,
    });
  }

  // this handles the carousel swipe
  function handlePopupListSwipe(index) {
    if (searchBoxRef.current?.isFocused) {
      searchBoxRef.current.blur();
    }
    const recipe = HARDCODEDRECIPES[index];
    setSelectedMarker(recipe);
    animateToRegion(recipe.latlng.latitude, recipe.latlng.longitude, 1100);
  }

  function mapPressHandler() {
    if (searchBoxRef.current?.isFocused) {
      searchBoxRef.current.blur();
    }
    setSelectedMarker(null);
  }

  // React Native Maps' animatetoRegion is used at least 4 times in this screen so to reduce the amount of code,
  // having one function to do the animation is a bit more concise way of doing things
  function animateToRegion(latitude, longitude, animationTime) {
    mapRef.current.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      animationTime
    );
  }

  // Recipe card will disappear if textbox is pressed (= focused)
  function searchBoxFocusedHandler() {
    setSelectedMarker(null);
  }

  // Animating map to the place in question if a search result in textbox is pressed
  function searchBoxResultPressedHandler(_, details) {
    if (details) {
      const { location } = details.geometry;
      animateToRegion(location.lat, location.lng, 2200);
    }
  }

  function submitSearchBoxTextHandler(latitude, longitude) {
    animateToRegion(latitude, longitude, 2200);
  }

  // Here are the pins are setted to the map
  // First recipes, then special pins
  return (
    <View style={styles.container}>
      <Map innerRef={mapRef} onPress={mapPressHandler}>
        {HARDCODEDRECIPES.map((recipe) => (
          <Marker
            key={recipe.id}
            coordinate={recipe.latlng}
            onPress={() => handleMarkerPress(recipe)}
            onSelect={() => handleMarkerPress(recipe)} // for iOS
            tracksViewChanges={tracksViewChanges}
            tracksInfoWindowChanges={tracksViewChanges}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={{ width: 70, height: 70 }}>
              <Image
                source={recipe.markerPath}
                resizeMode="contain"
                style={[{ width: "100%", height: "100%" }]}
                onLoad={stopTrackViewChanges}
                fadeDuration={0}
              />
            </View>
          </Marker>
        ))}

        {HARDCODEDSPECIALPINS.map((specialpin) => (
          <Marker
            key={specialpin.id}
            coordinate={specialpin.latlng}
            onPress={() => specialpinPressHandler(specialpin.id)}
            tracksViewChanges={tracksViewChanges}
            tracksInfoWindowChanges={tracksViewChanges}
            anchor={{ x: 0.5, y: 0.5 }}
            pinColor={GlobalColors.primary1}
          >
            <View style={{ width: 70, height: 70 }}>
              <Image
                source={specialpin.markerPath}
                resizeMode="contain"
                style={[{ width: "100%", height: "100%" }]}
                onLoad={stopTrackViewChanges}
                fadeDuration={0}
              />
            </View>
          </Marker>
        ))}
      </Map>

      {selectedMarker && (
        <MapPopupRecipeCarousel
          selectedMarker={selectedMarker}
          onSnapToItem={handlePopupListSwipe}
          onCarouselItemPress={recipeCardPressHandler}
        />
      )}

      <View style={styles.placeBoxContainer}>
        <MapScreenSearchBox
          innerRef={searchBoxRef}
          onFocus={searchBoxFocusedHandler}
          onPress={searchBoxResultPressedHandler}
          onSubmitEditing={submitSearchBoxTextHandler}
        />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  placeBoxContainer: {
    position: "absolute",
    top: 40,
    left: 40,
    right: 40,
    zIndex: 2,
  },
});
