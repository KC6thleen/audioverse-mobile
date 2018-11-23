import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagSponsor, resetAndPlayTrack } from 'src/actions'
import { getTagSponsor, getTagSponsorPagination } from 'src/reducers/selectors'

import TagSponsor from './TagSponsor'

const mapStateToProps = (state) => ({
  items: getTagSponsor(state),
  pagination: getTagSponsorPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadTagSponsor,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TagSponsor)
