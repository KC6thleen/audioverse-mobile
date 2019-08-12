import React from 'react'
import ActionSheet from 'react-native-action-sheet'
import { Button } from 'react-native-elements'

import { Dirs } from '../../constants'
import I18n from '../../../locales'
import { addLocalFiles } from '../../store/localFiles/actions'
import { download } from '../../actions'

interface Item {
  [key: string]: any
}

interface Props {
  items: Item[]
  actions: {
    download: typeof download
    addLocalFiles: typeof addLocalFiles
  }
}

const HeaderRightBook: React.FC<Props> = ({ items, actions }) => {
  const handleOnPress = () => {
    const options = [I18n.t('download_all')]
    options.push(I18n.t('Cancel'))

    ActionSheet.showActionSheetWithOptions({
      title: '',
      options: options,
      cancelButtonIndex: options.length - 1,
    }, async (buttonIndex) => {
      if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
        items.forEach(item => {
          const mediaFile = item.mediaFiles[0]
          actions.download(
            item,
            Dirs.audiobooks,
            mediaFile.downloadURL,
            mediaFile.filename,
            mediaFile.bitrate,
            actions.addLocalFiles.bind(null, [item.id])
          )
        })
      }
    })
  }

  return (
    <Button
      icon={{
        type: 'feather',
        name: 'download',
        size: 24,
        color: '#FFFFFF',
      }}
      type="clear"
      onPress={handleOnPress}
      accessibilityLabel={I18n.t("download_all")} />
  )
}

export default HeaderRightBook
