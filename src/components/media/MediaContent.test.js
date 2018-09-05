import React from 'react'
import MediaContent from './MediaContent'
import defaultImage from '../../../assets/av-logo.png'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const data = { title: '', artwork: defaultImage }
  const tree = renderer.create(<MediaContent data={data} language="en" />).toJSON()
  expect(tree).toMatchSnapshot()
})
