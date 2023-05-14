import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { checkAuth, signIn, signUp } from "../../utils/auth";
import { mainApi } from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [isInfoTooltipStatus, setIsInfoTooltipStatus] = useState('');

  const navigate = useNavigate();

  //управление формой регистрации
  const handleSignUp = async (data) => {
    try {
      await signUp(data);
      setIsLoggedIn(true);
      setCurrentUser({});
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus('success');
      navigate("/movies");
     
    } catch (err) {
      console.log(err);
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus('fail');
    }
  }

  //управление формой авторизации
  const handleSignIn = async (data) => {
    try {
      const { token } = await signIn(data);
      localStorage.setItem('jwt', token);
      setIsLoggedIn(true);
      navigate("/movies");
    } catch (err) {
      console.log(err);
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus('fail');
    }
  }

  //проверка токена
  useEffect(() => {
    if (!isLoggedIn) {
      return
    }

    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      checkAuth(jwt)
        .then((user) => {
          setCurrentUser(user)
          setIsLoggedIn(true);
          navigate("/movies");
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn])

  //выход пользователя со страницы
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null)
    setIsLoggedIn(false);
    navigate("/");
  }

  //получение информации о пользователе с сервера
  const getCurrentUserInfo = async () => {
    try {
      const currentUserInfo = await mainApi.getUserInfo();
      setCurrentUser(currentUserInfo);
    } catch (err) {
      console.log(err)
    }
  }

  //редактирование информации о пользователе
  const handleUpdateUserData = async (data) => {
    try {
      const updatedUserData = await mainApi.setUserInfo(data);
      setCurrentUser(updatedUserData);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUserInfo();
    }
  }, [isLoggedIn])

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpened(false);
    setIsInfoTooltipStatus('');
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                />
              </ProtectedRoute>
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onSignOut={handleSignOut}
                  onUpdateUserData={handleUpdateUserData}
                />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={
              <Register
                onSubmit={handleSignUp}
              />
            } />
            <Route path="/signin" element={
              <Login
                onSubmit={handleSignIn}
              />
            } />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <InfoTooltip
                isOpen={isInfoTooltipOpened}
                onClose={closeInfoTooltip}
                status={isInfoTooltipStatus}
                text={isInfoTooltipStatus === 'success' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
            />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;