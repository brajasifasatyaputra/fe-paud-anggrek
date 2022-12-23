import React, { useEffect, useState } from "react";
import _ from 'lodash';
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import Logo from "../../static/icon/logo.webp";
import useWindowDimensions from "../../utils/useWindowDimensions";
import classes from "./index.module.scss";
import Sidebar from "../Sidebar/index";
import Popup from '../Popup';
import { isLogin } from "../../store/actions";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [loginState, setIsLogin] = useState(!_.isEmpty(localStorage.getItem('access_token')));
  const [show, setShow] = useState(false);
  const [nameModal, setNameModal] = useState('');
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoginState = useSelector((state) => state.mainReducer.isLogin);

  const toggleModalLogin = () => {
    setShow(!show);
    setNameModal('login');
  };

  useEffect(() => {
    setIsLogin(!_.isEmpty(localStorage.getItem('access_token')));
  }, [isLoginState])

  const goToHome = () => {
    history.push("/");
  };
  const goToActivity = () => {
    history.push('/information/activity');
  };
  const goToTeacher = () => {
    history.push('/information/teacher');
  };
  const goToRegistration = () => {
    history.push('/information/registration');
  };
  const goToProfile = () => {
    history.push('./profile');
  };

  const logoutHanlder = () => {
    dispatch(isLogin(false));
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    history.push('/');
  }

  const { width } = useWindowDimensions();
  const [isShown, setIsShown] = useState(false);

  const Informationdropdown = () => {
    return (
      <>
        <div className={classes.dropdownContainer}>
          <div className={classes.dropdownWrapper}>
            <div className={classes.wrapper} onClick={goToActivity}>
              <div className={classes.activity} onMouseEnter={() => setIsShown(true)} >
                <p>Informasi Kegiatan</p>
              </div>
            </div>
            <div className={classes.wrapper} onClick={goToTeacher}>
              <div className={classes.activity} onMouseEnter={() => setIsShown(true)}>
                <p>Informasi Guru</p>
              </div>
            </div>
            <div className={classes.wrapper} onClick={goToRegistration}>
              <div className={classes.activitylast} onMouseEnter={() => setIsShown(true)} 
              
              >
                <p>Informasi Pendaftaran</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={classes.navbarContainer}>
      <div className={classes.logoWrapper}>
        <img className={classes.logo} src={Logo} alt='logo' onClick={goToHome} />
      </div>
        <div className={classes.menuWrapper}>
          <a className={location.pathname === "/" ? `${classes.active}` : ""}>
            <Link className="link" to="/">
              <p className={classes.dropdown}>
                Beranda
              </p>
            </Link>
          </a>
          <a className={location.pathname === "/about" ? `${classes.active}` : ""}>
            <Link className="link" to="/about">
              <p className={classes.dropdown}>
                Tentang Sekolah
              </p>
            </Link>
          </a>
          <a className={location.pathname === "/information/activity" ? `${classes.dropdownActive}` : `${classes.dropdownPassive}`} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
            <div className={classes.dropdownWrapper}>
              <p className={classes.dropdown} onClick={goToActivity}>
                Informasi
              </p>
              {isShown && Informationdropdown()}
            </div>
          </a>
          <a className={location.pathname === "/contact" ? `${classes.active}` : ""}>
            <Link className="link" to="/contact">
              <p className={classes.dropdown}>
                Hubungi Kami
              </p>
            </Link>
          </a>
          {loginState ? 
            <a className={location.pathname === "/profile" ? `${classes.active}` : ""}>
              <Link className="link" to="/profile">
                <p className={classes.dropdown}>
                  Profile
                </p>
              </Link>
            </a>
            :
            <a className={location.pathname === "/login" ? `${classes.active}` : ""}>
              <p className={classes.dropdown} onClick={toggleModalLogin}>
                Login
              </p>
            </a>
          }
          {loginState &&
            <a className={""}>
              <p className={classes.dropdown} onClick={logoutHanlder}>
                Logout
              </p>
            </a>
          }
          <Popup show={show} setShow={setShow}
            nameModal={nameModal} handleClose={setShow} 
            handleChangeModal={setNameModal}
          />
        </div>
    </div>
  );
};

export default Navbar;
