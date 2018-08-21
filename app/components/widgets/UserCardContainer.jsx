import { Component, Fragment } from 'react'
import { compose } from 'redux'

import UserCardComponent from './UserCardComponent'
class UserCardContainer extends Component {
  render() {
    let { img, name } = this.props
    name = name || null
    const imgCard = img || ''
    return (
      <Fragment>
        {
          name && <UserCardComponent
            {...this.props}
            img = { imgCard }
          />
        }
      </Fragment>
    )
  }
}
export default compose()(UserCardContainer)
