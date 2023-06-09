import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [isInfoTooltipStatus, setIsInfoTooltipStatus] = useState('');
  const [isAppInit, setIsAppInit] = useState(false);

  const navigate = useNavigate();

  //управление формой регистрации
  const handleSignUp = async ({ name, email, password }) => {
    try {
      await signUp({ name, email, password });
      const { token } = await signIn({ email, password });
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus('success');
      localStorage.setItem('jwt', token);
      setIsLoggedIn(true);
      navigate("/movies");

    } catch (err) {
      console.log(err);
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus('fail');
    }
  }

  //управление формой авторизации
  const handleSignIn = async ({ email, password }) => {
    try {
      const { token } = await signIn({ email, password });
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
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      checkAuth(jwt)
        .then((user) => {
          setCurrentUser(user)
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsAppInit(true)
        })
    } else {
      setIsAppInit(true)
    }
  }, [])

  //выход пользователя со страницы
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('isShort');
    localStorage.removeItem('search');
    localStorage.removeItem('allSavedMovies');
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
  const handleUpdateUserData = async ({ name, email }) => {
    try {
      const updatedUserData = await mainApi.setUserInfo({ name, email });
      //console.log(updatedUserData);
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus('success');
      setCurrentUser(updatedUserData);

    } catch (err) {
      console.log(err)
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus('fail');
    }
  }

  //хук получения данных пользователя при входе
  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUserInfo();
    }
  }, [isLoggedIn])

  //закрытие попапа infoTooltip
  const closeInfoTooltip = () => {
    setIsInfoTooltipOpened(false);
    setIsInfoTooltipStatus('');
  }

  if (!isAppInit) {
    return null
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies />
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
              isLoggedIn 
              ? <Navigate to="/"/> 
              :
              <Register
                onSubmit={handleSignUp}
              />
            } />
            <Route path="/signin" element={
              isLoggedIn 
              ? <Navigate to="/"/> 
              :
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
          text={isInfoTooltipStatus === 'success' ? 'Успешно!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;