import React, {useEffect} from 'react';
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from 'notistack';
import theme from './theme';
import { configureStore } from './store';
import routes from './routes';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/index.scss';
import './assets/css/custom_style.css';
import './assets/css/content-styles.css';
import Main from './Main'

const store = configureStore();
const persistor = persistStore(store);

const App = () => {
  
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor} >
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
              <Main />
            </SnackbarProvider>  
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </PersistGate>  
    </StoreProvider>
  );
};

export default App;
