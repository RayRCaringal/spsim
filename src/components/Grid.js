// For the Grid Component Size N x N
import React from "react"
import {useEffect, useRef, useState, useContext } from "react"
import {scan, AStar} from "../AStar";
import {Container, Navbar, Jumbotron, Form, Button, Image } from 'react-bootstrap'
import "../style/grid.css"    

let w,h,currentColor, arr, start, goal, scaling



const Grid = () => {
    const [isDrawing, setIsDrawing] = useState(false)
    const [startMade, setStartMade] = useState(false)
    const [goalMade, setGoalMade] = useState(false)
    const [nodeSize, setNodeSize] = useState(25)
    const gridSVG = useRef(null)


    //Fixed Size for Now, Optionally Change it for later  
    scaling = (1000/nodeSize)*2.535

    //Run only once 
    useEffect(()=>{
        refresh()
    },[nodeSize])
        


    const updateColor = (x,y) =>{
        switch(arr[x][y]){
            case 'b':
                return "#111519"
            case 's':
                return '#217BAF'
            case 'e':
                return '#C12051'
            case 'p':
                return '#14F7AF'
            default:
                return "#F3F3F3" 
        }
    }
    
    
    const visualize = ()=>{
        //Path is the Final Node, should either be the goal or the node before the goal. 
        let path = AStar(start, goal, 1, arr)
    
        //Trace the shortest path via the parentNode. Update grid with g 
        while(JSON.stringify(path.parentNode.position) != JSON.stringify(path.parentNode.parentNode)){
            path = path.parentNode
            let [x,y] = path.position
            arr[x][y] = 'p'
            draw(x,y)
        }
       
    }

    //Draws/Deletes Obstalces on Left Click, or End/Goal on Right Click
    const startDraw = ({nativeEvent}) =>{
        const {offsetX, offsetY} = nativeEvent
        const x = Math.floor(offsetX/scaling)
        const y = Math.floor(offsetY/scaling)

        //Left Click Only 
        console.log("NodeSize: "+nodeSize)
        console.log(x + " , " +y )
        console.log(arr)
      
        if(nativeEvent.which === 1 && arr[x][y] !== 's' && arr[x][y] !== 'e' ){
           currentColor = arr[x][y] = (arr[x][y] != 'a')? 'a' : 'b'
           draw(x,y)
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
            draw(x,y)
        }
        
    //Stop drawing and reset the useState   
    const endDraw = () =>{
        setIsDrawing(false)
    }
        
   const draw = (x,y)=>{
    const newElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    const attrs = {"width": (1000/nodeSize)-2,
                    "height": (1000/nodeSize)-2,
                    "x":x*(1000/nodeSize)+1,
                    "y": y*(1000/nodeSize)+1,
                    "fill": updateColor(x,y)
                }

    for(const key in attrs){
        newElement.setAttribute(key, attrs[key])
    }

    gridSVG.current.appendChild(newElement)
   }

    const drawing = ({nativeEvent}) =>{
        if(isDrawing){
            const {offsetX, offsetY} = nativeEvent
            const x = Math.floor(offsetX/scaling)
            const y = Math.floor(offsetY/scaling)
            
            if(arr[x][y] !== 's' && arr[x][y] !== 'e' && arr[x][y] != currentColor){
                arr[x][y] = currentColor
                draw(x,y)
            }
        }
    }   
    
    const refresh = ()=>{
        arr = Array(nodeSize*1).fill().map(() => Array(nodeSize*1).fill('a'));  
        const [zero, one, ...rest ] = gridSVG.current.childNodes
        if(rest) rest.forEach(node => {node.remove()})
        setStartMade(false)
        setGoalMade(false)
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
                    <Button className = "mx-auto" onClick = {refresh}>Refresh
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
                onMouseDown = {startDraw}
                onMouseMove = {drawing}
                onMouseUp = {endDraw}
                onContextMenu = {(e)=>{e.preventDefault()}}>
                    <defs>
                    <pattern id="Pattern" x="1" y="1" width={1000/nodeSize} height={1000/nodeSize} patternUnits="userSpaceOnUse">
                        <rect width = {1000/nodeSize-2} height = {1000/nodeSize-2} fill = "#F3F3F3"/>
                    </pattern>
                    </defs>
                    <rect fill="url(#Pattern)" width="100%" height="100%"/>
                </svg>
                </Jumbotron>
            </>
            )
        }
        
        export default Grid