import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import './index.css'

import Header from '../Header'

import Profile from '../Profile'

import JobCard from '../JobCard'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

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

class FilterGroups extends Component {
  state = {
    checkboxList: [],
    minimumSalaray: '',
    inputSearch: '',
    apiStatus: apiStatusConstants.initial,
    jobOpportunityList: [],
  }

  componentDidMount() {
    this.getFilteredData()
  }

  getFilteredData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {checkboxList, minimumSalaray, inputSearch} = this.state

    const jwtToken = Cookies.get('jwt_token')

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxList.join(
        ',',
      )}&minimum_package=${minimumSalaray}&search=${inputSearch}`

      const response = await fetch(apiUrl, options)

      const data = await response.json()
      console.log(data)

      if (response.ok === true) {
        this.setState({
          apiStatus: apiStatusConstants.success,
        })
        const originalData = data.jobs
        const updatedData = originalData.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employeeType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        }))

        this.setState({jobOpportunityList: updatedData})

        const {jobOpportunityList} = this.state
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSelectEmployeeType = event => {
    this.setState(prev => {
      let updatedList = ''

      if (event.target.checked) {
        updatedList = [...prev.checkboxList, event.target.value]
      } else {
        updatedList = prev.checkboxList.filter(
          item => item !== event.target.value,
        )
      }

      return {checkboxList: updatedList}
    }, this.getFilteredData)
  }

  filterByEmployeeType = () => (
    <div className="employee-filter-container">
      <h1 className="heading-type-of-employement">Type of Employment</h1>
      {employmentTypesList.map(eachType => (
        <li key={eachType.employmentTypeId} className="list-style">
          <input
            type="checkbox"
            id={eachType.employmentTypeId}
            value={eachType.employmentTypeId}
            onChange={this.onSelectEmployeeType}
          />
          <label htmlFor={eachType.employeeType} className="label-element">
            {eachType.label}
          </label>
        </li>
      ))}
    </div>
  )

  onSelectSalaryType = event => {
    this.setState({minimumSalaray: event.target.value}, this.getFilteredData)
  }

  filterBySalaryType = () => (
    <div className="employee-filter-container">
      <h1 className="heading-type-of-employement">Salary Range</h1>
      {salaryRangesList.map(eachType => (
        <li key={eachType.salaryRangeId} className="list-style">
          <input
            type="radio"
            id={eachType.salaryRangeId}
            value={eachType.salaryRangeId}
            name="SalaryRange"
            onChange={this.onSelectSalaryType}
          />
          <label htmlFor={eachType.salaryRangeId} className="label-element">
            {eachType.label}
          </label>
        </li>
      ))}
    </div>
  )

  filterBySearch = () => {
    const changeSearchInput = event => {
      this.setState({inputSearch: event.target.value})
    }

    const searchWithFilter = () => {
      this.getFilteredData()
    }

    return (
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search"
          className="input-element"
          onChange={changeSearchInput}
        />
        <div className="search-icon-container">
          {' '}
          <button
            type="button"
            onClick={searchWithFilter}
            data-testid="searchButton"
          >
            {' '}
            <BsSearch />
          </button>
        </div>
      </div>
    )
  }

  pageFailureView = () => (
    <div className="page-not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image-size"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-heading">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#6366f1" height="50" width="50" />
    </div>
  )

  viewJobsContainer = () => {
    const {jobOpportunityList} = this.state

    return jobOpportunityList.map(each => (
      <JobCard eachJob={each} key={each.id} />
    ))
  }

  render() {
    const {checkboxList} = this.state

    return (
      <div className="bg-container">
        <Header />

        <div className="success-sub-container">
          <div>
            <Profile />
            {this.filterByEmployeeType()}
            {this.filterBySalaryType()}
          </div>

          <div>
            {this.filterBySearch()}
            {this.viewJobsContainer()}
          </div>
        </div>
      </div>
    )
  }
}

export default FilterGroups
