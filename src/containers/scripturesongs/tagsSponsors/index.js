import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagsSponsors } from 'src/actions'
import { getTagsSponsors, getTagsSponsorsPagination } from 'src/reducers/selectors'

import TagsSponsors from './TagsSponsors'

const mapStateToProps = state => ({
  items: getTagsSponsors(state),
  pagination: getTagsSponsorsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadTagsSponsors
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TagsSponsors)
