import React from 'react'
import { Link } from 'react-router-dom'
function WelcomePage() {
  return (
    <div className='container text-center d-flex justify-content-space-between'>
      <div>
      WelcomePage To Tracker App
      </div>
      <div>
        Your Profile is Incomplete 
        <Link to="/profilepage">Complete  Now</Link>
      </div>
      <Link to="/loginpage">Login Page</Link>
    </div>
  )
}

export default WelcomePage
