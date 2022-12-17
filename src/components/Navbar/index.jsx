import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
// import Logo from "../../static/images/logo.webp";
import Logo from "../../static/icon/logo.webp";
import useWindowDimensions from "../../utils/useWindowDimensions";
import classes from "./index.module.scss";
import Sidebar from "../Sidebar/index";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
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
  const { width } = useWindowDimensions();
  const [isShown, setIsShown] = useState(false);

  const Informationdropdown = () => {
    return (
      <>
        {/* <div className={classes.overlayX} onMouseLeave={() => setIsShown(true)}> */}
        {/* <div className={classes.overlayX}> */}
          <div className={classes.dropdownContainer}>
            <div className={classes.dropdownWrapper}>
              <div className={classes.wrapper} onClick={goToActivity}>
                <div className={classes.activity} onMouseEnter={() => setIsShown(true)}>
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
                onMouseLeave={() => setIsShown(false)}
                >
                  <p>Informasi Pendaftaran</p>
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
      </>
    );
  };

  return (
    <div className={classes.navbarContainer}>
      <div className={classes.logoWrapper}>
        <img className={classes.logo} src={Logo} alt='logo' onClick={goToHome} />
      </div>
      {width === "lg" ? (
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
          <a className={location.pathname === "/information/activity" ? `${classes.dropdownActive}` : `${classes.dropdownPassive}`} onMouseEnter={() => setIsShown(true)}>
            <div className={classes.dropdownWrapper} 
            // onMouseEnter={() => setIsShown(true)}
            >
              {/* <Link className="link" to="/information/activity"> */}
                <p className={classes.dropdown} onClick={goToActivity}
                // onMouseEnter={() => setIsShown(true)}
                >
                {/* onMouseLeave={() => setIsShown(false)}> */}
                  Informasi
                </p>
                {isShown && Informationdropdown()}
              {/* </Link> */}
            </div>
          </a>
          <a className={location.pathname === "/contact" ? `${classes.active}` : ""}>
            <Link className="link" to="/contact">
              <p className={classes.dropdown}>
                Hubungi Kamu
              </p>
            </Link>
          </a>
          <a className={location.pathname === "/login" ? `${classes.active}` : ""}>
            <Link className="link" to="/login">
              <p className={classes.dropdown}>
                Login
              </p>
            </Link>
          </a>
        </div>
      ) : (
        <Sidebar />
      )}
    </div>
  );
};

export default Navbar;
