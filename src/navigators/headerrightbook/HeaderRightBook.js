import React from 'react'
import PropTypes from 'prop-types'
import ActionSheet from 'react-native-action-sheet'

import IconButton from 'src/components/buttons/IconButton'
import { Dirs } from 'src/constants'
import I18n from 'locales'

const HeaderRightBook = ({ items, actions }) => {
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
            actions.addLocalFiles.bind(this, [item.id])
          )
        })
      }
    })
  }

  return (
    <IconButton
      name="download"
      size={24}
      color="#FFFFFF"
      style={{paddingHorizontal: 15}}
      onPress={handleOnPress}
      accessibilityLabel={I18n.t("download_all")} />
  )
}

HeaderRightBook.propTypes = {
  items: PropTypes.array,
  actions: PropTypes.shape({
    download: PropTypes.func.isRequired,
    addLocalFiles: PropTypes.func.isRequired,
  })
}

export default HeaderRightBook
