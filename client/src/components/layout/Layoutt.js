import React from 'react'
import Headerr from './Headerr'
import Footerr from './Footerr'

const Layoutt = ({children}) => {
  return (
    <>
        <Headerr />
        <div className="content">{children}</div>
        <Footerr/>
    </>
  )
}

export default Layoutt