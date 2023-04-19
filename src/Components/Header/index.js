import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

const websiteLogo = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'
//  alt should be website logo
const Header = props => {
  const onClickLogout = () => {
    console.log(props)
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const renderDesktopView = () => (
    <nav className="nav_deskTop_view">
      <img
        className="header_website_logo"
        alt="website logo"
        src={websiteLogo}
      />
      <div className="home_jobs_options_container">
        <Link className="link_option" to="/">
          Home
        </Link>
        <Link className="link_option" to="/jobs">
          Jobs
        </Link>
      </div>
      <button className="Logout_btn" onClick={onClickLogout} type="button">
        Logout
      </button>
    </nav>
  )

  const renderMobileView = () => (
    <nav className="nav_mobile_view">
      <img
        className="header_website_logo"
        alt="website logo"
        src={websiteLogo}
      />
      <div className="home_jobs_logOut_icons_container">
        <Link className="link_icon" to="/">
          <AiFillHome className="icon" />
        </Link>
        <Link className="link_icon" to="/jobs">
          <FaSuitcase className="icon" />
        </Link>
        {/* <Link className="link_icon" to="/login"> */}
        <button onClick={onClickLogout} type="button">
          <FiLogOut className="icon" />
        </button>
        {/* </Link> */}
      </div>
    </nav>
  )

  return (
    <>
      {renderDesktopView()}
      {renderMobileView()}
    </>
  )
}

export default withRouter(Header)
