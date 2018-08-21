import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import { reinitActiveClient } from '../../actions/clients'

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
  }
  componentDidMount(){
    this.props.reinitActiveClient()
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" >
            <Card className="text-white">
              <CardBody className="pb-0" style={{color:'black'}}>
                <p>Сегодня день рождения у</p>
              </CardBody>
              <div className="chart-wrapper px-3">
                <ul>
                  {this.props.clients && this.props.clients.map(item => (
                    <li key={'dash'+item.id}><Link to={`/clients/${item.id}`}>{`${item.surname && item.surname} ${item.name && item.name} ${item.second_name && item.second_name}`}</Link></li>
                  ))}
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect((state)=>{
  let clients = state.clients.data
  let new_clients = clients.filter(item => {
    return moment(item.born).format('DD:MM') === moment().format('DD:MM')
  })
  return  ({ clients: new_clients })}, { reinitActiveClient })(Dashboard)
