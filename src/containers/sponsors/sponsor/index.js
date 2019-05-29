import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadSponsor } from 'src/actions'
import { getSponsor, getSponsorPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state) => ({
  items: getSponsor(state),
  pagination: getSponsorPagination(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadSponsor,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
