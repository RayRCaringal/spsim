// For the Grid Component Size N x N

import React from "react"
import {useEffect, useRef, useState } from "react"
import "../style/grid.css"    
let arr;

const Grid = () => {


    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    

    //Generate a Grid of 0s 
    const size = 25
    const w = Math.floor((window.innerWidth - 6 * size)/size);
    const h = Math.floor((window.innerHeight -6 * size)/size);

    const n = Math.floor(window.innerWidth/size)
    const scaling = (n-6)/2

    //Run only once 
    useEffect(() => {
        console.log("Before fill")
        arr = Array(w).fill().map(() => Array(h).fill('a'));

    }, [])


    
    useEffect(() => {
        console.log("In Use Effect")
        //Set Canvas Dimensions 
        const canvas = canvasRef.current
        canvas.width = window.innerWidth*2
        canvas.height = window.innerHeight*2
        canvas.style.width = window.innerWidth
        canvas.style.height = window.innerHeight
        const ctx = canvas.getContext("2d")
        ctx.scale(2,2)
        contextRef.current = ctx
        ctx.lineWidth = 2;
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[0].length; j++){
                if( arr[i][j] == 'a'){
                    ctx.fillStyle = "#F3F3F3" 
                }else{
                    console.log("Here")
                    ctx.fillStyle = "#1B2631"
                }
                /*
                if(i < 2 && j < 2){
                    console.log(((i*(n/size))+" , "+(j * (n/size))+" , "+((n/size)-6)))

                }
                */
                ctx.fillRect(i*n,j * n,n-6, n-6)
            }
        }
        console.log("Create Rect")
        
    },)

    //When Mouse is clicked take the current positions to calculate which part of the Grid to convert to an obstacle
    const startDraw = ({nativeEvent}) =>{
        const {offsetX, offsetY} = nativeEvent
        console.log(offsetX + " , " + offsetY )
        //console.log(Math.floor(offsetX/((n-6)/2))+ " , " + Math.floor(offsetY/((n-6)/2)))
        arr[Math.floor(offsetX/scaling)][Math.floor(offsetY/scaling)] = 'b';
        console.log(arr)
        setIsDrawing(true)
    }

    //Stop drawing and reset the useState   
    const endDraw = () =>{
        console.log("Ending")
        console.log(arr)
        setIsDrawing(false)
    }

    //Generate the obstacles 
    const draw = ({nativeEvent}) =>{
        if(isDrawing){
            const {offsetX, offsetY} = nativeEvent
            console.log(offsetX + " , " + offsetY )
            //console.log(Math.floor(offsetX/((n-6)/2))+ " , " + Math.floor(offsetY/((n-6)/2)))
            arr[Math.floor(offsetX/scaling)][Math.floor(offsetY/scaling)] = 1;
            console.log("Drawing")
        }
    }

    return (
        <div>
            <canvas id = ".node"
            onMouseDown = {startDraw}
            onMouseUp = {endDraw}
            onMouseMove = {draw}
            ref={canvasRef}
            />
        </div>
           
    )
}

export default Grid