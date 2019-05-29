import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadConference } from 'src/actions'
import { getConference, getConferencePagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state) => ({
  items: getConference(state),
  pagination: getConferencePagination(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadConference,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
