import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { AppState } from '../../store'
import { loadConferences } from '../../actions'
import { getConferences, getConferencesPagination } from '../../reducers/selectors'

import List from '../../components/list'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationScreenProps) => ({
  items: getConferences(state),
  pagination: getConferencesPagination(state),
  avatarExtractor: (item: Item) => item.photo86,
  subtitleExtractor: () => '',
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'Conference',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadConferences,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
