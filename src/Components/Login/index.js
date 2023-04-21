import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const websiteLogo = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'
//  alt should be website logo

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  successView = jwtToken => {
    const {history} = this.props
    console.log(this.props, '********--this.props---*******')

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  // --------changed
  failureView = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    console.log(userDetails)
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data.jwt_token, '*********Data*********')
    if (response.ok === true) {
      this.successView(data.jwt_token)
    } else {
      this.failureView(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderDeskTopView = () => {
    const {username, password, errorMsg, isError} = this.state
    return (
      <div className="desktop_view_login">
        <form className="login_form" onSubmit={this.onSubmitLogin}>
          <img className="websiteLogo" alt="website logo" src={websiteLogo} />
          <div className="login_input_container">
            <label className="login_label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              onChange={this.onChangeUsername}
              className="login_input"
              id="username"
              value={username}
              placeholder="Username"
            />
          </div>
          <div className="login_input_container">
            <label className="login_label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              onChange={this.onChangePassword}
              className="login_input"
              id="password"
              value={password}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login_btn">
            Login
          </button>
          {isError && <p className="errorMsg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }

  renderMobileView = () => {
    const {username, password, errorMsg, isError} = this.state
    return (
      <div className="mobile_view_login">
        <form className="login_form" onSubmit={this.onSubmitLogin}>
          <img className="websiteLogo" alt="website logo" src={websiteLogo} />
          <div className="login_input_container">
            <label className="login_label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              onChange={this.onChangeUsername}
              className="login_input"
              id="username"
              value={username}
              placeholder="Username"
            />
          </div>
          <div className="login_input_container">
            <label className="login_label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              onChange={this.onChangePassword}
              className="login_input"
              id="password"
              value={password}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login_btn">
            Login
          </button>
          {isError && <p className="errorMsg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_page">
        {this.renderDeskTopView()}
        {/* {this.renderMobileView()} */}
      </div>
    )
  }
}

export default Login
