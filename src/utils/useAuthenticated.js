import { useEffect, useState } from "react";
import { User } from "../user";
import { clearTokens } from "./clearTokens";

export function useAuthenticated() {
  const [authenticated, updateAuth] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log('1:', authenticated);

  async function is_auth() {
    try {
      setLoading(true);
      let authenticated;

      if (
        !!localStorage.getItem('access_token')
      ) {
        authenticated = await User.getAccess()
          .then(response => {
            console.log('Accessing...', response);
            if (response.data.body.status === 'error') {
              console.log(`${response.data.body.message}`)
              return false;
              // show(${response.data.body.message}, 'danger')
            } else {
              // show(${response.data.body.message})
              console.log(`${response.data.body.message}`);
              return true;
            }
          })
          .catch(function (error) {
            // show(${error.message})
            console.log('Wronge request - clear tokens');
            return false;
          });
      } 
      
      if (!authenticated && !!localStorage.getItem('refresh_token')) {
        authenticated = await User.doRefresh()
          .then(response => {
            console.log('Refreshing...', response);
            if (response.data.statusCode === 200) {
              localStorage.setItem('access_token', response.data.body.access_token);
              console.log('Refreshed');
              // show('Refershed');
              return true;
            } else {
              // hide();
              clearTokens();
              console.log('Wronge refresh token - clear tokens');
              return false;
            }
          })
          .catch(function (error) {
            // hide();
            clearTokens();
            console.log('Wronge request - clear tokens');
            return false;
          });
      }

      if(!localStorage.getItem('access_token') && !localStorage.getItem('refresh_token')) {
        authenticated = false;
        console.log('No tokens - no auth');
      }
      
      updateAuth(authenticated);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    is_auth();
  }, []);

  return [authenticated, error, loading];
}