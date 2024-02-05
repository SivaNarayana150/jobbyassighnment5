import {BsSearch} from 'react-icons/bs'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const FiltersGroup = props => {
  const {
    changeSearchInput,
    getJobs,
    employmentTypesList,
    changeEmployeeList,
    salaryRangesList,
    changeSalary,
    searchInput,
  } = props

  const onChangeSearchInput = event => {
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => (
    <div className="search-input-container">
      <label htmlFor="searchInput" className="sr-only">
        Search
      </label>
      <input
        type="search"
        id="searchInput"
        className="search-input"
        placeholder="Search"
        value={searchInput}
        onChange={onChangeSearchInput}
        onKeyDown={onEnterSearchInput}
      />

      <button
        type="button"
        className="search-button-container"
        onClick={getJobs}
        aria-label="Search"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  const renderTypeOfEmployment = () => (
    <div className="employment-type-container">
      <h1 className="employment-type-heading">Type of Employment</h1>
      <ul className="employee-type-list-container">
        {employmentTypesList.map(eachEmployeeType => (
          <li className="employee-item" key={eachEmployeeType.employmentTypeId}>
            <input
              type="checkbox"
              id={eachEmployeeType.employmentTypeId}
              value={eachEmployeeType.employmentTypeId}
              className="check-input"
              onChange={event => changeEmployeeList(event.target.value)}
            />
            <label
              htmlFor={eachEmployeeType.employmentTypeId}
              className="check-label"
            >
              {eachEmployeeType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRange = () => (
    <div className="salary-range-container">
      <h1 className="salary-range-heading">Salary Range</h1>
      <ul>
        {salaryRangesList.map(eachSalary => (
          <li className="salary-item" key={eachSalary.salaryRangeId}>
            <input
              type="radio"
              id={eachSalary.salaryRangeId}
              name="salary"
              className="check-input"
              onClick={() => changeSalary(eachSalary.salaryRangeId)}
            />
            <label htmlFor={eachSalary.salaryRangeId} className="check-label">
              {eachSalary.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="horizontal-line" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
