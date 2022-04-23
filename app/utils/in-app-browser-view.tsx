import { Alert, Linking } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

const options = {
  // iOS Properties
  dismissButtonStyle: 'cancel',
  preferredBarTintColor: '#151515',
  preferredControlTintColor: 'white',
  readerMode: false,
  animated: true,
  modalPresentationStyle: 'fullScreen',
  modalTransitionStyle: 'coverVertical',
  modalEnabled: true,
  enableBarCollapsing: false,
  // Android Properties
  showTitle: true,
  toolbarColor: '#151515',
  secondaryToolbarColor: 'black',
  enableUrlBarHiding: true,
  enableDefaultShare: true,
  forceCloseOnRedirection: false,
  showInRecents: true,

  // Specify full animation resource identifier(package:anim/name)
  // or only resource name(in case of animation bundled with app).
  animations: {
    startEnter: 'slide_in_right',
    startExit: 'slide_out_left',
    endEnter: 'slide_in_left',
    endExit: 'slide_out_right'
  },
  headers: {
    //'my-custom-header': 'my custom header value'
  }
}

export const generatePageLink = async (url: string, onClose?: () => void) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, options);
      onClose ? onClose() : null
    }
    else {
      Linking.openURL(url)
    }
  } catch (error) {
    Alert.alert(error.message)
  }
}
