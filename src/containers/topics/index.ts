import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { NavigationInjectedProps } from 'react-navigation'

import { AppState } from '../../store'
import { getTopics, getTopicsPagination } from '../../reducers/selectors'
import { loadTopics } from '../../actions'

import List from '../../components/list'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
  items: getTopics(state),
  pagination: getTopicsPagination(state),
  avatarExtractor: (item: Item) => item.photo86,
  subtitleExtractor: () => '',
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'Topic',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTopics,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
