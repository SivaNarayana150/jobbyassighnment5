import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <div className="home-bg-container">
        <Header />
        <div className="home-content-container">
          <h1 className="home-job-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people searching are searching for jobs,salary
            information,company reviews. Find the job that fits your abilities
            and potential.
          </p>
          <button type="button" className="find-job-buttons">
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
