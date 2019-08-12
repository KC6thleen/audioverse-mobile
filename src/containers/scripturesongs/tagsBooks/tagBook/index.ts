import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../../store'
import { loadTagBook } from '../../../../actions'
import { getTagBook, getTagBookPagination } from '../../../../reducers/selectors'

import List from '../../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getTagBook(state),
  pagination: getTagBookPagination(state),
  playlist: true,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTagBook,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
