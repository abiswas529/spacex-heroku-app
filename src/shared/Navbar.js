import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'

const Navbar = () => {
  const history = useHistory();
  const filterObj = {
    launch_success: '',
    land_success: '',
    launch_year: '',
  }
  const yearFilter = [ {
    left: '2006',
    right: '2007'
  }, {
    left: '2008',
    right: '2009'
  }, {
    left: '2010',
    right: '2011'
  }, {
    left: '2012',
    right: '2013'
  }, {
    left: '2014',
    right: '2015'
  }, {
    left: '2016',
    right: '2017'
  }, {
    left: '2018',
    right: '2019'
  }, {
    left: '2020'
  }, ]

  const redirectRoute = (filter, value) => {
    if (filter === 'YEAR') {
      filterObj.launch_year = value
    } else if (filter === 'LAUNCH') {
      filterObj.launch_success = value
    } else if (filter === 'LAND') {
      filterObj.land_success = value
    }
    history.push(`/?launch_success=${ filterObj.launch_success }&land_success=${ filterObj.land_success }&launch_year=${ filterObj.launch_year }`);
  }
  return (
      <div className="col-xs-12 col-sm-4 col-md-4 col-lg-2">
          <div className="row grid-section">
              <div className="col-xs-12 grid-inner">
                  <h1><b>Filters</b></h1>
                  <div className="col-xs-12">
                      <h1 className="text-center clear-both">Launch Year</h1><hr />
                  </div>
                  {yearFilter.map((item, index) => (
                      <div className="col-xs-12 clear-both" key={ index }>
                          {
                item.left && (<button className='float-left' key={ item.left } value={ item.left } onClick={ (e) => { redirectRoute('YEAR', e.target.value) } }>{item.left}</button>)
              }
                          {
                item.right && (<button className='float-right' key={ item.right } value={ item.right } onClick={ (e) => { redirectRoute('YEAR', e.target.value) } }>{item.right}</button>)
              }
                      </div>
          ))}
                  <div className="col-xs-12">
                      <h1 className="text-center clear-both">Successful Launch</h1><hr />
                      <button className="float-left" value={ true } onClick={ (e) => { redirectRoute('LAUNCH', e.target.value) } }>True</button>
                      <button className="float-right" value={ false } onClick={ (e) => { redirectRoute('LAUNCH', e.target.value) } }>False</button>
                  </div>
                  <div className="col-xs-12">
                      <h1 className="text-center clear-both">Successful Land</h1><hr />
                      <button className="float-left" value={ true } onClick={ (e) => { redirectRoute('LAND', e.target.value) } }>True</button>
                      <button className="float-right" value={ false } onClick={ (e) => { redirectRoute('LAND', e.target.value) } }>False</button>
                  </div>
              </div>
          </div>
      </div >
  )
}
export default Navbar;