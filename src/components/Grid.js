// For the Grid Component Size N x N
import React from "react"
import {useEffect, useRef, useState, useContext } from "react"
import {scan, AStar} from "../AStar";
import {Container, Navbar, Jumbotron, Form, Button, Image } from 'react-bootstrap'
import "../style/grid.css"    

let ctx, w,h,scalingX,scalingY,currentColor, arr
let start
let goal
let scaling

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
    //const canvasRef = useRef(null)
    //const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [startMade, setStartMade] = useState(false)
    const [goalMade, setGoalMade] = useState(false)
    const [nodeSize, setNodeSize] = useState(25)
    const gridSVG = useRef(null)

    /*
    //Set Canvas Dimensions and rebuild grid  
    const generateCTX = () =>{
        
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
        
        */
    //Fixed Size for Now, Optionally Change it for later 
    const size = 25
    w = Math.floor((window.innerWidth - 6 * size)/size);
    h = Math.floor((window.innerHeight -6 * size)/size);    
    
    useEffect(()=>{
        scaling = (1000/nodeSize)*2.535
    }, [nodeSize])

    //scalingX = Math.floor((window.innerWidth*2)/w)-1.5
    //scalingY = Math.floor((window.innerHeight*2)/h)-1 

    //Run only once 
    useEffect(()=>{
        arr = Array(w).fill().map(() => Array(h).fill('a'));  
        //generateCTX()    
        //window.addEventListener("resize", generateCTX);
        //return () => window.removeEventListener("resize", generateCTX) 
    },[])
        

    //Draws/Deletes Obstalces on Left Click, or End/Goal on Right Click
    const startDraw = ({nativeEvent}) =>{
        const {offsetX, offsetY} = nativeEvent
        const x = Math.floor(offsetX/scaling)
        const y = Math.floor(offsetY/scaling)
        console.log(offsetX + " , " + offsetY )
        console.log(x + " , " + y )

        console.log(gridSVG)
        const newElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        newElement.setAttribute("width",(1000/nodeSize))
        newElement.setAttribute("height",(1000/nodeSize))
        newElement.setAttribute("x", x*(1000/nodeSize))
        newElement.setAttribute("y", y*(1000/nodeSize))
        newElement.setAttribute("fill", "#111519")

        gridSVG.current.appendChild(newElement)

        /*
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
            //updateColor(x,y)
            */
        }
        
    //Stop drawing and reset the useState   
    const endDraw = () =>{
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
    
    const clearGrid = ()=>{
        const [zero, one, ...rest ] = gridSVG.current.childNodes
        rest.forEach(node => {node.remove()})

    }
        
        return (
            <>
                <Navbar bg = "dark" variant = "dark">
                    <Container>
                        <Navbar.Brand> Shortest Path Simulator</Navbar.Brand>
                    </Container>
                    <Form >
                        <Form.Control 
                        value = {nodeSize} 
                        type = "range" 
                        min = {4}
                        max = {100}
                        onChange = {v => setNodeSize(v.target.value)}/>
                    </Form>
                    <Button 
                        className = "mx-auto" onClick = {clearGrid}>Clear
                    </Button> 
                    <Button className = "mx-auto" 
                        disabled = {!(startMade  && goalMade)}
                        onClick = {visualize}>
                            Start
                    </Button> 
                </Navbar>
                <Jumbotron className = "p-1">
                <svg ref = {gridSVG} viewBox = "0 0 1000 1000" 
                width="100%" height="auto" xmlns="http://www.w3.org/2000/svg"
                onClick = {startDraw}>
                    <defs>
                    <pattern id="Pattern" x="1" y="1" width={1000/nodeSize} height={1000/nodeSize} patternUnits="userSpaceOnUse">
                        <rect width = {1000/nodeSize-2} height = {1000/nodeSize-2} fill = "white"/>
                    </pattern>
                    </defs>
                    <rect fill="url(#Pattern)" width="100%" height="100%"/>
                </svg>
                </Jumbotron>
            </>
            )
        }
        
        export default Grid