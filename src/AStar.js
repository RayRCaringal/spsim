
/* eslint-disable */
const heuristics = (()=>{
    const eucledean = ([x1,y1],[x2,y2]) => Math.sqrt((((x1 - x2) ** 2) + ((y1 - y2) ** 2)))
    const manhattan = ([x1,y1],[x2,y2]) => Math.abs(x1-x2) + Math.abs(y1-y2)
    const diagonal = ([x1,y1],[x2,y2]) => { 
        const dx = Math.abs(x1-x2)
        const dy = Math.abs(y1-y2)
        Math.max(dx, dy) + (Math.sqrt(2)-2) * Math.min(dx, dy)}

        return{
            eucledean,
            manhattan,
            diagonal
        }
})();

//Returns all the neighbors of a node in a 3x3 area surronding the initial node 
export const scan = ([x,y], [w,h]) =>{
    const offset = [
        [-1,1],[0,1],[1,1],[-1,0],[1,0],[-1,-1],[0,-1],[1,-1]
    ] 
    const neighbors = offset.map(([offsetX,offsetY])=> [offsetX +x, offsetY+y])
    return neighbors.filter(([i,j]) => (i>=0 && i<w) && (j >= 0 && j<h))
}


/**
 * The Node object for A* Search Algorithm 
 * @param {Node} parentNode the parentNode object
 * @param {Array.<Number>} position X and Y coordinates
 */
const Node = (parentNode, position)=>{
    let g = 0
    let h = 0
    let cost = 1;
    return {parentNode, position, g, h ,cost}
}


/**
 * A* Search Algorithm
 * @param {Array.<Number>} start node coordinates [x,y] 
 * @param {Array.<Number>} goal node coordinates [x,y] 
 * @param {Number} weight the weight of each node
 * @param {Array.<Character>} grid 2D array to be searched
 */
export const AStar = (start, goal, weight, grid)=>{
    let visited = [], fringe = []
    let nodeStart = Node(start,start)
    fringe.push(nodeStart)
    while(fringe.length > 0){
        //Sort from Least to Greatest by Node Cost 
        fringe.sort((a,b)=> (a.cost < b.cost) ? -1: 1)
        let node = fringe.shift()
        if (!visited.some((e)=> JSON.stringify(e) == JSON.stringify(node.position))){
            visited.push(node.position)

            //Goal Node has been found 
            console.log(node.position)
            if(JSON.stringify(goal) == JSON.stringify(node.position)){
                return {
                    path:node,
                    visited: visited
                }

            }

            const neighbors = scan(node.position, [grid.length, grid[0].length])
            neighbors.forEach((n) =>{
                let [x,y] = n
                if(grid[x][y] != 'b'){
                    let next = Node(node, n)
                    next.h = heuristics.manhattan(next.position,goal)
                    if(!fringe.includes(next)) next.g = Number.MAX_VALUE

                    //Currently Everything has a Cost of 1 for now 
                    if (node.g + node.cost < next.g){
                        next.g = node.g + 1
                        next.cost = next.g + next.h * weight
                        if (fringe.includes(next)) fringe.filter((e)=> e == next)
                        fringe.push(next)
                    }
                }
            })
        }
        
    }
    return [-1,-1]

}


const testGrid = [
    ['s','b','a','a'],
    ['a','a','a','a'],
    ['b','b','b','g'],
]


//let testNode = AStar([0,0],[2,3], 1, testGrid)
//console.log(testNode)


//x1, y1 = node
// x2, y2 = goal 
//D = 1
//D2 = sqrt(2)