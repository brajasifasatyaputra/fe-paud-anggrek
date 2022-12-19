import React, { useState, useEffect } from "react";
import classes from './index.module.scss';
import Popup from "../Popup";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import _ from 'lodash';

export const BannerRegister = () => {
	const [show, setShow] = useState(false);
  const [nameModal, setNameModal] = useState('');
	const [isLogin, setIsLogin] = useState(!_.isEmpty(localStorage.getItem('access_token')));
  const isLoginState = useSelector((state) => state.mainReducer.isLogin);
	const history = useHistory();

	useEffect(() => {
    setIsLogin(!_.isEmpty(localStorage.getItem('access_token')));
  }, [isLoginState])

	const goToRegisterFulfillment = () => {
		history.push('/register/fulfillment')
	}

	const toggleModalRegister = () => {
    setShow(!show);
    setNameModal('register');
  };

	return (
		<div className={classes.container}>
			<div className={classes.titleWrapper}>
				<p className={classes.title}>BERMINAT SEKOLAH DI SPS PAUD ANGGREK 05 ?</p>
				<p className={classes.subtitle}>Untuk melakukan pendaftaran silahkan buat akun dulu yaa...</p>
			</div>
			<div className={classes.btnWrapper}>
			{!isLogin ?
				<div className={classes.btn} onClick={toggleModalRegister}>
					Daftar Akun
				</div>
				:
				<div className={classes.btn} onClick={goToRegisterFulfillment}>
					Isi Formulir<br/>Pendaftaran
				</div>
			}
			<Popup show={show} setShow={setShow}
				nameModal={nameModal} handleClose={setShow} 
				handleChangeModal={setNameModal}
			/>
			</div>
		</div>
	);
};

export default BannerRegister;
