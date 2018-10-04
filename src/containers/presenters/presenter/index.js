import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadPresenter, resetAndPlayTrack } from 'src/actions'
import { getPresenter, getPresenterPagination } from 'src/reducers/selectors'

import Presenter from './Presenter'

const mapStateToProps = (state) => ({
  items: getPresenter(state),
  pagination: getPresenterPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadPresenter,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Presenter)
