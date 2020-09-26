import Grid from './Grid'
import { fetchSpaceXData } from './api'

const routes = [
  {
    path: '/',
    exact: true,
    component: Grid,
    fetchInitialData: (path = {}) => fetchSpaceXData(path)
  }
]

export default routes