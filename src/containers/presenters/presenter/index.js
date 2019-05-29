import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadPresenter } from 'src/actions'
import { getPresenter, getPresenterPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state) => ({
  items: getPresenter(state),
  pagination: getPresenterPagination(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadPresenter,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
