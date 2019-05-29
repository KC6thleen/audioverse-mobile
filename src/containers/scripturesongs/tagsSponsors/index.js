import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagsSponsors } from 'src/actions'
import { getTagsSponsors, getTagsSponsorsPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state, props) => ({
  items: getTagsSponsors(state),
  pagination: getTagsSponsorsPagination(state),
  subtitleExtractor: () => null,
  avatarExtractor: item => item.photo86,
  onPress: item => props.navigation.navigate({
    routeName: 'TagSponsor',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadData: loadTagsSponsors,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
