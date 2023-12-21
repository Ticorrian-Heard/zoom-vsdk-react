import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";

const StartPage = () => {
  
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [passcode, setPasscode] = useState('');
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    console.log("SharedArrayBuffer:", crossOriginIsolated);
  },[]);

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

    if (name === "" || topic === "") return;

    setDisable(disable => !disable);
    setLoader(loader => !loader);

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
    
    setLoader(loader => !loader);
    navigate("/meetingspage", {state: UIToolKitConfig});
  };

  return (
    <React.Fragment>
      <div className="flex flex-col items-center w-96 mt-96 m-auto">
      <h1 className="text-3xl">UIToolKit React</h1>
      <input className="h-12 px-2 text-xl border-2 border-solid rounded-lg mt-2 border-sky-600 hover:border-sky-700 w-1/2" type="text" placeholder=" User Name" id="userName" onChange={change}/>
      <input className="h-12 px-2 text-xl border-2 border-solid rounded-lg mt-2 border-sky-600 hover:border-sky-700 w-1/2" type="text" placeholder=" Session Topic" id="sessionTopic" onChange={change}/>
      <input className="h-12 px-2 text-xl border-2 border-solid rounded-lg mt-2 border-sky-600 hover:border-sky-700 w-1/2" type="text" placeholder=" Session Passcode" id="sessionPasscode" onChange={change}/>
      <button className="flex items-center justify-center h-12 border-solid rounded-lg mt-2 bg-sky-600 w-1/2 text-white hover:bg-sky-700 active:bg-sky-800" type="button" disabled={disable} onClick={joinSession}>{loader ? <BallTriangle height={25} width={100} radius={5} color="white" ariaLabel="ball-triangle-loading" wrapperClass={{}} wrapperStyle="" visible={true}/> : 'Join Session'} </button>
      </div>
    </React.Fragment>
  );
};

export default StartPage;
