import React , {useEffect,useState}from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "/webgl/Build/1.loader.js",
  dataUrl: "/webgl/Build/1.data",
  frameworkUrl: "/webgl/Build/1.framework.js",
  codeUrl: "/webgl/Build/1.wasm",
});

function App() {
    const [progression, setProgression] = useState(0);

  useEffect(function () {
      console.log(unityContext)
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);


  return(<div className="unityContainer center">
       {progression!==1&&<p>Loading {Math.floor(progression * 100)} %</p>} 
       <Unity 
       style={{
        height: "90%",
        width: "90%",
        border: "2px solid black",
        background: "grey",
      }}
       unityContext={unityContext} />
  </div>)
}

export default App