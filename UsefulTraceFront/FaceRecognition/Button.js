import React from "react";

function Button({handleSendVideo}) {
    return (
    <div>
        <button onClick={handleSendVideo} className='btn'>Log In</button>    
    </div>
   );
 }
 
 export default Button;