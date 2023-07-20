import React from "react";
import { useLocation } from 'react-router-dom';
function Page(){
    
   const location = useLocation();
   const prediction = location.state?.prediction;
   console.log(prediction)

    return(
        <div> {prediction}</div>
    );
  }

export default Page;