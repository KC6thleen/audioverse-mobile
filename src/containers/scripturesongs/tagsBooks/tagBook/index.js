import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagBook } from 'src/actions'
import { getTagBook, getTagBookPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state) => ({
  items: getTagBook(state),
  pagination: getTagBookPagination(state),
  playlist: true,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTagBook,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
