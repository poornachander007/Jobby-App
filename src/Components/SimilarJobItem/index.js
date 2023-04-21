import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'

const SimilarJobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = details
  return (
    <li className="li_jobItem_container similar_job_card">
      <div className="header_container_title_img_rating">
        <img
          className="jobItem_image"
          alt="similar job company logo"
          src={companyLogoUrl}
        />
        <div className="title_rating_container">
          <h1 className="title">{title}</h1>
          <p className="rating">
            <AiFillStar className="icon_rating_star" /> {rating}
          </p>
        </div>
      </div>
      <hr className="hr" />
      <h1 className="label_to_jobDescription" htmlFor="jobDescription">
        Description
      </h1>
      <p id="jobDescription" className="jobDescription">
        {jobDescription}
      </p>
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
        {/* <p className="package">{packagePerAnnum}</p> */}
      </div>
    </li>
  )
}

export default SimilarJobItem
