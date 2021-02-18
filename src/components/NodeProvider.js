import {useState, useContext,createContext, useRef} from "react"

export const NodeContext = createContext(null)
export const NodeUpdateContext = createContext(null)

const useNodeContext =()=>{ return useContext(NodeContext)}
const useNodeUpdate =()=> {return useContext(NodeUpdateContext)}

export default ({ children }) => {
  const [startMade, setStartMade] = useState(false)
  const [endMade, setEndMade] = useState(false)
  const [arr, setArr] = useState([[]])

    const storedStates ={
        start: [startMade, setStartMade],
        end: [endMade,setEndMade],
        grid: [arr, setArr]
    }

    const update=((type) => type === "start" ? setStartMade(!startMade) : setEndMade(!endMade))

  return (
  <NodeContext.Provider value={storedStates}>
    <NodeUpdateContext.Provider value = {update}>
      {children}
    </NodeUpdateContext.Provider>
  </NodeContext.Provider>)
}

export{useNodeContext, useNodeUpdate}
