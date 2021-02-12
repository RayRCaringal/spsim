// For the Grid Component Size N x N
import React from "react"
import {useEffect, useRef, useState, useContext } from "react"
import "../style/grid.css"    
import {GridContext} from './Store'

let arr, ctx, w,h,scalingX,scalingY,currentColor, start, goal
//let startMade = false;
//let endMade = false;

//Exporting the grid and coordinates for use in other methods 
//module.exports = {arr,start,goal}


console.log("Before")
//console.log(scan([0,0],[46,97]))
const updateArr = (x,y) =>{
    console.log("Updating Arr")
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
        case 'p':
            ctx.fillStyle = '#D536EB'
            break;
        default:
            ctx.fillStyle = "#F3F3F3" 
    }
    ctx.fillRect(x*(Math.floor((window.innerWidth*2)/w))+3,
    y*(Math.floor((window.innerHeight*2)/h))+3,
    Math.floor((window.innerWidth*2)/w)-6,
    Math.floor((window.innerHeight*2)/h)-6)
}

const Grid = () => {
    
    //CURRENT ISSUE IS THE STATES AREN'T WORKING PROPERLY. For some reason the states seem to be linked, it's also messing up the Arr. Though this must be tested with prior version 


    //Deconstructing Object in useContext
    const test = useContext(GridContext)
    const {start,end} = useContext(GridContext) 

    console.log(test)


    //Deconstructing back into useState elements 
    const [startMade, setStartMade, other] = start
    const [endMade, setEndMade] = end

    console.log("Start: " +startMade+ " End: " +endMade)

    
    //Set Canvas Dimensions and rebuild grid  
    const generateCTX = () =>{
        scalingX = Math.floor((window.innerWidth*2)/w)-1.5
        scalingY = Math.floor((window.innerHeight*2)/h)-1
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
        }
        
        const canvasRef = useRef(null)
        const contextRef = useRef(null)
        const [isDrawing, setIsDrawing] = useState(false)
        
        //Fixed Size for Now, Optionally Change it for later 
        const size = 25

        //Run only once 
        useEffect(() => {
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
            //Left Click Only 
            if(nativeEvent.which === 1 && arr[x][y] !== 's' && arr[x][y] !== 'e' ){
                //Erase Node
                if(arr[x][y] !== 'a'){
                    arr[x][y] = 'a'
                    currentColor = 'a'
                }
                
                //Create Node
                else{
                    arr[x][y] = 'b';
                    currentColor = 'b'
                }
                setIsDrawing(true)
            }
            //Right Click
            else{
                //THIS CAN BE OPTIMIZED LATER 
                if(arr[x][y] === 's'){ //Delete Start 
                    console.log("Should be false now")
                    setStartMade(false)
                    //startMade = false;
                    arr[x][y] = 'a'
                }else if(arr[x][y] === 'e'){//Delete Goal
                    console.log("Goal2")
                    setEndMade(false)
                    //endMade = false;
                    arr[x][y] = 'a'
                }else if(!startMade){//Create Start
                    console.log("Start")
                    arr[x][y] = 's';
                    setStartMade(true)
                    //startMade = true;
                }else if(!endMade){//Create Goal
                    arr[x][y] = 'e';
                    console.log("Goal1")

                    setEndMade(true)
                    //endMade = true;
                }
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
                if(arr[x][y] !== 's' && arr[x][y] !== 'e' ){
                    arr[x][y] = currentColor;
                    updateArr(x,y)
                }
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