// @flow
import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { getAllClients } from '../actions/clients'
import { getAllPrice } from '../actions/price'

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;
  componentDidMount(){
    this.props.getAllClients()
    this.props.getAllPrice()
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(connect(null, { getAllClients, getAllPrice })(App));