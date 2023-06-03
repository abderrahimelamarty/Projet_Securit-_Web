import axios from "axios";
const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng";

export const getPlacesData = async (lat, lng) => {
  try {
    const options = {
      params: {
        latitude: lat,
        longitude: lng,
      },
      headers: {
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "X-RapidAPI-Key": "0f1d525407mshd77952e895b7359p1be822jsn458bfae49555",
      },
    };

    const {
      data: { data },
    } = await axios.get(URL, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};
