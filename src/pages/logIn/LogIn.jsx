import { PureComponent } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { INPUT_NAMES } from '../../scripts/libraries';
import styles from './LogIn.module.css';
import { isObjectFieldsEmpty } from '../../scripts/helpers';
import { login } from '../../scripts/api-service';

export class LogIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {
        email: '',
        password: '',
      },
    };
  }

  submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { history } = this.props;
    const { email, password, formErrors } = this.state;
    if (password.length < 8) {
      this.setError(INPUT_NAMES.password, 'Password should contains 8 or more symbols');
    } else if (password.length > 24) {
      this.setError(INPUT_NAMES.password, 'Password is too big');
    }
    // eslint-disable-next-line
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(email)) {
      this.setError(INPUT_NAMES.email, 'Please, use correct email');
    }
    if (isObjectFieldsEmpty(formErrors)) {
      const error = await login(email, password, history);
      if (error) {
        this.setError(INPUT_NAMES.password, 'Login or password is incorrect');
      }
    }
  };

  setError = (name, value) => {
    this.setState((prevState) => ({ ...prevState, formErrors: { ...prevState.formErrors, [name]: value } }));
  };

  changeInputValue = ({ target: { name, value } }) => {
    this.setError(name, '');
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  render() {
    const { email, password, formErrors } = this.state;

    return (
      <div className={styles.login}>
        <Form className={styles.form} onSubmit={this.submitHandler}>
          <div className={styles.title}>Log In</div>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='text'
              value={email}
              onChange={this.changeInputValue}
              name={INPUT_NAMES.email}
              placeholder='Enter email'
              isInvalid={formErrors.email}
            />
            <Form.Control.Feedback type='invalid'>{formErrors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={this.changeInputValue}
              name={INPUT_NAMES.password}
              placeholder='Password'
              isInvalid={formErrors.password}
            />
            <Form.Control.Feedback type='invalid'>{formErrors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

LogIn.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};