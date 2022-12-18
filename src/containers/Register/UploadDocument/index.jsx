import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { Alert, Paper } from '@mui/material';
import { useHistory } from "react-router";

import { uploadDocument } from "../../../store/actions";

import classes from './index.module.scss';
import Navbar from "../../../components/Navbar";
import BannerRegister from '../../../components/Banner';
import Footer from "../../../components/Footer";

const UploadDocument = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [isLogin] = useState(!_.isEmpty(localStorage.getItem('access_token')))
	const [kartuKeluarga, setKartuKeluarga] = useState(null)
	const [aktaLahir, setAktaLahir] = useState(null)
	const [input, setInput] = useState({});
  const teachers = useSelector((state) => state.mainReducer.teachers);
  const assessments = useSelector((state) => state.mainReducer.assessments);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
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
			console.log(event.target.name, '<<<< event')
			if (event.target.name === 'kartu_keluarga') {
				reader.onload = (event) => {
					setKartuKeluarga(event.target.result)
				};
				reader.readAsDataURL(event.target.files[0]);
			} else {
				reader.onload = (event) => {
					setAktaLahir(event.target.result);
				};
				reader.readAsDataURL(event.target.files[0]);

			}
    }
		const name = event.target.name;
		const value = event.target.value;
		setInput(values => ({...values, [name]: event.target.type === 'file' ? event.target.files : value}))

	};
	const onSubmitForm = (e) => {
		e.preventDefault();
		const formData = new FormData();
    formData.set('kartu_keluarga', input.kartu_keluarga[0], input.kartu_keluarga[0].name);
    formData.set('akta_kelahiran', input.akta_kelahiran[0], input.akta_kelahiran[0].name);
		
		dispatch(
			uploadDocument(
				formData,
				() => {
					setInput({});
					history.push('/register/payment');
				},
				() => {
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
						<p className={classes.title}>Upload Dokuemen Siswa</p>
					</div>
				</div>
				<form className={classes.form} onSubmit={onSubmitForm}>
					<Paper className={classes.formWrapper}>
						<div className={classes.fileWrapper}>
							<p>Kartu Keluarga</p>
							<div className={classes.top}>
								<img src={kartuKeluarga ? kartuKeluarga : "https://simasda.bandungkab.go.id/images/no-image-dataset.png"} />
								<input
									style={{ marginTop: '4%', marginLeft: '15%'}}
									onChange={(e) => handleFormChange(e)}
									type="file"
									name="kartu_keluarga"
									required
								/>
							</div>
						</div>
						<div className={classes.fileWrapper}>
							<p>Akta Kelahiran</p>
							<div className={classes.top}>
								<img src={aktaLahir ? aktaLahir : "https://simasda.bandungkab.go.id/images/no-image-dataset.png"} />
								<input
									style={{ marginTop: '4%', marginLeft: '15%'}}
									onChange={(e) => handleFormChange(e)}
									type="file"
									name="akta_kelahiran"
									required
								/>
							</div>
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

export default UploadDocument;