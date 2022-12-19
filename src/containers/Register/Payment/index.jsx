import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { Alert, Paper } from '@mui/material';
import { useHistory } from "react-router";

import { paymentFulfillment } from "../../../store/actions";

import classes from './index.module.scss';
import Navbar from "../../../components/Navbar";
import BannerRegister from '../../../components/Banner';
import Footer from "../../../components/Footer";

const RegisterPayment = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [isLogin] = useState(!_.isEmpty(localStorage.getItem('access_token')))
	const [displayImg, setDisplayImg] = useState(null)
	const [input, setInput] = useState({});
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	console.log(isFailed, '<<< isFailed');
	useEffect(() => {
		// dispatch(fetchTeacher());
		// dispatch(fetchAssessment());
	},[])

	useEffect(() => {
		setTimeout(() => {
			setIsSuccess(false);
			setIsFailed(false)
		},3000)
	},[isSuccess, isFailed])

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleFormChange = (event) => {
		if (event.target.files) {
      let reader = new FileReader();
      reader.onload = (event) => {
        setDisplayImg(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
		const name = event.target.name;
		const value = event.target.value;
		setInput(values => ({...values, [name]: event.target.type === 'file' ? event.target.files : value}))

	};
	const onSubmitForm = (e) => {
		e.preventDefault();
		const formData = new FormData();
    formData.set('nama_bank', input.nama_bank);
    formData.set('pembayaran_pertama', input.pembayaran_pertama[0], input.pembayaran_pertama[0].name);
    formData.set('nama_pengirim', input.nama_pengirim);
    formData.set('metode_pembayaran', input.metode_pembayaran);
    formData.set('kode_pembayaran', input.kode_pembayaran);
		console.log(input, '<<< Input');
		
		dispatch(
			paymentFulfillment(
				formData,
				() => {
					setIsSuccess(true);
					setInput({
						nama_bank: '',
						nama_pengirim: '',
						metode_pembayaran: '',
						kode_pembayaran: '',
					});
					setDisplayImg(null);
					setTimeout(() => {
						history.push('/');
					},3000)
				},
				(error) => {
					setErrMsg(error);
					setIsFailed(true);
				}
			)
		)
	}

  return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Navbar />
				<div className={classes.body}>
					<div className={classes.teacherData}>
						<p className={classes.title}>Upload Bukti Pembayaran</p>
					</div>
				</div>
				<form className={classes.form} onSubmit={onSubmitForm}>
					{isSuccess && <Alert severity="success">Sukses Upload Bukti Pembayaran</Alert>}
					{isFailed && <Alert severity="error">{errMsg}</Alert>}
					<Paper className={classes.studentFormContainer}>
						<div className={classes.leftSection}>
							<div className={classes.inputColumn}>
								<label for="nama_pengirim">Nama Pengirim</label>
								<input required name='nama_pengirim' type='text' onChange={handleFormChange} value={input?.nama_pengirim} />
							</div>
							<div className={classes.inputColumn}>
								<label for="kode_pembayaran">Kode Pembayaran</label>
								<input required name='kode_pembayaran' type='text' onChange={handleFormChange} value={input?.kode_pembayaran} />
							</div>
							<div className={classes.inputRow}>
								<div className={classes.left}>
									<label for="metode_pembayaran">Metode Pembayaran</label>
									<select required name="metode_pembayaran" id="metode_pembayaran" className={classes.select} onChange={(e) => handleFormChange(e)}>
										<option disabled selected>-- Pilih --</option>
											<option value='Transfer'>Transfer</option>
											<option value='Tunai'>Tunai</option>
									</select>
								</div>
								<div className={classes.right}>
									<label for="nama_bank">Nama Bank</label>
									<input required name='nama_bank' type='text' onChange={handleFormChange} value={input?.nama_bank} />
								</div>
							</div>
						</div>
						<div className={classes.rightSection}>
							<img src={displayImg ? displayImg : "https://simasda.bandungkab.go.id/images/no-image-dataset.png"} />
              <input
                style={{ marginTop: '4%', marginLeft: '15%'}}
                onChange={(e) => handleFormChange(e)}
                type="file"
                name="pembayaran_pertama"
                required
              />
						</div>
					</Paper>
					<div className={classes.btnWrapper}>
						<button type="submit" className={classes.btn}>
							Submit
						</button>
					</div>
				</form>
				<Footer />
			</div>
		</div>
	);
};

export default RegisterPayment;