// For the Grid Component Size N x N

import React from "react"
import {useEffect, useRef, useState } from "react"
import "../style/grid.css"    
let arr;
let ctx
let w,h,scalingX,scalingY
const Grid = () => {
    
    
    const updateArr = (x,y) =>{
        ctx.fillRect(x*(Math.floor((window.innerWidth*2)/w))+3,
        y*(Math.floor((window.innerHeight*2)/h))+3,
        Math.floor((window.innerWidth*2)/w)-6,
        Math.floor((window.innerHeight*2)/h)-6)
    }
    
    //Set Canvas Dimensions and rebuild grid  
    const generateCTX = () =>{
        console.log("In CTX")
        scalingX = Math.floor((window.innerWidth*2)/w)-1.5
        scalingY = Math.floor((window.innerHeight*2)/h)-1
        console.log(arr)
        const canvas = canvasRef.current
        canvas.width = window.innerWidth*2
        canvas.height = window.innerHeight*2
        ctx = canvas.getContext("2d")
        ctx.scale(2,2)
        contextRef.current = ctx
        ctx.lineWidth = 2;
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        //Generate Grid 
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[0].length; j++){
                if(arr[i][j] !== 'a'){
                    ctx.fillStyle = "#1B2631"
                }else{
                    ctx.fillStyle = "#F3F3F3" 
                }
                ctx.fillRect(
                    i*(Math.floor(canvas.width/w))+3,
                    j*(Math.floor(canvas.height/h))+3
                    ,Math.floor(canvas.width/w)-6,
                    Math.floor(canvas.height/h)-6
                    )
                }
            }
            ctx.fillStyle = "#1B2631"
            console.log("Create Rect")
        }
        
        const canvasRef = useRef(null)
        const contextRef = useRef(null)
        const [isDrawing, setIsDrawing] = useState(false)
        
        //Fixed Size for Now, Optionally Change it for later 
        const size = 25

        //Run only once 
        useEffect(() => {
            console.log("Before fill")
            w = Math.floor((window.innerWidth - 6 * size)/size);
            h = Math.floor((window.innerHeight -6 * size)/size);
            arr = Array(w).fill().map(() => Array(h).fill('a'));      
            generateCTX()
            window.addEventListener("resize", generateCTX);
            return () => window.removeEventListener("resize", generateCTX) 
        }, [w,h])
        

        //When Mouse is clicked take the current positions to calculate which part of the Grid to convert to an obstacle
        const startDraw = ({nativeEvent}) =>{
            if(nativeEvent.which === 1){
                const {offsetX, offsetY} = nativeEvent
                console.log(offsetX + " , " + offsetY )
                const x = Math.floor(offsetX/scalingX)
                const y = Math.floor(offsetY/scalingY)
                arr[x][y] = 'b';
                updateArr(x,y)
                setIsDrawing(true)
            }
        }
        
        //Stop drawing and reset the useState   
        const endDraw = () =>{
            setIsDrawing(false)
        }
        
        //Generate the obstacles 
        const draw = ({nativeEvent}) =>{
            if(isDrawing){
                const {offsetX, offsetY} = nativeEvent
                const x = Math.floor(offsetX/scalingX)
                const y = Math.floor(offsetY/scalingY)
                arr[x][y] = 'b';
                updateArr(x,y)
            }
        }
        
        return (
            <canvas id = ".node"
            onMouseDown = {startDraw}
            onMouseUp = {endDraw}
            onMouseMove = {draw}
            ref={canvasRef}
            />
            
            )
        }
        
        export default Grid