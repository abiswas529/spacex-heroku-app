import fetch from 'isomorphic-fetch'

export function fetchSpaceXData(obj = { launch_success: '', land_success: '', launch_year: '' }) {
  const encodedURI = encodeURI(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${ obj.launch_success }&land_success=${ obj.land_success }&launch_year=${ obj.launch_year }`)
  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos)
    .catch((error) => {
      console.warn(error)
      return null
    });
}