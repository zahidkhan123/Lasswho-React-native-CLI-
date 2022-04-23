// This is the first file that ReactNative will run when it starts up.
//

import App from './app/app.tsx';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
export default App;
