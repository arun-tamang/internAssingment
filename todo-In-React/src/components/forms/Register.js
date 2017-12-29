import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';


const Register = (props) => {
  // console.log('from registser,', props.handleSubmit);
  const { handleSubmit } = props;
  return (
    props.authenticated ? (
      <Redirect to='/' />
    ) : (
      <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
            required
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
            required
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
            required
          />
        </div>
      </div>
      <div>
        <button type="submit">
          Submit
        </button>
      </div>
    </form>
    )
  )
}

export default reduxForm({
  form: 'register'
})(Register);

