import React from 'react'

import { Container, Row, Col, InputGroupAddon, InputGroup, Button, Input } from 'reactstrap'
// import Breadcrumb from 'common/layout/components/Breadcrumb/Breadcrumb'
import { checkTableData } from '../utils/helpers'
import ModalTrigger from '../components/modals/ModalTrigger'
import Column from '../components/tables/Column'
import Table from '../components/tables/Table'
import { Link } from 'react-router-dom'
import ModalNewClientsContainer from '../containers/ModalNewClientsContainer'

export default function Clients(props) {
  // console.log(props)
  return (
    <div className="dashboard-top" style={{paddingTop:20,paddingBottom:25}}>
      <Row className="justify-content-end">
        <Col className="col-12 order-3 ml-auto mr-auto col-md-6 order-md-2 ml-md-0 mr-md-0 mb-4 md-md-0">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button type="button" color="primary"><i className="fa fa-search" /><span className="pl-2" />Поиск</Button>
            </InputGroupAddon>
            <Input type="text" id="input1-group2" name="search" placeholder="Поиск клиентов по Имени/Фамилии" value={props.searchField} onChange={props.changeField}/>
          </InputGroup>
        </Col>
        <Col className="order-2 col-6 col order-md-3 col-md-3 mb-4">
          <ModalTrigger
            component={ModalNewClientsContainer}
            modalClassName='modal-primary'
          >
            <Button color="btn btn-primary ml-auto d-block">Добавить клиента</Button>
          </ModalTrigger>

        </Col>
      </Row>
      <Row>
        <Col xs="12" lg="12">
          <Table responsive striped list={
            {
              results: props.clients.data,
              filters: {
                data: [],
                orderBy: (data) => { console.log(data)},
              },
            }
          }>
            <Column
              width="15%"
              field="updated"
              title={'Последний визит'}
              orderable="desc"
              format={(updated, item) => checkTableData(updated)}

            />
            <Column width="10%" field="id" title={'#'} orderable="desc" />
            <Column
              field="name"
              title={'ФИО'}
              orderable="desc"
              format={(name, item) => <Link to={`/clients/${item.id}`}>{`${item.surname && item.surname} ${item.name && item.name} ${item.second_name && item.second_name}`}</Link>}
            />
            <Column
              width="20%"
              field="phone"
              title={'Телефон'}
              orderable="desc"/>
            <Column
              width="20%"
              field="born"
              title={'Дата рождения'}
              format={(born, item) => checkTableData(born)}
              orderable="desc"/>
            <Column
              width="15%"
              field="regular"
              title={'Регулярный'}
              orderable="desc"
              format={(regular, item) => regular ? <div className="label-success label" /> :  <div className="label-error label" />}
            />
          </Table>
        </Col>
      </Row>
    </div>
  )

}
