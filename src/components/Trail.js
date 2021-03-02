import { useTrail, a } from 'react-spring'

const Trail =({open, path, scan, ...props}) => {

    const scanTrail = useTrail(scan.length, {
      config: { mass: 5, tension: 5000, friction: 400},
      opacity: open ? 0: 1,
      width: open ? 98 : 100,
      from:{opacity: 0, width: 98}
    })

    const pathTrail = useTrail(path.length, {
      config: { mass: 5, tension: 2000, friction: 200},
      opacity: open ? 0: 1,
      delay: 2000,
      from:{opacity: 0}
    })
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