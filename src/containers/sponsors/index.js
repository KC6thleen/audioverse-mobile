import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadSponsors } from 'src/actions'
import { getSponsors, getSponsorsPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state, props) => ({
  items: getSponsors(state),
  pagination: getSponsorsPagination(state),
  avatarExtractor: item => item.photo86,
  subtitleExtractor: () => null,
  onPress: item => props.navigation.navigate({
    routeName: 'Sponsor',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadSponsors,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
