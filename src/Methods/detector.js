const detector = async (net, webcamRef, objectDivRef, fallingObjRef, setIsSetVideoStyle) => {
  const video = webcamRef.current.video;
  const videoWidth = "500";
  const videoHeight = "600";

  // Setting the Width of the Video
  video.width = videoWidth;
  video.height = videoHeight;

  // Setting the width of the canvans
  // const canvasElement = canvasRef.current;
  // canvasElement.width = videoWidth;
  // canvasElement.height =videoHeight;

  //  Setting the width and height of the Falling Objects Div
    const fallingObjects = fallingObjRef.current;
    fallingObjects.style.width = `${videoWidth}px`
    fallingObjects.style.height = `${videoHeight}px`


  // Create Detection
  const estimationConfig = { flipHorizontal: true };
  const faces = await net.estimateFaces(video, estimationConfig);
  // console.log(faces);

  if (faces.length > 0) {
    // Calcualting the Box's widht Point
    const box = faces[0].box;
    const xMid = (box.xMax +  box.xMin) / 2;
    const yMid = (box.yMax + box.yMin) / 2;

    //Left and Right Position of the video
    const videoPosition = webcamRef.current.video.getBoundingClientRect();
    const leftPositionVideo = videoPosition.left;
    const rightPositionVideo = videoPosition.right;
    // console.log("Right Pos ", rightPositionVideo);
    
    const xCord = xMid;
    // console.log("Left Pos ", leftPositionVideo);
    // console.log("xMid ", xMid);
    // console.log("xCord ", xCord);
    // console.log(rightPositionVideo - leftPositionVideo);

    const objectWidth = objectDivRef.current.offsetWidth; //Width of the Object Div

    // if (xCord > leftPositionVideo && xCord < rightPositionVideo + objectWidth) {
    //   // Inside the Video Element
      // objectDivRef.current.style.left = `${leftPositionVideo + xCord - objectWidth/2 + 1}px`;
    // } else if (xCord < leftPositionVideo+ xMid) {
    //   // Outer than the left side
    //   objectDivRef.current.style.left = `${
    //     leftPositionVideo - objectWidth / 2 + 1
    //   }px`;
    // } else {
    //   //Outer than the right side
    //   objectDivRef.current.style.left = `${
    //     rightPositionVideo - objectWidth / 2 + 1
    //   }px`;
    // }
    
    // console.log("xCord ", xCord);
    if(xCord > objectWidth + objectWidth/2 && xCord <  rightPositionVideo - leftPositionVideo + objectWidth/2 + 10){
      // console.log("Heee");
      objectDivRef.current.style.left = `${leftPositionVideo - objectWidth - objectWidth/2 + xCord}px`
    }
    else if(xCord <= objectWidth){
      console.log("left", xCord);
      objectDivRef.current.style.left = `${leftPositionVideo }px`
    }
    else if(xCord - objectWidth > rightPositionVideo - leftPositionVideo){
      console.log(xCord, rightPositionVideo - leftPositionVideo + objectWidth/2);
      // console.log("Hiii");
      objectDivRef.current.style.left = `${rightPositionVideo - objectWidth + 10}px`
    }
    // Video Style has been Change
    setIsSetVideoStyle(true)
  }
};


export { detector };
