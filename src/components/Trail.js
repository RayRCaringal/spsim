import {forwardRef} from 'react'
import { useTrail, a } from 'react-spring'

const Trail =({open, children, ...props}, ref) => {
    const trail = useTrail(children.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 0: 1,
      width: open ? 0 : 1000,
    })
    return (
        <div class = "test" {...props}>
          {trail.map(({width:w, ...rest}, index) => (

                <a.svg viewBox = "0 0 1000 1000"  ref = {ref}  ref = {ref} style = {{ ...rest, width: w.interpolate((w) =>`px`)}}>
                    {children[index]}
                </a.svg>
          ))}
        </div>
    )
  }

  export default forwardRef(Trail) 