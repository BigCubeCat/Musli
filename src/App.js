import './style/style.scss';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import Main from './components/Main/Main';
import { AppProvider } from './AppContext';

function App() {
  return (
    <AppProvider>
      <div className='App'>
        <Header />
        <Main />
        <Player />
      </div>
    </AppProvider>
  );
}

export default App;
