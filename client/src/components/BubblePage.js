import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("/api/colors")
      .then(res => {
        console.log('get colors Res', res)
        setColorList(res.data)
      })
      .catch(err => {
        console.log('did not retrieve colors', err)
      })
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} history={props.history}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
