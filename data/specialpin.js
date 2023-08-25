
class Specialpin {
    constructor(
      id, // string
      name, // string
      locationName, // string
      latlng, // object with lat and long coords ("double")
      description, // string
      imageURL, // string
      markerPath // string
    ) {
      this.id = id;
      this.name = name;
      this.locationName = locationName;
      this.latlng = latlng;
      this.description = description;
      this.imageURL = imageURL;
      this.markerPath = markerPath;
    }
  }
  
  export default Specialpin;
