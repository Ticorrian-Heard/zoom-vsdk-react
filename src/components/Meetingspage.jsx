import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as UIToolkit from '@zoom/videosdk-ui-toolkit'
import styles from  "../../styles.css"; //not used just a demo
// import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';

const Meetingspage = () => {
   const navigate = useNavigate();
   const location = useLocation();
   
   const joinMeeting = async (UIToolKitConfig) => {
      let UIKit = document.createElement('app-uitoolkit');
      document.getElementById('UIToolkit')?.append(UIKit);
      window.ZoomUIToolKit.init(UIToolKitConfig);
      window.ZoomUIToolKit.subscribe("uitoolkit-destroy", () => { navigate("/startpage"); } );
      window.ZoomUIToolKit.join();
   };

   useEffect(() => {
       joinMeeting(location.state);
     }, []);
   
     return (
       <React.Fragment>
          <div>
             <div id='UIToolkit'></div>
          </div>
       </React.Fragment>
     );
};

export default Meetingspage;
