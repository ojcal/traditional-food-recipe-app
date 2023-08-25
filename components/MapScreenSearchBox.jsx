import { ToastAndroid, Dimensions, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";

/* The name says it all: this component is just the place search box in our MapScreen 
    Decision was made to move the code here because MapScreen started to become very lengthy
    Search box used is Google Places Autocomplete: https://github.com/FaridSafi/react-native-google-places-autocomplete
    We have also used a geocoding library which helps us to get coordinates from the location if the user submits the content of searchbox
      You can find more information about the geocoding library here: https://www.npmjs.com/package/react-native-geocoding  
*/
const MapScreenSearchBox = ({
  innerRef,
  onFocus,
  onSubmitEditing,
  onPress,
}) => {
  // Such an horrible way to store an API key. Don't try this at home!
  const GOOGLE_PLACES_API_KEY = "";

  const deviceWidth = Dimensions.get("window").width;

  const textStyles = {
    fontSize: deviceWidth > 650 ? 26 : 20,
    height: deviceWidth > 650 ? 60 : 45,
  };

  // Initialize geocoder
  Geocoder.init(GOOGLE_PLACES_API_KEY);

  // Get coordinates based on textbox input, so if user has typed Oulu to searchbox and presses submit button of keyboard,
  // Oulu is passed as parameter to this function and coordinates of Oulu are fetched
  //   This function has an if statement that checks if the search result includes word "Finland"
  // ↑ This is to prevent the map trying to animate to an area outside of Finland
  function getCoordinates(place) {
    Geocoder.from(place)
      .then((json) => {
        if (JSON.stringify(json).includes("Finland")) {
          const location = json.results[0].geometry.location;
          onSubmitEditing(location.lat, location.lng);
        } else {
          ToastAndroid.show(
            `Paikkaa ei löytynyt, yritä uudelleen!`,
            ToastAndroid.LONG
          );
        }
      })
      .catch((error) =>
        ToastAndroid.show(
          `Paikkaa ei löytynyt, yritä uudelleen!`,
          ToastAndroid.LONG
        )
      );
  }

  return (
    <GooglePlacesAutocomplete
      ref={innerRef}
      placeholder="🔍 Hae paikkaa"
      minLength={1}
      enablePoweredByContainer={false}
      returnKeyType="search"
      fetchDetails={true}
      listViewDisplayed={true}
      textInputProps={{
        onFocus: () => onFocus(),
        onSubmitEditing: () => {
          const searchBarText = innerRef.current.getAddressText();
          getCoordinates(searchBarText);
        },
      }}
      onPress={(_, details) => onPress(_, details)}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: "fi",
        components: "country:fi",
      }}
      styles={{
        textInput: [textStyles],
      }}
    />
  );
};

export default MapScreenSearchBox;
