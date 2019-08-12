import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadPresenter } from '../../../actions'
import { getPresenter, getPresenterPagination } from '../../../reducers/selectors'

import List from '../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getPresenter(state),
  pagination: getPresenterPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadPresenter,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
