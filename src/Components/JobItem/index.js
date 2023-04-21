import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'

const JobItem = props => {
  const {details} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  //   return <h1>Job Item {title}</h1>

  return (
    <Link to={`/jobs/${id}`} className="link_to_jobDetails">
      <li className="li_jobItem_container">
        <div className="header_container_title_img_rating">
          <img
            className="jobItem_image"
            alt="company logo"
            src={companyLogoUrl}
          />
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
        <h1 className="label_to_jobDescription" htmlFor="jobDescription">
          Description
        </h1>
        <p id="jobDescription" className="jobDescription">
          {jobDescription}
        </p>
      </li>
    </Link>
  )
}

export default JobItem
