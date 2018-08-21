import React, { Fragment } from 'react'
import { Table, Button, Badge, Input, Row, Col, Label, FormGroup, Card, CardBody, CardHeader } from 'reactstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import ModalTrigger from '../components/modals/ModalTrigger'
import ModalNewHistoryContainer from '../containers/ModalNewHistoryContainer'
import { checkTableData } from '../utils/helpers'

export default function Client(props){
  return(
    <Fragment>
      <Row className="pt-4">
        <Col xs="12">
          <h2 className="d-flex justify-content-between">
            <span>Информация о клиенте: </span>
            { !props.state.editInfo && <Button color="primary" onClick={props.toggleEdit}>Редактировать</Button> }
            { props.state.editInfo && <div>
              <Button color="warning" onClick={props.toggleEdit}>Отмена</Button>
              <Button color="success" onClick={props.submitEdit} className="ml-4">Сохранить</Button>
            </div> }
          </h2>
        </Col>
        <Col md="6" xs="12">
          <FormGroup className="mt-2 mb-1">
            <Label>Имя:</Label>
            <Input
              type="text"
              name="name"
              onChange={props.inputChange('name')}
              value={props.state.name}
              className={props.getClasses('name')}
              disabled={!props.state.editInfo}
            />
          </FormGroup>
          <FormGroup className="mt-2 mb-1">
            <Label>Фамилия:</Label>
            <Input
              type="text"
              name="surname"
              onChange={props.inputChange('surname')}
              value={props.state.surname}
              className={props.getClasses('surname')}
              disabled={!props.state.editInfo}
            />
          </FormGroup>
          <FormGroup className="mt-2 mb-1">
            <Label>Отчество:</Label>
            <Input
              type="text"
              name="second_name"
              onChange={props.inputChange('second_name')}
              value={props.state.second_name}
              className={props.getClasses('second_name')}
              disabled={!props.state.editInfo}
            />
          </FormGroup>
          <FormGroup className="mt-2 mb-1">
            <Label>Телефон:</Label>
            <NumberFormat
              name="phone"
              customInput={Input}
              format="(###) ### ####"
              type="tel"
              onChange={props.inputChange('phone')}
              value={props.state.phone}
              className={props.getClasses('phone')}
              disabled={!props.state.editInfo}
            />
          </FormGroup>
          <FormGroup className="mt-2 mb-1">
            <Label>Дата рождения:</Label>
            <DatePicker
              selected={props.state.born}
              onChange={props.dateChange('born')}
              value={props.state.born.format("DD/MM/YYYY")}
              name="born"
              format={null}
              className={'input-custom form-control w-100'}
              disabled={!props.state.editInfo}
              dateFormat="DD/MM/YYYY"
            />
          </FormGroup>
        </Col>
        <Col md="6" xs="12">
          <FormGroup className="mt-2 mb-1">
            <Label>Основной диагноз:</Label>
            <Input
              type="textarea"
              rows="9"
              name="diagnosis"
              onChange={props.inputChange('diagnosis')}
              value={props.state.diagnosis}
              disabled={!props.state.editInfo}
              className={props.getClasses('diagnosis')}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="pt-4 pb-4">
        <Col xs="12">
          <h2 className="d-flex justify-content-between">
            <span>История: </span>
            <ModalTrigger
              component={ModalNewHistoryContainer}
              modalClassName='modal-primary'
              match={props.match}
              getSingleClient={props.getSingleClient}
            >
              <Button color="primary">Добавить посещение</Button>
            </ModalTrigger>
          </h2>
        </Col>
        { !!props.state.history.length && props.state.history.sort((b,a)=>{
          if (Date.parse(a.date) < Date.parse(b.date))
            return -1
          if (Date.parse(a.date) > Date.parse(b.date))
            return 1
          return 0
        }).map((story, ind, item)=>(
          <Col md="6" xs="12" className="mb-4" key={`his${ind}`}>
            <Card>
              <CardHeader>
                { story.heading }
                <Badge pill color="danger" className="float-right">{ item.length - ind }</Badge>
              </CardHeader>
              <CardBody>
                {story.priceText && story.priceText.length &&
                  <div>
                    По Прайслисту:
                    { story.priceText.map((price)=> <p className = "mb-0">{`${price.label}(${price.q}) - ${price.price}грн.`}</p>)}
                  </div> || ''
                }
                <br/>
                Коментарий:<br/>
                {story.text}
                <div className="history-item">
                  <p className="history-item__date">{ checkTableData(story.date) }</p>
                  <p className="history-item__price">{ story.price } грн</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}

      </Row>
      <Row>
        <Col xs="12">
          <h2 className="d-flex justify-content-between">
            <span>Зубы: </span>
            { !props.state.editTeeth && <Button color="primary" onClick={props.toggleEditTeeth}>Редактировать</Button> }
            { props.state.editTeeth && <div>
              <Button color="warning" onClick={props.toggleEditTeeth}>Отмена</Button>
              <Button color="success" onClick={props.submitEditTeeth} className="ml-4">Сохранить</Button>
            </div> }
          </h2>
        </Col>
        <Col xs="12">
          { props.state.teeth && <Table responsive striped style={{ minWidth: 1400 }}>
            <tbody>
              <tr>
                <td>
                  <Input value={props.state.teeth.tr8 || ''} onChange={props.teethChange('tr8')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tr7 || ''} onChange={props.teethChange('tr7')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tr6 || ''} onChange={props.teethChange('tr6')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tr5 || ''} onChange={props.teethChange('tr5')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tr4 || ''} onChange={props.teethChange('tr4')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tr3 || ''} onChange={props.teethChange('tr3')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tr2 || ''} onChange={props.teethChange('tr2')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tr1 || ''} onChange={props.teethChange('tr1')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tl1 || ''} onChange={props.teethChange('tl1')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tl2 || ''} onChange={props.teethChange('tl2')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tl3 || ''} onChange={props.teethChange('tl3')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tl4 || ''} onChange={props.teethChange('tl4')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tl5 || ''} onChange={props.teethChange('tl5')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tl6 || ''} onChange={props.teethChange('tl6')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tl7 || ''} onChange={props.teethChange('tl7')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.tl8 || ''} onChange={props.teethChange('tl8')} disabled={!props.state.editTeeth}/>
                </td>
              </tr>
              <tr>
                <td className="text-center">8п</td>
                <td className="text-center">7п</td>
                <td className="text-center">6п</td>
                <td className="text-center">5п</td>
                <td className="text-center">4п</td>
                <td className="text-center">3п</td>
                <td className="text-center">2п</td>
                <td className="text-center">1п</td>
                <td className="text-center">1л</td>
                <td className="text-center">2л</td>
                <td className="text-center">3л</td>
                <td className="text-center">4л</td>
                <td className="text-center">5л</td>
                <td className="text-center">6л</td>
                <td className="text-center">7л</td>
                <td className="text-center">8л</td>
              </tr>
              <tr>
                <td>
                  <Input value={props.state.teeth.br8 || ''} onChange={props.teethChange('br8')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.br7 || ''} onChange={props.teethChange('br7')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.br6 || ''} onChange={props.teethChange('br6')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.br5 || ''} onChange={props.teethChange('br5')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.br4 || ''} onChange={props.teethChange('br4')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.br3 || ''} onChange={props.teethChange('br3')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.br2 || ''} onChange={props.teethChange('br2')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.br1 || ''} onChange={props.teethChange('br1')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.bl1 || ''} onChange={props.teethChange('bl1')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.bl2 || ''} onChange={props.teethChange('bl2')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.bl3 || ''} onChange={props.teethChange('bl3')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.bl4 || ''} onChange={props.teethChange('bl4')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.bl5 || ''} onChange={props.teethChange('bl5')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.bl6 || ''} onChange={props.teethChange('bl6')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.bl7 || ''} onChange={props.teethChange('bl7')} disabled={!props.state.editTeeth}/>
                </td>
                <td>
                  <Input value={props.state.teeth.bl8 || ''} onChange={props.teethChange('bl8')} disabled={!props.state.editTeeth}/>
                </td>
              </tr>
            </tbody>
          </Table> }
        </Col>
      </Row>
    </Fragment>
  )
}
