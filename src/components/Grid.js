// For the Grid Component Size N x N

import React from "react"
import {useEffect, useRef, useState } from "react"
import "../style/grid.css"    
let arr;
let ctx
let w,h,scalingX,scalingY
const Grid = () => {
    
    
    const updateArr = (x,y) =>{
        switch(arr[x][y]){
            case 'b':
                ctx.fillStyle = "#1B2631"
                break;
            case 's':
                ctx.fillStyle = '#217BAF'
                break;
            case 'e':
                ctx.fillStyle = '#C12051'
                break;
            default:
                ctx.fillStyle = "#F3F3F3" 
        }
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

                switch(arr[i][j]){
                    case 'b':
                        ctx.fillStyle = "#1B2631"
                        break;
                    case 's':
                        ctx.fillStyle = '#217BAF'
                        break;
                    case 'e':
                        ctx.fillStyle = '#C12051'
                        break;
                    default:
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
        const [currentColor, setCurrentColor] = useState('b')
        
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
            const {offsetX, offsetY} = nativeEvent
            const x = Math.floor(offsetX/scalingX)
            const y = Math.floor(offsetY/scalingY)
            console.log(offsetX + " , " + offsetY )
            if(nativeEvent.which === 1){
                if(arr[x][y] == 'b'){
                    arr[x][y] = 'a'
                    setCurrentColor('a')
                }else{
                    arr[x][y] = 'b';
                    setCurrentColor('b')
                }
                setIsDrawing(true)
            }else{
                arr[x][y] = 's';
            }
            updateArr(x,y)
        }
        
        //Stop drawing and reset the useState   
        const endDraw = () =>{
            ctx.fillStyle = "#1B2631"
            setIsDrawing(false)
        }
        
        //Generate the obstacles 
        const draw = ({nativeEvent}) =>{
            if(isDrawing){
                const {offsetX, offsetY} = nativeEvent
                const x = Math.floor(offsetX/scalingX)
                const y = Math.floor(offsetY/scalingY)
                arr[x][y] = currentColor;
                updateArr(x,y)
            }
        }
        
        return (
            <canvas id = ".node"
            onMouseDown = {startDraw}
            onContextMenu = {(e)=>{e.preventDefault()}}
            onMouseUp = {endDraw}
            onMouseMove = {draw}
            ref={canvasRef}
            />
            
            )
        }
        
        export default Grid