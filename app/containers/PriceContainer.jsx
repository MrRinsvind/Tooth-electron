import React, { Component } from 'react'
import { Col, FormGroup, Label, Row, Input, Card, CardBody, CardHeader, Badge, Button } from 'reactstrap'
import { editPrice } from '../actions/price'
import { connect } from 'react-redux'
import { get } from 'lodash'
import ModalTrigger from '../components/modals/ModalTrigger'
import ModalNewPrice  from './ModalNewPrice'


class PriceContainer extends Component{

  constructor(props) {
    super(props)
    this.state = {
      price: '',
      q: '',
      label: '',
      error: {},
    }
  }
  inputChange = (type) => (ev) => {
    this.setState({
      [type]: ev.target.value,
    })
  }
  clickModal = () => {
    console.log('button clicked')
  }
  render(){
    return(
      <Row>
        {
          this.props.priceList && this.props.priceList.map(item=>(
            <Col className="col-12 col-md-6 mb-4"  key={item.id}>
              <Card>
                <CardHeader>
                  { item.label }
                </CardHeader>
                <CardBody>
                  <div className="history-item">
                    <p className="history-item__date">{ item.q }</p>
                    <p className="history-item__price">{ item.price } грн</p>
                    <ModalTrigger
                      component={ModalNewPrice}
                      inputChange={this.inputChange}
                      {...this.state}

                    >
                      <Button color="primary" onClick={this.clickModal}>Изменить</Button>
                    </ModalTrigger>

                  </div>
                </CardBody>
              </Card>
            </Col>
          ))
        }
      </Row>
    )
  }
}


export default connect((store)=>({priceList:store.price.data, reinit:store.price.reinit}),({ editPrice }))(PriceContainer)