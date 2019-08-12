import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadBibleBooks, loadBibleChapters } from '../../../actions'
import { getBibleBooks, getBibleBooksPagination } from '../../../reducers/selectors'

import BibleBooks from './BibleBooks'

const mapStateToProps = (state: AppState) => ({
  items: getBibleBooks(state),
  pagination: getBibleBooksPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadBibleBooks,
    loadBibleChapters,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(BibleBooks)
