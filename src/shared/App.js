import React, { Component } from 'react'
import routes from './routes'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import AppFilter from './AppFilter'
import NoMatch from './NoMatch'
import AppFooter from './AppFooter'
import '../assets/CSS/normalize.css';
import '../assets/CSS/style.css';
class App extends Component {
  render() {
    return (
        <>
            <h1><b>SpaceX Launch Programs</b></h1>
            <div className="container layout">
                <div className="row">
                    <AppFilter />

                    <Switch>
                        {routes.map(({ path, exact, component: Component, ...rest }) => (
                            <Route key={ path } path={ path } exact={ exact } render={ (props) => (
                                <Component { ...props } { ...rest } />
                ) } />
              ))}
                        <Route render={ (props) => <NoMatch { ...props } /> } />
                    </Switch>
                </div>
            </div>
            <AppFooter />
        </>
    )
  }
}

export default App