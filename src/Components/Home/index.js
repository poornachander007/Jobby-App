import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickFindJobsBtn = () => {
    const {history} = props
    history.replace('/jobs')
  }
  const renderHomeTextContent = () => (
    <div className="homeTextContent_container">
      <h1 className="homeText_heading">Find The Job That Fits Your Life</h1>
      <p className="homeText_description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <button
        onClick={onClickFindJobsBtn}
        className="findJobs_btn"
        type="button"
      >
        Find Jobs
      </button>
    </div>
  )
  const renderDeskTopView = () => (
    <div className="deskTop_home_content_container">
      {renderHomeTextContent()}
    </div>
  )

  const renderMobileView = () => (
    <div className="mobile_home_content_container">
      {renderHomeTextContent()}
    </div>
  )

  return (
    <div className="Home_page">
      <Header />
      {renderDeskTopView()}
      {renderMobileView()}
    </div>
  )
}

export default Home
