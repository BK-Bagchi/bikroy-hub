import React from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'

const ViewPostedAds = () => {
  const userEmail= localStorage.getItem('email')
  console.log(userEmail)
  return (
    <>
        <Navbar/>
        <section>
            <p>View your posted ads here here</p>
        </section>
        <Bottom/>
    </>
  )
}

export default ViewPostedAds