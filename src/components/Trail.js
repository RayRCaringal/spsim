import {forwardRef} from 'react'
import { useTrail, a } from 'react-spring'

const Trail =({open, children}, ref) => {
    const trail = useTrail(children.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 0 : 1,
      width: open ? 0 : 1000,
    })
    return (
        <>
          {trail.map(({width:w, ...rest}, index) => (
                <g ref = {ref}  
                height="auto" ref = {ref} style = {{ ...rest, width: w.interpolate((w) =>`${w}px`)}}>
                    {children[index]}
                </g>
          ))}
        </>
    )
  }

  export default forwardRef(Trail) 