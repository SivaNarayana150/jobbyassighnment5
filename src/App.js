import './App.css'

import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'

import FilterGroups from './components/FilterGroups'

import Login from './components/Login'

import JobItem from './components/JobItem'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/https://apis.ccbp.in/jobs/:id" component={JobItem} />
    <Route exact path="/jobs" component={FilterGroups} />
    <Route exact path="/login" component={Login} />

    <Route exact path="/" component={Home} />
  </Switch>
)

export default App
