import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=''

const apiStatusViews = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const failureUrl = 'https://assets.ccbp.in/frontend/react-js/failure-img.png'
//  alt should be failure view

const noJobsUrl = 'https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
//  alt should be no jobs

class Jobs extends Component {
  state = {
    apiStatus: apiStatusViews.initial,
    // onChangeInput: '',
    searchInput: '',
    employmentTypeList: [],
    minimumPackage: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  onClickRetryBtn = () => {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusViews.inProgress})
    const {employmentTypeList, minimumPackage, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const employmentType = employmentTypeList.join(',')
    const apiProfileUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const response = await fetch(apiProfileUrl, options)
    // const response = await fetch(apiProfileUrl)
    const data = await response.json()
    console.log(data.jobs, '********** Jobs data **************')
    if (response.ok === true) {
      const jobsList = data.jobs
      const convertedData = jobsList.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        apiStatus: apiStatusViews.success,
        jobsList: convertedData,
      })
    } else {
      this.setState({apiStatus: apiStatusViews.failure})
    }
  }

  onClickToggleCheckBox = event => {
    const {id} = event.target
    console.log(id, '*****************************')
    const {employmentTypeList} = this.state
    if (employmentTypeList.includes(id) === true) {
      // if (event.target.checked === false) {
      const newList = employmentTypeList.filter(
        item => item.employmentTypeId !== id,
      )

      this.setState({employmentTypeList: newList}, this.getJobsList)
      //   this.setState(
      //     preState => ({
      //       employmentTypeList: preState.employmentTypeList.filter(
      //         item => item.employmentTypeId !== id,
      //       ),
      //     }),
      //     this.getJobsList,
      //   )
    } else {
      this.setState(
        preState => ({
          employmentTypeList: [...preState.employmentTypeList, id],
        }),
        this.getJobsList,
      )
    }
  }

  renderTypeOfEmploymentItems = () => (
    <div className="typeOfEmployment_container">
      <hr className="hr" />
      <h1 className="typeOfEmployment_heading">Type of Employment</h1>
      <ul className="ul_typeOfEmploymentsList">
        {employmentTypesList.map(item => (
          <li className="li_checkBox_label_container">
            <input
              onClick={this.onClickToggleCheckBox}
              className="check_box"
              id={item.employmentTypeId}
              key={item.employmentTypeId}
              type="checkbox"
            />

            <label htmlFor={item.employmentTypeId} className="label">
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  // salaryRangeId,label

  onClickRadioButton = event => {
    const {id} = event.target
    this.setState({minimumPackage: id}, this.getJobsList)
  }

  renderSalaryRangeItems = () => (
    <div className="typeOfEmployment_container">
      <hr className="hr" />
      <h1 className="typeOfEmployment_heading">Salary Range</h1>
      <ul className="ul_typeOfEmploymentsList">
        {salaryRangesList.map(item => (
          <li className="li_checkBox_label_container">
            <input
              onClick={this.onClickRadioButton}
              name="salaryRange"
              className="check_box"
              id={item.salaryRangeId}
              key={item.salaryRangeId}
              type="radio"
            />
            {/* htmlFor={item.salaryRangeId} */}
            <label htmlFor={item.salaryRangeId} className="label">
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getJobsList()
  }

  renderInputElement = () => {
    const {searchInput} = this.state

    return (
      <div className="form_input_container">
        <input
          value={searchInput}
          onChange={this.onChangeInput}
          className="input"
          type="search"
          placeholder="Search"
        />
        <button
          data-testid="searchButton"
          onClick={this.onClickSearchIcon}
          className="search_btn"
          type="button"
        >
          <BsSearch className="icon_search" />
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader_container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }
    // const {companyLogoUrl,employmentType,id,jobDescription,location,packagePerAnnum,rating,title} = jobsList
    return (
      <>
        <ul className="ul_jobs_container">
          {jobsList.map(item => (
            <JobItem key={item.id} details={item} />
          ))}
        </ul>
      </>
    )
  }

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

  renderNoJobsView = () => (
    <div className="failure_image_container">
      <img className="failure_image" alt="no jobs" src={noJobsUrl} />
      <h1 className="failure_heading">No Jobs Found</h1>
      <p className="failure_para">
        We could not find any jobs. try other filters.
      </p>
    </div>
  )

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

  renderMobileView = () => (
    <div className="mobile_view">
      {this.renderInputElement()}
      <Profile />
      {this.renderTypeOfEmploymentItems()}
      {this.renderSalaryRangeItems()}
      {this.renderComponentBasedOnApiStatus()}
    </div>
  )

  renderDeskTopView = () => (
    <div className="deskTop_view">
      <div className="leftSide_container">
        <Profile />
        {this.renderTypeOfEmploymentItems()}
        {this.renderSalaryRangeItems()}
      </div>
      <div className="rightSide_container">
        {this.renderInputElement()}
        {this.renderComponentBasedOnApiStatus()}
        {/* {this.renderFailureView()} */}
        {/* {this.renderNoJobsView()} */}
      </div>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs_page">
          {this.renderDeskTopView()}
          {this.renderMobileView()}
        </div>
      </>
    )
  }
}

export default Jobs
