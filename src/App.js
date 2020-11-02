import { Navbar } from './components/Navbar';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Alert } from './components/Alert';
import { AlertState } from './context/alert/AlertState';
// import { useEffect, useContext, useState } from 'react'
import { useAuthenticated } from './utils/useAuthenticated';
import { PrivateRoute } from './routes/PrivateRoute';

function App() {
  const [authenticated, error, loading] = useAuthenticated();
  console.log('2:', authenticated)
  if (error) return "Failed to load resource";

  let routes = (
    <Switch>
      <Route path='/' exact component={Home} />
      <PrivateRoute path='/profile' exact component={Profile} />
      <Redirect to={'/'} />
    </Switch>
  )

  return loading ? "Loading..." : (
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
