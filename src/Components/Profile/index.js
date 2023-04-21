import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Cookies from 'js-cookie'
import './index.css'

const apiProfileUrl = 'https://apis.ccbp.in/profile'

const apiStatusViews = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {apiStatus: apiStatusViews.initial, userProfileDetails: {}}

  componentDidMount() {
    this.getUserDetails()
  }

  onClickRetryBtn = () => {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({apiStatus: apiStatusViews.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiProfileUrl, options)
    const data = await response.json()
    console.log(data.profile_details, '********** Profile data **************')
    if (response.ok === true) {
      const userProfileDetails = data.profile_details
      const convertedData = {
        name: userProfileDetails.name,
        profileImageUrl: userProfileDetails.profile_image_url,
        shortBio: userProfileDetails.short_bio,
      }
      this.setState({
        apiStatus: apiStatusViews.success,
        userProfileDetails: convertedData,
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

  renderSuccessView = () => {
    const {userProfileDetails} = this.state
    const {name, profileImageUrl, shortBio} = userProfileDetails
    return (
      <div className="userDetails_card">
        <img
          className="userDetailsCard_img"
          alt="profile"
          src={profileImageUrl}
        />
        <h1 className="userName_heading">{name}</h1>
        <p className="shortBio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile_retry_btn_container">
      <button
        onClick={this.onClickRetryBtn}
        className="btn_retry"
        type="button"
      >
        Retry
      </button>
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

  render() {
    return (
      <>
        {this.renderComponentBasedOnApiStatus()}
        {/* {this.renderLoadingView()} */}
        {/* {this.renderFailureView()} */}
      </>
    )
  }
}

export default Profile
