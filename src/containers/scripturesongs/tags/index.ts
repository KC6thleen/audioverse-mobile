import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { AppState } from '../../../store'
import { loadTags } from '../../../actions'
import { getTags, getTagsPagination } from '../../../reducers/selectors'

import List from '../../../components/list'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationScreenProps) => ({
  items: getTags(state),
  pagination: getTagsPagination(state),
  titleExtractor: (item: Item) => item.name,
  subtitleExtractor: () => '',
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'Tag',
    params: {
      url: item.recordingsURI,
      title: item.name,
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTags,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
