import {Button} from 'react-bootstrap'
import {scan, AStar} from "../AStar";
import {updateArr} from "./Grid";
import {useContext, useEffect} from "react"
import {GridContext} from './Store'
import {useSelector} from 'react-redux'

/* eslint-disable */

let startMade, setStartMade, endMade, setEndMade


const StartButton = () => {

    const startMade = useSelector(state => state.start)
    const endMade = useSelector(state => state.end)
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


    return (
        <Button className = "mx-auto" 
            disabled = {!(startMade  && endMade)}>
                Start
        </Button> 
    )
}

export default StartButton
