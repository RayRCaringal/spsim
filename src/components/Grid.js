// For the Grid Component Size N x N
import React from "react"
import {useEffect, useRef, useState, useContext } from "react"
import {scan, AStar} from "../AStar";
import {Container, Navbar, Jumbotron, Form, Button } from 'react-bootstrap'
import "../style/grid.css"    

let ctx, w,h,scalingX,scalingY,currentColor, arr
let start
let goal


console.log(scan([0,0],[46,97]))
const updateColor = (x,y) =>{
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
            ctx.fillStyle = '#14F7AF'
            break;
        default:
            ctx.fillStyle = "#F3F3F3" 
    }
    ctx.fillRect(x*(Math.floor((window.innerWidth*2)/w))+3,
    y*(Math.floor((window.innerHeight*2)/h))+3,
    Math.floor((window.innerWidth*2)/w)-6,
    Math.floor((window.innerHeight*2)/h)-6)
}


const visualize = ()=>{

    //Path is the Final Node, should either be the goal or the node before the goal. 
    let path = AStar(start, goal, 1, arr)

    //Trace the shortest path via the parentNode. Update grid with g 
    while(JSON.stringify(path.parentNode.position) != JSON.stringify(path.parentNode.parentNode)){
        path = path.parentNode
        let [x,y] = path.position
        arr[x][y] = 'p'
        updateColor(x,y)
    }
   
}


const Grid = () => {


    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [startMade, setStartMade] = useState(false)
    const [goalMade, setGoalMade] = useState(false)

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
        
    //Fixed Size for Now, Optionally Change it for later 
    const size = 25
    w = Math.floor((window.innerWidth - 6 * size)/size);
    h = Math.floor((window.innerHeight -6 * size)/size);    
    
    //Run only once 
    useEffect(()=>{
        arr = Array(w).fill().map(() => Array(h).fill('a'));  
        generateCTX()    
        window.addEventListener("resize", generateCTX);
        return () => window.removeEventListener("resize", generateCTX) 
    },[])
        

    //Draws/Deletes Obstalces on Left Click, or End/Goal on Right Click
    const startDraw = ({nativeEvent}) =>{
        const {offsetX, offsetY} = nativeEvent
        const x = Math.floor(offsetX/scalingX)
        const y = Math.floor(offsetY/scalingY)
        //console.log(offsetX + " , " + offsetY )

        //Left Click Only 
        if(nativeEvent.which === 1 && arr[x][y] !== 's' && arr[x][y] !== 'e' ){
           currentColor = arr[x][y] = (arr[x][y] != 'a')? 'a' : 'b'
           setIsDrawing(true)
        }
        //Right Click
        else{
            if(arr[x][y] === 's'){ //Delete Start 
                setStartMade(false)
                arr[x][y] = 'a'
            }else if(arr[x][y] === 'e'){//Delete Goal
                setGoalMade(false)
                arr[x][y] = 'a'
            }else if(!startMade){//Create Start
                arr[x][y] = 's';
                start = [x,y]
                setStartMade(true)
            }else if(!goalMade){//Create Goal
                arr[x][y] = 'e';       
                goal = [x,y]
                setGoalMade(true)  
                }
            }
            updateColor(x,y)
        }
        
    //Stop drawing and reset the useState   
    const endDraw = () =>{
        ctx.fillStyle = "#1B2631"
        setIsDrawing(false)
    }
        
    const draw = ({nativeEvent}) =>{
        if(isDrawing){
            const {offsetX, offsetY} = nativeEvent
            const x = Math.floor(offsetX/scalingX)
            const y = Math.floor(offsetY/scalingY)

            if(arr[x][y] !== 's' && arr[x][y] !== 'e' ){
                arr[x][y] = currentColor;
                updateColor(x,y)
            }
        }
    }    
        
        return (
            <>
                <Navbar bg = "dark" variant = "dark">
                    <Container>
                        <Navbar.Brand> Shortest Path Simulator</Navbar.Brand>
                    </Container>
                    <Button className = "mx-auto" 
                        disabled = {!(startMade  && goalMade)}
                        onClick = {visualize}
                        >
                            Start
                    </Button> 
                </Navbar>
                <Jumbotron className = "p-1">
                <canvas id = ".node"
                    onMouseDown = {startDraw}
                    onContextMenu = {(e)=>{e.preventDefault()}}
                    onMouseUp = {endDraw}
                    onMouseMove = {draw}
                    ref={canvasRef}
                />
                </Jumbotron>
            </>
            )
        }
        
        export default Grid