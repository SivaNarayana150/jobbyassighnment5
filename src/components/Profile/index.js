import './index.css'

import Loader from 'react-loader-spinner'
import {Component} from 'react'

import Cookies from 'js-cookie'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {apiStatus: apiStatusConstants.initial, updatedData: []}

  componentDidMount() {
    this.getProfileRequest()
  }

  getProfileRequest = async () => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({apiStatus: apiStatusConstants.inProgress})

    try {
      const url = 'https://apis.ccbp.in/profile'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(url, options)
      const data = await response.json()

      const updatedDataList = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({updatedData: updatedDataList})

      if (response.ok === true) {
        this.setState({apiStatus: apiStatusConstants.success})
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {updatedData} = this.state

    return (
      <div className="employee-filter-container">
        <div className="profile-bg-container">
          <img
            src={updatedData.profileImageUrl}
            alt="profile"
            className="image-style"
          />
          <h1 className="profile-name">{updatedData.name}</h1>
          <p className="bio">{updatedData.shortBio}</p>
        </div>
      </div>
    )
  }

  failureView = () => (
    <div className="employee-filter-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.getProfileRequest}
      >
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="employee-filter-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#6366f1" height="50" width="50" />
      </div>
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.failureView()

      case apiStatusConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderAll()
  }
}

export default Profile
