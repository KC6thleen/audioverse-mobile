import React from 'react'
import { Text } from 'react-native'
import ListItem from './ListItem'
import { defaultImage } from 'src/styles'

import renderer from 'react-test-renderer'

describe('ListItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ListItem />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with avatar', () => {
    const tree = renderer.create(<ListItem avatar={{source: defaultImage}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with icon', () => {
    const tree = renderer.create(<ListItem icon={{name: 'pocket'}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with icon component', () => {
    const tree = renderer.create(<ListItem icon={<Text>Icon</Text>} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with title and subtitle', () => {
    const tree = renderer.create(<ListItem title="title" subtitle="subtitle" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with right component', () => {
    const tree = renderer.create(<ListItem rightElement={<Text>Right component</Text>} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
