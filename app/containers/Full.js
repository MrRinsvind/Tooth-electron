import React, {Component} from 'react'
import {Container} from 'reactstrap'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
// import Breadcrumb from '../../components/Breadcrumb/'
import Footer from '../components/Footer/Footer'


// redux



export default class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            {/*<Breadcrumb/>*/}
            <Container fluid>
              {this.props.children}
            </Container>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}


