import './extension/arrayExtension'
import { LoadScript } from '@react-google-maps/api';
import { GOOGLE_LIBRARIES } from 'data/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyRouter from 'routers/index';
import 'utils/i18n';
import store from './states/store';
import useGoogleTranslateScript from 'hooks/useGoogleTranslate';
import { enableMapSet } from 'immer';

const queryClient = new QueryClient();

function App() {
  enableMapSet();
  useGoogleTranslateScript();
  return (
      <LoadScript
        loadingElement={<></>}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}
        libraries={GOOGLE_LIBRARIES}
        >
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <div id="translateWrapper" className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
              <ToastContainer />
              <MyRouter />
            </div>
          </Provider>
        </QueryClientProvider>
      </LoadScript>
  );
}

export default App;
