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
      <Link className="link_option" to="/">
        <img
          className="header_website_logo"
          alt="website logo"
          src={websiteLogo}
        />
      </Link>
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
      <Link className="link_icon" to="/">
        <img
          className="header_website_logo"
          alt="website logo"
          src={websiteLogo}
        />
      </Link>
      <ul className="home_jobs_logOut_icons_container">
        <li>
          <Link className="link_icon" to="/">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li>
          <Link className="link_icon" to="/jobs">
            <FaSuitcase className="icon" />
          </Link>
        </li>
        {/* <Link className="link_icon" to="/login"> */}
        <li>
          <button onClick={onClickLogout} type="button">
            <FiLogOut className="icon" />
          </button>
        </li>
        {/* </Link> */}
      </ul>
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
