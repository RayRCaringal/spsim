import {useState, createContext} from "react"

export const GridContext = createContext(null)

export default ({ children }) => {
    const [startMade, setStartMade] = useState(false)
    const [endMade, setEndMade] = useState(false)

    const storedStates ={
        start: [startMade, setStartMade],
        end: [endMade,setEndMade]
    }

    console.log("In Stored State")
    console.log(storedStates)


  return <GridContext.Provider value={storedStates}>{children}</GridContext.Provider>
}
