import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagSponsor } from 'src/actions'
import { getTagSponsor, getTagSponsorPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state) => ({
  items: getTagSponsor(state),
  pagination: getTagSponsorPagination(state),
  playlist: true,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTagSponsor,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
