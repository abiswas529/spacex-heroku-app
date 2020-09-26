import Grid from './Grid'
import { fetchPopularRepos } from './api'

const routes = [
  {
    path: '/',
    component: Grid,
    fetchInitialData: (path = {}) => fetchPopularRepos(path)
  }
]

export default routes