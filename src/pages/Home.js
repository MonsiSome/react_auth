import React, { useContext } from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { User } from '../user'

export const Home = (props) => {
  const {show, hide} = useContext(AlertContext)

  const onSubmitHandler = event => {
    event.preventDefault()
    console.log(event); //
    clearTokens();

    const email = event.target.querySelector('#email');
    const password = event.target.querySelector('#password');
    const newUser = { 'email': email.value, 'password': password.value };

    if (event.nativeEvent.submitter.defaultValue === 'Login') {
      show('Loggining...');
      User.doLogin(newUser.email, newUser.password)
        .then(response => {
          console.log(response);
          // console.log('status_code', !!response.data['status_code']);
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
            props.history.push('/profile');
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

      <form onSubmit={onSubmitHandler}>
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

// const access = document.querySelector('.access');
// const refresh = document.querySelector('.refresh');

// access.addEventListener('click', clickHandler);
// refresh.addEventListener('click', clickHandler);

// function clickHandler(event) {
//   event.preventDefault();
//   userStatusMessage.innerHTML = '';
//   userStatusMessage.style.color = 'black';
//   console.log('access_token', localStorage.getItem('access_token'));
//   console.log('refresh_token', localStorage.getItem('refresh_token'));
//   if(
//     !localStorage.getItem('access_token') ||
//     !localStorage.getItem('refresh_token')
//   ) {
//     requestStatus.innerHTML = 'Log in, please...';
//     return;
//   }

//   if (event.target.classList.contains("access")) {
//     requestStatus.innerHTML = 'Access...';
  
//     User.getAccess()
//       .then(response => {
//         console.log(response);
//         requestStatus.innerHTML = '';
//         userStatusMessage.innerHTML = `${response.data.body.message}`;
//         response.data.body.status === 'error' ? userStatusMessage.style.color = 'darkred'
//           : userStatusMessage.style.color = 'black';
//       })
//       .catch(function (error) {
//         requestStatus.innerHTML = `${error.message}`;
//       });
//   } else {
//     requestStatus.innerHTML = 'Refresh...';

//     User.doRefresh()
//       .then(response => {
//         console.log(response);
//         if (response.data.statusCode === 200) {
//           localStorage.setItem('access_token', response.data.body.access_token);
//           userStatusMessage.innerHTML = 'Refershed';
//         } else {
//           userStatusMessage.innerHTML = `${response.data.body.message}`;
//           userStatusMessage.style.color = 'darkred';
//           clearTokens();
//         }
//         requestStatus.innerHTML = '';
//       })
//       .catch(function (error) {
//         requestStatus.innerHTML = `${error.message}`;
//       });
//   }
// }

export function clearTokens() {
  localStorage.clear('access_token');
  localStorage.clear('refresh_token');
}
