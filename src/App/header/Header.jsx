import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signOut } from 'firebase/auth';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.css';
import { auth } from '../../scripts/firebase-config';

export function Header({ user }) {
  const logOut = async () => {
    await signOut(auth);
  };
  const userName = user && user.email ? user.email.split('@')[0] : '';

  return (
    <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark' className={styles.header}>
      <Container className={styles.container}>
        <Navbar.Brand>DIMS</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        {user ? (
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className={`${styles.links} me-auto`}>
              <NavLink to='/users' activeClassName={styles.active}>
                Members
              </NavLink>
              <NavLink to='/tasks' activeClassName={styles.active}>
                Tasks
              </NavLink>
              <NavLink to='/about' activeClassName={styles.active}>
                About
              </NavLink>
            </Nav>
            <Nav className={styles.user}>
              <Navbar.Text>{userName}</Navbar.Text>
              <NavLink to='/login' onClick={logOut} activeClassName={styles.active}>
                Log out
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className={`${styles.links} me-auto`}>
              <NavLink to='/about' activeClassName={styles.active}>
                About
              </NavLink>
            </Nav>
            <Nav>
              <NavLink to='/login' activeClassName={styles.active}>
                Log In
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string }),
};
Header.defaultProps = {
  user: null,
};