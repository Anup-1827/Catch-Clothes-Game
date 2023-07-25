import { useState, useRef, useEffect } from 'react'
import Webcam from 'react-webcam';
import * as facemesh from '@mediapipe/face_mesh';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

import { detector } from './Methods/detector';
import bucket from "./assets/bucket.png"
import { assetsArrr } from './assets/assets';
import fallObject from './Methods/fallObject';


function App() {
  const [isSetVideoStyle, setIsSetVideoStyle] = useState(false)
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const objectDivRef = useRef(null);
  const fallingObjRef = useRef(null);
  const overlayRef = useRef(null);

  let detectorInterval 

  useEffect(()=>{
    if(isSetVideoStyle){
      fallObject(assetsArrr, fallingObjRef, objectDivRef, overlayRef)
    }
  },[isSetVideoStyle])

  const handleLoadedWebcam = async()=>{
    if(webcamRef?.current && webcamRef.current.video.readyState === 4 ){

      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detectorConfig = {
        runtime : "mediapipe",
        solutionPath : "/models",
        maxFaces : 1,

      }
      const net = await faceLandmarksDetection.createDetector(model, detectorConfig);
      detectorInterval = setInterval(()=>{
        detector(net, webcamRef, objectDivRef, fallingObjRef, setIsSetVideoStyle);
      },100)  
    }
  }


  return (
    <>
    <div className='main'>
      <Webcam
        ref={webcamRef}
        onLoadedData={handleLoadedWebcam}
        mirrored={true}
      />
      <canvas ref={canvasRef} id="canvas">

      </canvas>

      <div ref={objectDivRef} className='objectDiv'>
        <img src={bucket} alt="bucket"/>
      </div>

      <div ref={fallingObjRef} className='fallingObject'>

      </div>

      <div ref={overlayRef} className='overlay'>

      </div>
    </div>
      </>
  )
}

export default App
