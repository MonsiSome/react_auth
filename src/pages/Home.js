import React, { useContext } from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { User } from '../user'
import { clearTokens } from '../utils/clearTokens'

export const Home = (props) => {
  const {show, hide} = useContext(AlertContext)

  const onSubmitHandler = event => {
    event.preventDefault()
    console.log(event);
    clearTokens();

    const email = event.target.querySelector('#email');
    const password = event.target.querySelector('#password');
    const newUser = { 'email': email.value, 'password': password.value };

    if (event.nativeEvent.submitter.defaultValue === 'Login') {
      show('Loggining...');
      User.doLogin(newUser.email, newUser.password)
        .then(response => {
          console.log(response);
          if (!!response.data['status_code']) {
            show(`${response.data.body.message}`, 'danger');
            return response;
          }
          if (response.data.status !== 'error') {
            localStorage.setItem('access_token', response.data.body.access_token);
            localStorage.setItem('refresh_token', response.data.body.refresh_token);
            hide();
            email.value = '';
            password.value = '';
            // props.history.push('/profile');
          } else {
            show(`${response.data.message}`, 'danger');
          }
        })
        .catch(function (error) {
          show(`Logging in was broken ${error.message}`, 'danger')
        });
    } else {
      show('Registering...')

      User.doRegistration(newUser)
        .then(response => {
          console.log(response);
          if (response.data.status === 'Ok') {
            email.value = '';
            password.value = '';
            show('User was created successfully');
            
            User.doLogin(newUser.email, newUser.password)
              .then(response => {
                  localStorage.setItem('access_token', response.data.body.access_token);
                  localStorage.setItem('refresh_token', response.data.body.refresh_token);
                  hide();
                  props.history.push('/profile');
                }
              )
              .catch(function (error) {
                show(`User was created successfully but logging in was broken ${error.message}`, 'danger')
              });

          } else {
            show(`${response.data.message}`, 'danger');
          }
        })
        .catch(function (error) {
          show(`Registration was broken ${error.message}`, 'danger');
          console.log(error);
        });
    }
  }

  return (
    <div>
      <h1 className="mt-4 mb-4">Login page</h1>

      <form onSubmit={(e) => onSubmitHandler(e)}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="email@gmail.com" required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="******" minLength="6" required/>
        </div>

        <div className="form-row">
          <input type="submit" className="login btn btn-primary col-md-2 m-1" name="login" value="Login"/>
          <input type="submit" className="register btn btn-primary col-md-2 m-1" name="register" value="Register"/>
        </div>
      </form>
    </div>
  )
}
