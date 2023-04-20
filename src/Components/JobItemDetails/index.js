import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusViews = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const failureUrl = 'https://assets.ccbp.in/frontend/react-js/failure-img.png'
//  alt should be failure view

class JobItemDetails extends Component {
  state = {apiStatus: apiStatusViews.initial, jobDetails: {}, similarJobs: []}

  componentDidMount() {
    this.getJobDetails()
  }

  //   onClickRetryBtn = () => {
  //     this.getJobDetails()
  //   }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusViews.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiProfileUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiProfileUrl, options)
    // const response = await fetch(apiProfileUrl)
    const data = await response.json()
    console.log(data, '********** details data **************')
    if (response.ok === true) {
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs

      const convertedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(item => ({
          imageUrl: item.image_url,
          name: item.name,
        })),
        title: jobDetails.title,
        lifeAtCompany: {
          description: jobDetails.description,
          imageUrl: jobDetails.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }

      const convertedSimilarJobs = similarJobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({
        apiStatus: apiStatusViews.success,
        jobDetails: convertedJobDetails,
        similarJobs: convertedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusViews.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader_container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure_image_container">
      <img className="failure_image" alt="failure view" src={failureUrl} />
      <h1 className="failure_heading">Oops! Somthing Went Wrong</h1>
      <p className="failure_para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.onClickRetryBtn}
        className="btn_retry"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="li_jobItem_container">
        <div className="header_container_title_img_rating">
          <img className="jobItem_image" alt="" src={companyLogoUrl} />
          <div className="title_rating_container">
            <h1 className="title">{title}</h1>
            <p className="rating">
              <AiFillStar className="icon_rating_star" /> {rating}
            </p>
          </div>
        </div>
        <div className="location_employmentType_package_container">
          {/* <div className="location_employmentType_container"> */}
          <p className="locationOrEmploymentType_paraAnd_icon">
            <MdLocationOn className="icon_locationOrEmployeeType" />
            {location}
          </p>
          <p className="locationOrEmploymentType_paraAnd_icon">
            <FaSuitcase className="icon_locationOrEmployeeType" />
            {employmentType}
          </p>
          {/* </div> */}
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr" />
        <label className="label_to_jobDescription" htmlFor="jobDescription">
          Description
        </label>
        <p id="jobDescription" className="jobDescription">
          {jobDescription}
        </p>
      </div>
    )
  }

  renderComponentBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusViews.inProgress:
        return this.renderLoadingView()
      case apiStatusViews.success:
        return this.renderSuccessView()
      case apiStatusViews.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs_page">
          {this.renderComponentBasedOnApiStatus()}
          {/* {this.renderDeskTopView()} */}
          {/* {this.renderMobileView()} */}
          {/* {this.renderFailureView()} */}
        </div>
      </>
    )
  }
}

export default JobItemDetails

//  <div>
//     <Header />
//     <h1>JobItemDetails</h1>
//   </div>
