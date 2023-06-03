import React, { useEffect, useState } from "react";

import useStyles from "./Style.js";

function Home() {
  const [cordinates, setCordinates] = useState({});
  const [hotels, setHotels] = useState(null);

  const [places, setPlaces] = useState([]);

  const classes = useStyles();

  return <div></div>;
}

export default Home;
