import React, { useEffect, useState } from "react";
import Kap from "../SignIn/Kap";
import Tap from "./Tap";
import ParticlesBg from 'particles-bg';
import './style.css';
import { useNavigate } from "react-router-dom";


const BuyerSeller = () =>{
 
     /*
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible1, setIsVisible1] = useState(false);
    function toggleVisibility() {
      if(!isVisible1){
        setIsVisible(prev => !prev);
      }
      }

      function toggleVisibility1() {
        if (!isVisible){
        setIsVisible1(prev => !prev);
        }
      }
      */

     
    return (
       <><div className="box"> 
        {/*isVisible && <div className="three-1"><Kap /></div>*/}
        <button className="but-1">Buyer</button>
        <button className="but-2" >Seller</button>
        {/*isVisible1 && <div className="three-1"><Tap /></div>*/}
      </div><ParticlesBg type="tadpole" bg={true} /></>
    )
}
export default BuyerSeller;