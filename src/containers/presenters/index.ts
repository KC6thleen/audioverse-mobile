import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../store'
import { loadPresenters } from '../../actions'
import { getPresenters, getPresentersPagination } from '../../reducers/selectors'

import Presenters from './Presenters'

const mapStateToProps = (state: AppState) => ({
  items: getPresenters(state),
  pagination: getPresentersPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadPresenters,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Presenters)
