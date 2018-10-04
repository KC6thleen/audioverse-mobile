import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadPresenters } from 'src/actions'
import { getPresenters, getPresentersPagination } from 'src/reducers/selectors'

import Presenters from './Presenters'

const mapStateToProps = (state) => ({
  items: getPresenters(state),
  pagination: getPresentersPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadPresenters
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Presenters)
