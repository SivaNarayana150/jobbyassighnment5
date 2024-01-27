import './index.css'

import {Link} from 'react-router-dom'

import {BsFillClipboardFill, BsFillGeoAltFill, BsStarFill} from 'react-icons/bs'

const JobCard = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employeeType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob

  return (
    <Link to={`/https://apis.ccbp.in/jobs/:${id}`} className="link-style">
      <button type="button" className="null-button">
        <div className="job-card-bg-conatiner">
          <div className="image-rating-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div>
              <p className="package">{title}</p>

              <div className="rating-container">
                <BsStarFill className="color-change" />
                <p className="package">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-contanier">
            <div>
              <div className="rating-container">
                <BsFillGeoAltFill className="change-color-e" />
                <p className="package">{location}</p>
              </div>

              <div className="rating-container">
                <BsFillClipboardFill className="change-color-e" />
                <p className="package"> {employeeType}</p>
              </div>
            </div>

            <p className="package">{packagePerAnnum}</p>
          </div>

          <hr className="horizontal" />

          <h1 className="package">Description</h1>
          <p className="package">{jobDescription}</p>
        </div>
      </button>
    </Link>
  )
}

export default JobCard
