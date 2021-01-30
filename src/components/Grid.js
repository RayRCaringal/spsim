// For the Grid Component Size N x N

import React from "react"
import {useEffect, useRef, useState } from "react"
import "../style/grid.css"    
let arr;
let ctx
const Grid = () => {


    const updateArr = (x,y) =>{
        ctx.fillRect(x*(Math.floor((window.innerWidth*2)/w))+3,
            y*(Math.floor((window.innerHeight*2)/h))+3,
            Math.floor((window.innerWidth*2)/w)-6,
            Math.floor((window.innerHeight*2)/h)-6)
    }

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    

    //Generate a Grid of 0s 
    const size = 25
    const w = Math.floor((window.innerWidth - 6 * size)/size);
    const h = Math.floor((window.innerHeight -6 * size)/size);

    const n = Math.floor(window.innerWidth/size)
    const scalingX = Math.floor((window.innerWidth*2)/w)-1.5
    const scalingY = Math.floor((window.innerHeight*2)/h)-1


    //Run only once 
    useEffect(() => {
        console.log("Before fill")
        arr = Array(w).fill().map(() => Array(h).fill('a'));

    }, [])


    
    useEffect(() => {
        //console.log("In Use Effect")
        //Set Canvas Dimensions 
        const canvas = canvasRef.current
        canvas.width = window.innerWidth*2
        canvas.height = window.innerHeight*2
        canvas.style.width = window.innerWidth
        canvas.style.height = window.innerHeight
        ctx = canvas.getContext("2d")
        ctx.scale(2,2)
        contextRef.current = ctx
        ctx.lineWidth = 2;
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[0].length; j++){
                ctx.fillStyle = "#F3F3F3" 
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
        
    },[w,h])

    //When Mouse is clicked take the current positions to calculate which part of the Grid to convert to an obstacle
    const startDraw = ({nativeEvent}) =>{
        const {offsetX, offsetY} = nativeEvent
        console.log(offsetX + " , " + offsetY )
        const x = Math.floor(offsetX/scalingX)
        const y = Math.floor(offsetY/scalingY)
        //console.log(x+ " , " + y)
        arr[x][y] = 'b';
        updateArr(x,y)
        
        //console.log(arr)
        setIsDrawing(true)
    }

    //Stop drawing and reset the useState   
    const endDraw = () =>{
       // console.log("Ending")
        setIsDrawing(false)
    }

    //Generate the obstacles 
    const draw = ({nativeEvent}) =>{
        if(isDrawing){
            const {offsetX, offsetY} = nativeEvent
            const x = Math.floor(offsetX/scalingX)
            const y = Math.floor(offsetY/scalingY)
            //console.log(x+ " , " + y)
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