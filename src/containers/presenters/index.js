import { connect } from 'react-redux'

import { loadPresenters } from '../../actions'
import { getPresenters, getPresentersPagination } from '../../reducers/selectors'

import Presenters from './Presenters'

const mapStateToProps = (state) => ({
  items: getPresenters(state),
  pagination: getPresentersPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadPresenters(false, false)),
  loadMore: () => dispatch(loadPresenters(true, false)),
  refresh: () => dispatch(loadPresenters(false, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Presenters)
