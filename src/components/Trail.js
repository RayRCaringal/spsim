import {forwardRef} from 'react'
import { useTrail, a } from 'react-spring'

const Trail =({open, items, ...props}) => {
    console.log(items)
    const trail = useTrail(items.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 0: 1,
      width: open ? 0 : 1000,
      from:{opacity: 0, width: 0}
    })
    return (
        <div {...props}>
          <div  >
              {trail.map(({width:w, ...rest},index) => (
                <a.div className = "test" key = {items[index]}>
                    <a.svg viewBox = "0 0 1000 1000"  style = {{ ...rest, width: w.interpolate((w) =>`px`)}}>
                        {items[index]}
                    </a.svg>
                </a.div>
          
          ))}
          </div>
        </div>
    )
  }

  export default Trail 