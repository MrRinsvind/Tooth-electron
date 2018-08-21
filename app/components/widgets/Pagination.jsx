import { Component, Fragment } from 'react'
import Pagination from "react-js-pagination";
import { Pagination as PaginationStrap } from 'reactstrap'

export default class PaginationTest extends Component{
  handleOpenPage = (type) => {
    const offset = (type - 1) * 10
    this.props.items.filter({ offset: offset })
  }

  render() {
    const { count, filters } = this.props.items
    const offset = filters.offset || 0
    const limit = 10
    const activePage = Math.ceil(offset / limit) + 1
    return (
      <PaginationStrap>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={ limit }
          totalItemsCount={count}
          pageRangeDisplayed={5}
          onChange={this.handleOpenPage}
          nextPageText={'Next'}
          prevPageText={'Prev'}
        />
      </PaginationStrap>
    )
  }
}

