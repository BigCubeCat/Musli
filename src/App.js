import './style/style.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { AppProvider } from './AppContext';

function App() {
  return (
    <AppProvider>
      <div className='App'>
        <Header />
        <Main />
      </div>
    </AppProvider>
  );
}

export default App;
