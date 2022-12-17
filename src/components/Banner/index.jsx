import React from "react";
import classes from './index.module.scss';

export const BannerRegister = () => {
	const isLogin = true;

	return (
		<div className={classes.container}>
			<div className={classes.titleWrapper}>
				<p className={classes.title}>BERMINAT SEKOLAH DI SPS PAUD ANGGREK 05 ?</p>
				<p className={classes.subtitle}>Untuk melakukan pendaftaran silahkan buat akun dulu yaa...</p>
			</div>
			<div className={classes.btnWrapper}>
			{isLogin ?
				<div className={classes.btn}>
					Daftar Akun
				</div>
				:
				<div className={classes.btn}>
					Isi Formulir<br/>Pendaftaran
				</div>
			}
			</div>
		</div>
	);
};

export default BannerRegister;
