import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as UIToolkit from '@zoom/videosdk-ui-toolkit'
// import styles from  "../../styles.css"; //not used, ust a demo
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';
import { BallTriangle } from "react-loader-spinner";

const Meetingspage = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [loader, setLoader] = useState(true);
   
   const joinMeeting = async (UIToolKitConfig) => {
      let UIKit = document.createElement('app-uitoolkit');
      document.getElementById('UIToolkit')?.append(UIKit);
      window.ZoomUIToolKit.init(UIToolKitConfig);
      window.ZoomUIToolKit.subscribe("uitoolkit-destroy", () => { navigate("/startpage"); } );
      window.ZoomUIToolKit.subscribe("loader-switch", () => { setLoader(loader => !loader) } );
      window.ZoomUIToolKit.join();
   };

   useEffect(() => {
    if (location.state) {
       joinMeeting(location.state);
    } else {
        console.error("No config object passed. Going back to /startpage")
        navigate("/startpage");
    }
     }, []);
   
     return (
       <React.Fragment>
         {loader && <div className="flex items-center w-48 m-auto mt-96">
            <BallTriangle  height={200} width={200} radius={5} color="#0096FF" ariaLabel="ball-triangle-loading" wrapperClass={{}} wrapperStyle="" visible={true}/>
            </div>}

         <div className="w-3/4 m-auto" style={ {visibility: loader ? "hidden" : "visible"} }>
             <div id='UIToolkit'></div>
          </div>
       </React.Fragment>
     );
};

export default Meetingspage;
