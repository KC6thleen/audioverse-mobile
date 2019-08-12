import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { AppState } from '../../store'
import { loadSponsors } from '../../actions'
import { getSponsors, getSponsorsPagination } from '../../reducers/selectors'

import List from '../../components/list'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationScreenProps) => ({
  items: getSponsors(state),
  pagination: getSponsorsPagination(state),
  avatarExtractor: (item: Item) => item.photo86,
  subtitleExtractor: () => '',
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'Sponsor',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadSponsors,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
