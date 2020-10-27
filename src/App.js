import { Navbar } from './components/Navbar';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Alert } from './components/Alert';
import { AlertState } from './context/alert/AlertState';

function App() {
  let routes = (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/profile' exact component={Profile} />
      <Redirect to={'/'} />
    </Switch>
  )

  return (
    <AlertState>
      <BrowserRouter>
        <Navbar />
        <div className="container pt-4">
          <Alert />
          { routes }
        </div>
      </BrowserRouter>
    </AlertState>
  );
}

export default App;
