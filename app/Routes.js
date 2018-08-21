import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './views/Dashboard/Dashboard'

import ClientsContainer from './containers/ClientsContainer'
import ClientContainer from './containers/ClientContainer'
import PriceContainer from './containers/PriceContainer'
import Charts from './views/Charts/Charts'
// Containers
import Full from './containers/Full'
import App from './containers/App'
// Views

export default () => (
  <App>
    <Full>
      <Switch>
        <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
        <Route path="/clients" name="Clients" component={ClientsContainer} exact/>
        <Route path="/clients/:id" name="Client" component={ClientContainer}/>
        <Route path="/charts" name="Charts" component={Charts}/>
        <Route path="/price" name="Price" component={PriceContainer}/>
        <Route path="/" name="Dashboard" component={Dashboard}/>
      </Switch>
    </Full>
  </App>
)
// /* eslint flowtype-errors/show-errors: 0 */
// import React from 'react';
// import { Switch, Route } from 'react-router';
// import App from './containers/App';
// import HomePage from './containers/HomePage';
// import CounterPage from './containers/CounterPage';
//
// export default () => (
//   <App>
//     <Switch>
//       <Route path="/counter" component={CounterPage} />
//       <Route path="/" component={HomePage} />
//     </Switch>
//   </App>

