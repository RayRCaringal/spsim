import {Button} from 'react-bootstrap'
import {scan, AStar} from "../AStar";
import {updateArr} from "./Grid";
import {useContext, useEffect} from "react"
import {GridContext} from './Store'

/* eslint-disable */

let startMade, setStartMade, endMade, setEndMade


const StartButton = () => {

    //Importing Grid and Coordinates to pass into AStar 
    //let {arr,start,goal} = require('./Grid')
    /*
    const visualize = ()=>{

        //Path is the Final Node, should either be the goal or the node before the goal. 
        let path = AStar(start, goal, 1, arr)

        //Trace the shortest path via the parentNode. Update grid with g 
        while(JSON.stringify(path) != JSON.stringify(path.parentNode)){
            let [x,y] = path.position
            arr[x][y] = 'p'
            path = path.parentNode
        }


        updateArr()
    

    }
    */
    
    const {start:s,end:e} = useContext(GridContext) 

    //Deconstructing back into useState elements 
    useEffect(()=>{
        [startMade, setStartMade] = s
        [endMade, setEndMade] = e
    },)
  


    //const [isDisabled, setIsDisabled] = useState(false)


    return (
        <Button className = "mx-auto" 
            disabled = {startMade}>
                Start
        </Button> 
    )
}

export default StartButton
