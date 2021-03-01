// For the Grid Component Size N x N
import {useEffect, useRef, useState, createRef, createElement} from "react"
import {AStar} from "../AStar";
import {Container, Navbar, Jumbotron, Form, Button} from 'react-bootstrap'
import "../style/grid.css"    
import { useSpring, animated } from "react-spring";
import Trail from "./Trail";

let currentColor, arr, start, goal, scaling


const Grid = () => {

    //Manage Click and Draw 
    const [isDrawing, setIsDrawing] = useState(false)
    const [startMade, setStartMade] = useState(false)
    const [goalMade, setGoalMade] = useState(false)

    //Manage Grid 
    const [nodeSize, setNodeSize] = useState(25)

    //SVG array for dynamic created SVGs 
    const svgRef = useRef([])

    //Reference for SVG, TO BE DEPRECIATED 
    const gridSVG = useRef(null)
    //const trailRef = useRef(null)

    const [open, toggle] = useState(false)


    const [pathSVG, setPathSVG] = useState([<rect width = "0" height = "0"></rect>])


   // const props = useSpring({from:{transform: 'scale(0)'}, to: { transform: 'scale(1)'},config: {duration: 250}})     
    //Run only once 
    useEffect(()=>{
        refresh()
        scaling = (1000/nodeSize)*2.535
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
        let elementList = []
        //Trace the shortest path via the parentNode. Update grid with g 
        while(JSON.stringify(path.parentNode.position) != JSON.stringify(path.parentNode.parentNode)){
            path = path.parentNode
            let [x,y] = path.position
            arr[x][y] = 'p'
            const newElement = <rect width = {(1000/nodeSize)-2} height = {(1000/nodeSize)-2}  x = {x*(1000/nodeSize)+1} y= {y*(1000/nodeSize)+1} fill = {updateColor(x,y)}/>
            elementList.push(newElement)
        }
        elementList.reverse()
        setPathSVG(elementList)

    }

    //Draws/Deletes Obstalces on Left Click, or End/Goal on Right Click
    const startDraw = ({nativeEvent}) =>{
        const {offsetX, offsetY} = nativeEvent
        const x = Math.floor(offsetX/scaling)
        const y = Math.floor(offsetY/scaling)

        //Left Click Only 
      
        if(nativeEvent.which === 1 && arr[x][y] !== 's' && arr[x][y] !== 'e' ){
           currentColor = arr[x][y] = (arr[x][y] != 'a')? 'a' : 'b'
           draw(x,y, gridSVG)
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
            draw(x,y, gridSVG)
        }
        
    //Stop drawing and reset the useState   
    const endDraw = () =>{setIsDrawing(false)}
        
    //Create SVG elements 
    const draw = (x,y, ref)=>{
        const newElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        const attrs = {"width": (1000/nodeSize)-2,
                        "height": (1000/nodeSize)-2,
                        "x":x*(1000/nodeSize)+1,
                        "y": y*(1000/nodeSize)+1,
                        "fill": updateColor(x,y),
                    }

        for(const key in attrs){
            newElement.setAttribute(key, attrs[key])
        }

        ref.current.appendChild(newElement)
   }

    const drawing = ({nativeEvent}) =>{
        if(isDrawing){
            const {offsetX, offsetY} = nativeEvent
            const x = Math.floor(offsetX/scaling)
            const y = Math.floor(offsetY/scaling)
            
            if(arr[x][y] !== 's' && arr[x][y] !== 'e' && arr[x][y] != currentColor){
                arr[x][y] = currentColor
                draw(x,y, gridSVG)
            }
        }
    }   
    
    const refresh = ()=>{
        arr = Array(parseInt(nodeSize)).fill().map(() => Array(parseInt(nodeSize)).fill('a'));  
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
                    <Button className = "mx-auto" onClick = {refresh}>Refresh</Button> 
                    <Button className = "mx-auto" onClick = {()=>{toggle(!open)}}>Toggle</Button> 
                    <Button className = "mx-auto" 
                        disabled = {!(startMade  && goalMade)}
                        onClick = {visualize}>
                            Start
                    </Button> 
                </Navbar>
                <div>
                       
                        <Trail   onMouseDown = {startDraw}
                          onMouseMove = {drawing}
                          onMouseUp = {endDraw}
                          onContextMenu = {(e)=>{e.preventDefault()}}
                          open = {open} items = {pathSVG}>
                        </Trail>
                        <div className = "test3">
                            <svg   onMouseDown = {startDraw}
                          onMouseMove = {drawing}
                          onMouseUp = {endDraw}
                          onContextMenu = {(e)=>{e.preventDefault()}}
                          ref = {gridSVG} viewBox = "0 0 1000 1000" 
                            width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">   
                                <g>
                                    <defs>
                                    <pattern id="Pattern" x="1" y="1" width={1000/nodeSize} height={1000/nodeSize} patternUnits="userSpaceOnUse">
                                        <rect width = {1000/nodeSize-2} height = {1000/nodeSize-2} fill = "#F3F3F3"/>
                                    </pattern>
                                    </defs>     
                                    <rect fill="url(#Pattern)" width="100%" height="100%"/>
                                </g>
                              
                            </svg>
                        </div>
                </div>
            </>
            )
        }
        
        export default Grid