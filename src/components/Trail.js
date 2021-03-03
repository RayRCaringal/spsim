import {useRef} from 'react'
import { useTrail, a, useChain } from 'react-spring'

const Trail =({open, path, scan, ...props}) => {

    const scanRef = useRef()
    const pathRef = useRef()  

    const scanTrail = useTrail(scan.length, {
      config: { mass: 5, tension: 5000, friction: 200},
      opacity: open ? 0: 1,
      width: open ? 98 : 100,
      from:{opacity: 0, width: 98},
      ref: scanRef
    })

    const pathTrail = useTrail(path.length, {
      config: { mass: 5, tension: 3000, friction: 200},
      opacity: open ? 0: 1,
      from:{opacity: 0},
      delay: scan.length*50,
      ref:pathRef
    })

    useChain([scanRef,pathRef], [0,1] )

    return (
      <>
            <div {...props}>
            {scanTrail.map(({width:w, ...rest},index) => (
              <a.div style = {{width: w.interpolate((w) =>`${w}%`)}}
              className = "scanner" key = {scan[index]}>
                  <a.svg viewBox = "0 0 1000 1000"  style = {{ ...rest}}>
                      {scan[index]}
                  </a.svg>
              </a.div>
        
        ))}
      </div>
      <div {...props}>
              {pathTrail.map(({width:w, ...rest},index) => (
                <a.div className = "node" key = {path[index]}>
                    <a.svg viewBox = "0 0 1000 1000"  style = {{ ...rest}}>
                        {path[index]}
                    </a.svg>
                </a.div>
          
          ))}
        </div>
      </>
    )
  }

  export default Trail 