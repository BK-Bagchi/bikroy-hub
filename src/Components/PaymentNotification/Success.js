import React from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'

const Success = () => {
  return (
    <>
        <Navbar/>
        <div>
            <div className="alert alert-success" role="alert">
                <p>Payment Successful</p>
            </div>
        </div>
        <Bottom/>
    </>
  )
}

export default Success