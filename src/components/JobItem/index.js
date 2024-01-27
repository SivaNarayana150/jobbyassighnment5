import {Component} from 'react'

import Cookies from 'js-cookie'

import {withRouter} from 'react-router-dom'

class JobItem extends Component {
  componentDidMount() {
    this.getSimilarProducts()
  }

  getSimilarProducts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    console.log(apiUrl)
    console.log(
      'https://apis.ccbp.in/jobs/bb95e51b-b1b2-4d97-bee4-1d5ec2b96751',
    )
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()
    console.log(data)
  }

  render() {
    return <p>hello</p>
  }
}

export default withRouter(JobItem)
