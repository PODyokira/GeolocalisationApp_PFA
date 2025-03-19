import axios from "axios";

const BASE_URL = "https://api.geoapify.com/v2/places";
const API_KEY = "7238b6b511c94aa8be936b7bc8ed03b2";

const getNearbyPlaces = async (latitude, longitude, radius = 5000) => {
  const categories = [
    "tourism.attraction",
    "tourism.sights",
    "tourism.sights.place_of_worship",
    "tourism.sights.monastery",
    "tourism.sights.city_hall",
    "tourism.sights.conference_centre",
    "tourism.sights.lighthouse",
    "tourism.sights.windmill",
    "tourism.sights.tower",
    "tourism.sights.battlefield",
    "tourism.sights.fort",
    "tourism.sights.castle",
    "tourism.sights.ruines",
    "tourism.sights.archaeological_site",
    "tourism.sights.city_gate",
    "tourism.sights.bridge",
    "tourism.sights.memorial",
    "tourism.sights.memorial.monument",
  ].join(",");

  const url = `${BASE_URL}?categories=${categories}&filter=circle:${longitude},${latitude},${radius}&limit=20&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching nearby places:", error.response?.data || error.message);
    throw error;
  }
};

export default {
  getNearbyPlaces,
};
