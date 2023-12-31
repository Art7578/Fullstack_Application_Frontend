import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import css from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log?')) {
      dispatch(logout());
      window.localStorage.removeItem('token')
    }
  };

  return (
    <div className={css.root}>
      <Container maxWidth="lg">
        <div className={css.inner}>
          <Link className={css.logo} to="/">
            <div>ARCHAKOV BLOG</div>
          </Link>
          <div className={css.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
