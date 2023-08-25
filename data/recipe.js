
class Recipe {
  constructor(
    id, // string
    name, // string
    alternativeName, // string
    locationName, // string
    latlng, // object with lat and long coords ("double")
    categoryNames, // string array
    specialDiets, // string array
    description, // string
    numberOfPortions, // "integer"
    pricePerPortion, // "double"
    difficulty, // string
    duration, // string
    imageUrl, // string
    ingredients, // string array
    steps, // string array
    markerPath // string
  ) {
    this.id = id;
    this.name = name;
    this.alternativeName = alternativeName;
    this.locationName = locationName;
    this.latlng = latlng;
    this.categoryNames = categoryNames;
    this.specialDiets = specialDiets;
    this.description = description;
    this.numberOfPortions = numberOfPortions;
    this.pricePerPortion = pricePerPortion;
    this.difficulty = difficulty;
    this.duration = duration;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.steps = steps;
    this.markerPath = markerPath;
  }
}

export default Recipe;
