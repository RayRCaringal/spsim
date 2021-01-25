// For the Grid Component Size N x N

import {Container, Row, Col} from "react-bootstrap"
import React from "react"
import {useEffect, useRef } from "react"
import "../style/grid.css"    

let grid = []
const Grid = () => {
    const canvas = useRef(null)
    
    const width = window.innerWidth
    const height = 0
    const n = (height > width) ? height: width
    //let n = (height < width) ? height-66 : width-10
    const size = 50



    useEffect(() => {
        if(canvas) {
        const view= canvas.view
        console.log(canvas)
        const ctx = canvas.current.getContext("2d")
        ctx.fillStyle = "black"
        ctx.lineWidth = 1;
            for (let x = 0; x < n; x += n/size) {
                for (let y = 0; y < n; y += n/size) {
                ctx.strokeRect(x, y, (n/size)-3, (n/size)-3); 
                }
            }
        ctx.fillStyle = "white"
         
        }
    

    }, [canvas, n, size])

    


    return (
        <div>
            <canvas
            ref={canvas}
            width={n}
            height={n}
            />
        </div>
           
    )
}

export default Grid