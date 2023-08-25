import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import OnBoardingScreen from "../screens/OnBoardingScreen";
import MapScreen from "../screens/MapScreen";
import RecipesScreen from "../screens/RecipesScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SingleRecipeScreen from "../screens/SingleRecipeScreen";
import SingleCategoryScreen from "../screens/SingleCategoryScreen";
import SetLanguageScreen from "../screens/SetLanguageScreen";
import SpecialpinScreen from "../screens/SpecialpinScreen";
import ImageBackgroundForScreens from "./ImageBackgroundForScreens";

import GlobalColors from "../styles/globalColors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  // Stack navigator for nested navigations
  function RecipesStack(initialRouteName) {
    return (
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Kaikki reseptit"
          component={RecipesScreen}
          options={{
            animationTypeForReplace: "push",
            headerBackground: () => <ImageBackgroundForScreens />,
          }}
        />
        <Stack.Screen
          name="SingleCategoryScreen"
          component={SingleCategoryScreen}
          options={{
            headerTitle: "",
            animationTypeForReplace: "push",
            headerBackground: () => <ImageBackgroundForScreens />,
          }}
        />
        <Stack.Screen
          name="SingleRecipeScreen"
          component={SingleRecipeScreen}
          options={{
            headerTitle: "",
            animationTypeForReplace: "push",
            headerBackground: () => (
              <ImageBackgroundForScreens opacity={0.25} />
            ),
          }}
        />
        <Stack.Screen
          name="SpecialpinScreen"
          component={SpecialpinScreen}
          options={{
            headerTitle: "",
            animationTypeForReplace: "push",
            headerBackground: () => (
              <ImageBackgroundForScreens opacity={0.25} />
            ),
          }}
        />
        <Stack.Screen
          name="FavoriteRecipes"
          component={FavoritesScreen}
          options={{
            headerTitle: "Suosikit",
            animationTypeForReplace: "push",
            headerBackground: () => <ImageBackgroundForScreens />,
          }}
        />
        <Stack.Screen
          name="Mapview"
          component={MapScreen}
          options={{
            headerTitle: "",
            animationTypeForReplace: "push",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitle: "Asetukset",
            animationTypeForReplace: "push",
            headerShown: true,
            headerBackground: () => <ImageBackgroundForScreens />,
          }}
        />
        <Stack.Screen
          name="SetLanguageScreen"
          component={SetLanguageScreen}
          options={{
            headerTitle: "",
            animationTypeForReplace: "push",
            headerShown: true,
            headerBackground: () => <ImageBackgroundForScreens />,
          }}
        />
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnBoardingScreen}
          options={{
            headerTitle: "",
            animationTypeForReplace: "push",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  function MapTab() {
    return RecipesStack("Mapview");
  }

  function RecipeTab() {
    return RecipesStack("Kaikki reseptit");
  }

  function FavoritesTab() {
    return RecipesStack("FavoriteRecipes");
  }

  function SettingsTab() {
    return RecipesStack("Settings");
  }

  return (
    <NavigationContainer theme={{ colors: { background: "transparent" } }}>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        initialRouteName="Kartta"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Kartta":
                iconName = focused ? "location-sharp" : "location-outline";
                break;
              case "Reseptit":
                iconName = focused
                  ? "silverware-fork-knife"
                  : "silverware-fork-knife";
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );

              case "Suosikit":
                iconName = focused ? "heart" : "heart-outline";
                break;
              case "Asetukset":
                iconName = focused
                  ? "ellipsis-vertical"
                  : "ellipsis-vertical-outline";
                break;
              default:
                iconName = "";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: GlobalColors.primary1,
          tabBarInactiveTintColor: GlobalColors.primary3,
          tabBarInactiveBackgroundColor: GlobalColors.secondary2,
          tabBarActiveBackgroundColor: GlobalColors.secondary2,
          tabBarHideOnKeyboard: false,
          headerShown: false,
          lazy: false,
          tabBarLabelStyle: { fontSize: 12, marginBottom: 1 },
        })}
      >
        <Tab.Screen name="Kartta" component={MapTab} />
        <Tab.Screen name="Reseptit" component={RecipeTab} />
        <Tab.Screen name="Suosikit" component={FavoritesTab} />
        <Tab.Screen name="Asetukset" component={SettingsTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
