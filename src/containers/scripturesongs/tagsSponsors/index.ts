import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { AppState } from '../../../store'
import { loadTagsSponsors } from '../../../actions'
import { getTagsSponsors, getTagsSponsorsPagination } from '../../../reducers/selectors'

import List from '../../../components/list'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationScreenProps) => ({
  items: getTagsSponsors(state),
  pagination: getTagsSponsorsPagination(state),
  subtitleExtractor: () => '',
  avatarExtractor: (item: Item) => item.photo86,
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'TagSponsor',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTagsSponsors,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
