import React, {useState} from "react";
import classes from './index.module.scss';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { registerStudent } from '../../store/actions';

import logo from '../../static/icon/logo.webp';

const Popup = ({show, nameModal, handleClose, handleChangeModal}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isStudent, setIsStudent] = useState(true);

  const [formRegister, setFormRegister] = useState({
    nama_lengkap: '',
    nik_anak: '',
    email: '',
    password: ''
  });

  const passwordValidation = () => {
    if (formRegister.password !== formRegister.retypePassword) {
      alert('password tidak sama')
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
      console.log('lolos validasi');
      dispatch(registerStudent(formRegister, () => {
        history.push('/');
        handleClose(false);
      }));
    };
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
            <form className={classes.formLogin}>
              <input type='text' placeholder='Email'
                name='email' value={formLogin.email} onChange={login} required
              />
              <input type='password' placeholder='Masukan kata Sandi' 
                name='password' value={formLogin.password} onChange={login} required
              />
              <div className={classes.btn}>
                <button className={classes.btnLogin} type='submit'>Login</button>
                <span className={classes.roleWrapper}>Login sebagai {isStudent ? 'Siswa' : 'Guru'} <strong onClick={() => setIsStudent(!isStudent)}>Klik Disini</strong></span>
              </div>
            </form>
          </div>
          <div>
            <span>Belum Memiliki Akun ? 
              <strong onClick={handleChangeRegister}> Klik Disini</strong>
            </span>
          </div>
        </div>
      </>
    )
  }
  return !show ? '' : (nameModal === 'login' ? modalLogin() : modalRegister());
}

export default Popup;
