import React, { useState, useEffect } from "react";
import classes from './index.module.scss';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import { registerStudent, loginStudent } from '../../store/actions';

import logo from '../../static/icon/logo.webp';

const Popup = ({show, nameModal, handleClose, handleChangeModal}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isStudent, setIsStudent] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  console.log(errMsg, 'errMsgerrMsg');
  console.log(isFailed,'isFailed');
  
  const [formRegister, setFormRegister] = useState({
    nama_lengkap: '',
    nik_anak: '',
    email: '',
    password: ''
  });

  const passwordValidation = () => {
    if (formRegister.password !== formRegister.retypePassword) {
      // alert('password tidak sama') // belum di handle
      setIsFailed(true);
      setErrMsg('Password Tidak Sama')
      return false;
    }
    return true;
  };

  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const onSubmitRegister = (e) => {
    e.preventDefault();
    if (passwordValidation()) {
      dispatch(registerStudent(formRegister, () => {
        history.push('/');
        handleClose(false);
      }, 
      (error) => {
        setErrMsg(error);
        setIsFailed(true);
      }));
    };
  };
  const onSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(loginStudent(formLogin,
      (error) => {
        setErrMsg(error);
        setIsFailed(true);
      },
      () => {
        history.push('/');
        handleClose(false);
        setFormLogin('');
      },
      isStudent
    ));
  };

  const register = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };
  const login = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLogin = (e) => handleChangeModal('login');
  const handleChangeRegister = (e) => handleChangeModal('register');

  const handleXRegister = () => {
    handleClose(false);
    handleChangeModal('');
  };

  const handleXLogin = () => {
    handleClose(false);
    handleChangeModal('')
  };

  useEffect(() => {
    setTimeout(() => {
      setIsFailed(false);
      setErrMsg('');  
    }, 3000)
  }, [isFailed]);

  const AlertFailed = () => {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errMsg}<strong> Try Again</strong>
        </Alert>
      </Stack>
    );
  };

  const modalRegister = () => {
    return (
      <>
        <div className={classes.overlayX} onClick={handleXRegister} />
        <div className={classes.popupRegister}>
          <img src={logo} alt='logo' />
          <div className={classes.border} />
            <p>Daftar Akun</p>
            <div className={classes.body}>
              <form className={classes.formRegister} onSubmit={onSubmitRegister}>
                <input type='text' placeholder='Nama Lengkap' 
                  name='nama_lengkap' value={formRegister.nama_lengkap} onChange={register} required
                />
                <input type='text' placeholder='NIK'
                  name='nik_anak' value={formRegister.nik_anak} onChange={register} required
                />
                <input type='text' placeholder='Email'
                  name='email' value={formRegister.email} onChange={register} required
                />
                <input type='password' placeholder='Masukan kata Sandi'
                  name='password' value={formRegister.password} onChange={register} required
                />
                <input type='password' placeholder='Ulangi kata Sandi'
                  name='retypePassword' value={formRegister.retypePassword} onChange={register} required
                />
                <div className={classes.btn} type='submit'>
                  <button className={classes.btnRegister} type="submit">Daftar Akun</button>
                </div>
              </form>
            </div>
            <div>
              <span>Sudah Memiliki Akun ? <strong onClick={handleChangeLogin}>Klik Disini</strong></span>
            </div>
            {isFailed && AlertFailed()} 
            {/* alert belum fix */}
          </div>
      </>
    );
  };

  const modalLogin = () => {
    return (
      <>
        <div className={classes.overlayX} onClick={handleXLogin} />
        <div className={classes.popupLogin}>
          <img src={logo} alt='logo' />
          <div className={classes.border} />
          <p>Login</p>
          <div className={classes.body}>
            <form className={classes.formLogin} onSubmit={onSubmitLogin}>
              <input type='text' placeholder='Email'
                name='email' value={formLogin.email} onChange={login} required
              />
              <input type='password' placeholder='Masukan kata Sandi' 
                name='password' value={formLogin.password} onChange={login} required
              />
              <div className={classes.btn}>
                <button className={classes.btnLogin} type='submit'>Login</button>
                <span className={classes.roleWrapper}>Login sebagai {isStudent ? 'Guru' : 'Siswa'} <strong onClick={() => setIsStudent(!isStudent)}>Klik Disini</strong></span>
              </div>
            </form>
          </div>
          <div>
            <span>Belum Memiliki Akun ? 
              <strong onClick={handleChangeRegister}> Klik Disini</strong>
            </span>
          </div>
          {isFailed && AlertFailed()}
          {/* alert belum fix */}
        </div>
      </>
    )
  }
  return !show ? '' : (nameModal === 'login' ? modalLogin() : modalRegister());
}

export default Popup;
