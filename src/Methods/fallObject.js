const fallObject = (assets, fallingObjRef, objectDivRef, overlayRef)=>{

    assets.forEach((source, idx) => {
        // if(idx == 0){
            setTimeout(()=>{
                const image= document.createElement('img');
                image.src = source.img;
                image.alt = source;
                image.style.width = "50px"
                image.style.height = "50px"
                image.className = `asset_${idx}`
        
                const fallObjectDiv = fallingObjRef.current;
                const fallObjDivStyle = fallObjectDiv.getBoundingClientRect()
        
                const fallObjLeftPos = fallObjDivStyle.left;
                const fallObjRightPos = fallObjDivStyle.right;
        
                // console.log(fallObjLeftPos, fallObjRightPos);
        
                // const randomPosition = fallObjLeftPos + (fallObjRightPos - fallObjLeftPos)* Math.random() - 50;
                let randomPosition =  (fallObjRightPos - fallObjLeftPos)* Math.random();
                if(fallObjLeftPos + randomPosition + 50 > fallObjRightPos){
                    randomPosition = (fallObjRightPos - fallObjLeftPos) - 50
                }
        
                // console.log(randomPosition);
                
        
                image.style.position = "absolute"
                image.style.left = `${randomPosition}px`
                // console.log(element);
        
                fallingObjRef.current.appendChild(image)
        
                const interval =  setInterval(()=>{
                    const assetDiv = document.querySelector(`.asset_${idx}`);
                    const top  = assetDiv.getBoundingClientRect().top;
        
                    // console.log(top, fallObjDivStyle.top);
                    assetDiv.style.top = `${top -fallObjDivStyle.top + 1 *  source.acceleration}px`;
                    // console.log(assetDiv.getBoundingClientRect().top);

                    // Check if the Object is inside the Bucket

                    // Bucket Cordinates
                        // (bx1, by1) (bx1 + wb, by1)
                        // (bx1, by1 + wh) (bx1 + wb, by1 + wh)
                    const bucketDivPos = objectDivRef.current.getBoundingClientRect();
                    const bw = bucketDivPos.width;
                    const bh = bucketDivPos.height;
                    const bx1 = bucketDivPos.left;
                    const by1 = bucketDivPos.top;
                    const bx1plusbw = bx1 + bw;
                    const by1plusbh = by1 + bh;


                    // Falling Object Coordiantes 
                        // (fx1, fy1) (fx1 + fw, fy1)
                        // (fx1, fy1 + fh) (fx1 + fw, fy1 + fh)
                    const assetDivPos = assetDiv.getBoundingClientRect();
                    const fw = assetDivPos.width;
                    const fh = assetDivPos.height;
                    const fx1 = assetDivPos.left;
                    const fy1 = assetDivPos.top;
                    const fx1plustfw = fx1 + fw;
                    const fy1plusfh = fy1 + fh;
                    const centerX1 = fx1 + fw/2;
                    const centerY1 = fy1 + fh/2;

                    // Check Conditions
                        //1. Center of the Asset should be greater than fy1
                        //2. CenterX1 - fw/2 > bx1
                        //3. CenterX1 + fw/2 < bx1 + bw
                        //4. by1Plusbh > fy1Plusfh
                    if(centerY1 >=  by1  && centerX1 - fw/2 > bx1  && centerX1 + fw/2 < bx1plusbw  && by1plusbh > fy1plusfh){
                        // console.log("Going In ,",`asset_${idx}`);
                        assetDiv.remove()
                        clearInterval(interval)
                        document.querySelector('.poof').style.display = "block";
                        
                        setTimeout(()=>{
                            document.querySelector('.poof').style.display = "none";
                        },100)
                    }

                    
                    const overlayDiv = overlayRef.current.getBoundingClientRect();
                    if(fy1plusfh >= overlayDiv.top + overlayDiv.height){
                        assetDiv.remove()
                        clearInterval(interval)
                    }
                },10)
            }, source.startTime )

    });
    
}

export default fallObject;