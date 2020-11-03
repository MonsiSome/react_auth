import { Navbar } from './components/Navbar';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Alert } from './components/Alert';
import { AlertState } from './context/alert/AlertState';
import { useContext } from 'react'
import { useAuthenticated } from './utils/useAuthenticated';
import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';

function App() {
  const [authenticated, error, loading] = useAuthenticated();
  console.log('2:', authenticated);
  if (error) return "Failed to load resource";

  return loading ? "Loading..." : (
    <AlertState>
      <BrowserRouter>
        <Navbar />
        <div className="container pt-4">
          <Alert />
          <Switch>
            <PublicRoute path='/' exact component={Home} />
            <PrivateRoute path='/profile' isAuthorized={authenticated} exact component={Profile} />
            <Redirect to={'/'} />
          </Switch>
        </div>
      </BrowserRouter>
    </AlertState>
  );
}

export default App;
