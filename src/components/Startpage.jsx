import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [passcode, setPasscode] = useState('');

  const change = (e) => {
    switch(e.target.id) {
        case "userName":
            setName(name => e.target.value);
            break;
        case "sessionTopic":
            setTopic(topic => e.target.value);
            break;
        case "sessionPasscode":
            setPasscode(passcode => e.target.value);
            break;
    }
  };

  const joinSession = async () => {
    let UIToolKitConfig = {
        userIdentity: "",
        sessionKey: "",
        geoRegions: "",
        cloudRecordingOption: "",
        cloudRecordingElection: "",
        webEndpoint: "",
        dependentAssets: "",
        advancedTelemetry: true,
        videoSDKJWT: "",
        userName: "",
        sessionName: "",
        sessionPasscode: "",
        features:  [ "video", "audio", "share", "chat", "settings", "users", "roles" ],
    };

    let settings = {
        mode: "cors",
        method: 'POST',
        headers: {
          "Content-Type": "text/plain"
        }
      };

    await fetch("https://zoom-auth-server-20be414301cf.herokuapp.com/zoomtoken" + "?name=" + name+ "&topic=" + topic + "&password=" + passcode, settings).then( async (res) => {
        await res.text().then( async (data) => {
          console.log(data);
          if (data) {
            UIToolKitConfig.videoSDKJWT = data.toString().trim();
            UIToolKitConfig.userName = name;
            UIToolKitConfig.sessionName = topic;
            UIToolKitConfig.sessionPasscode = passcode;
          } else {
            console.log(data);
          }
        });
       });

    navigate("/meetingspage", {state: UIToolKitConfig});
  };

  return (
    <React.Fragment>
      <div>
      <h1>UIToolKit React</h1>
      <input type="text" placeholder="User Name" id="userName" onChange={change}/>
      <input type="text" placeholder="Session Topic" id="sessionTopic" onChange={change}/>
      <input type="text" placeholder="Session Passcode" id="sessionPasscode" onChange={change}/>
      <button type="button" onClick={joinSession}>Join Session</button>
      </div>
    </React.Fragment>
  );
};

export default StartPage;