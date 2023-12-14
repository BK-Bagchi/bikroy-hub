import React from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'

const Fail = () => {
  return (
    <>
        <Navbar/>
        <div>
            <div className="alert alert-danger" role="alert">
                <p>Payment Failed</p>
            </div>
        </div>
        <Bottom/>
    </>
  )
}

export default Fail