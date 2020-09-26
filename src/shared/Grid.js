import React, { Component } from 'react'
import qs from 'query-string';
class Grid extends Component {
  constructor(props) {
    super(props)

    let repos
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      repos = this.props.staticContext.data
    }

    this.state = {
      repos,
      loading: repos ? false : true,
    }

    this.fetchRepos = this.fetchRepos.bind(this)
  }
  componentDidMount() {
    if (!this.state.repos) {
      const searchParam = qs.parse(this.props.location.search);
      const param = {
        launch_success: searchParam.launch_success,
        land_success: searchParam.land_success,
        launch_year: searchParam.launch_year
      }
      this.fetchRepos(param)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      const searchParam = qs.parse(this.props.location.search);
      const param = {
        launch_success: searchParam.launch_success,
        land_success: searchParam.land_success,
        launch_year: searchParam.launch_year
      }
      this.fetchRepos(param)
    }
  }
  fetchRepos(lang) {
    this.setState(() => ({
      loading: true
    }))

    this.props.fetchInitialData(lang)
      .then((repos) => this.setState(() => ({
        repos,
        loading: false,
      })))
  }
  render() {
    const { loading, repos } = this.state

    if (loading === true) {
      return <div className="col-xs-12 col-sm-8 col-md-8 col-lg-10 align-center"><div className="loader"></div></div>
    }

    return (
        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-10">
            <div className="row">
                {repos.map(({ mission_name, mission_id, launch_year, launch_success, launch_landing, flight_number, links }, index) => (
                    <div className="col-xs-12 col-sm-6 col-sm-6 col-lg-3 grid-section" key={ index }>
                        <div className="grid-inner">
                            <ul>
                                <li className="img-li"><img className="img-responsive" src={ links.mission_patch_small }></img></li>
                                <li className="mission-header"><b>{mission_name}#{flight_number}</b></li>
                                <li><b>Mission Ids</b>: {mission_id}</li>
                                <li><b>Launch Year</b>: {launch_year}</li>
                                <li><b>Successful Launch</b>: {launch_success.toString()}</li>
                                <li><b>Successful Land</b>: {launch_landing ? launch_landing.toString() : ''}</li>
                            </ul>
                        </div>
                    </div>
          ))}
            </div>
        </div>
    )
  }
}

export default Grid