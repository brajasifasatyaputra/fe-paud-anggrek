import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { Alert } from '@mui/material';

import { fetchTeacher, fetchAssessment, submitAssessment } from "../../../store/actions";

import classes from './index.module.scss';
import Navbar from "../../../components/Navbar";
import BannerRegister from '../../../components/Banner';
import Footer from "../../../components/Footer";
import secretary from '../../../static/images/secretary.webp';
import headmaster from '../../../static/images/headmaster.webp';
import treasurer from '../../../static/images/treasurer.webp';

const TeacherInformation = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [isLogin] = useState(!_.isEmpty(localStorage.getItem('access_token')))
	const [input, setInput] = useState({});
  const teachers = useSelector((state) => state.mainReducer.teachers);
  const assessments = useSelector((state) => state.mainReducer.assessments);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
	console.log(isFailed, '<<< isFailed');
	useEffect(() => {
		dispatch(fetchTeacher());
		dispatch(fetchAssessment());
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

	const handleScore = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInput(values => ({...values, [name]: value}))
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			submitAssessment(
				input,
				() => {
					setInput({});
					setIsSuccess(true);
				},
				() => {
					setIsFailed(true);
				}
			)
		)
		console.log(input, '<<< input')
	}

  return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Navbar />
				<div className={classes.body}>
					<div className={classes.teacherData}>
						<p className={classes.title}>Data Guru pada SPS PAUD Anggrek 05</p>
						<div className={classes.teachers}>
							{teachers &&
							teachers.map((data, idx) => {
								return (
									<div className={classes.teacherCard} ke={idx}>
										<p className={classes.position}>{data.jabatan}</p>
										<img className={classes.img} src={data.image} alt='teacher' />
										<p className={classes.name}>{data.nama}</p>
										<p className={classes.data}>
											{data.no_telpon}<br/>
											{data.email}<br/>
										</p>
									</div>
								)
							})
							}
						</div>
					</div>
					<div className={classes.teacherPonten}>
						<div className={classes.title}>Penilaian Pendidik SPS PAUD Anggrek 05</div>
						<div className={classes.pontenContainer}>
							{assessments &&
							assessments.map((data, idx) => {
								return (
									<div className={classes.pontenWrapper} key={idx}>
										<div className={classes.scorer}>
											<p>Dari : <span>{data?.nama}</span></p>
											<p>Kepada : <span>{data?.teacherAssessment?.nama}</span></p>
										</div>
										<div className={classes.ponten}><p>{data?.message}</p></div>
									</div>
									)
								})
							}
						</div>
					</div>
					<BannerRegister />
					<div className={classes.scoringContainer}>
						<div className={classes.title}>Beri Penilaian Pendidik SPS PAUD Anggrek 05</div>
						<div className={classes.scoring}>
							<form onSubmit={onSubmit}>
								{isSuccess && <Alert severity="success">Penilaian Berhasil Terkirim</Alert>}
								{isFailed && <Alert severity="error">Mohon Maaf, terjadi kesalahan pada sistem. Silakan coba lagi</Alert>}
								<div className={classes.upperSection}>
									<div className={classes.formScorer}>
										<div className={classes.name}>
											<p>Nama :</p>
											<input required name='nama' type='text' onChange={handleScore} />
										</div>
										<div className={classes.contact}>
											<p>Kontak :</p>
											<input required name='kontak' type='text' onChange={handleScore} />
										</div>
									</div>
									<div className={classes.candidatesWrapper}>
										<p>Penilaian Kepada : (pilih satu)</p>
										<div className={classes.candidatesScoring}>
											<select required name="id_guru" id="id_guru" className={classes.select} onChange={(e) => handleScore(e)}>
												<option disabled selected>-- Pilih Guru --</option>
												{teachers && teachers.map((teacher) => {
													return <option value={teacher.id}>{teacher.nama}</option>
												})}
											</select>
										</div>
									</div>
								</div>
								<div className={classes.bottomSection}>
									<div className={classes.testimonialWrapper}>
										<p>Tuliskan Penilaian atau pesan dan kesan kepada pendidik SPS PAUD Anggrek 05 :</p>
										<textarea className={classes.txtarea} name='message' type='text' onChange={handleScore} />
										<div className={classes.buttonWrapper}>
											<button type="submit" className={classes.btn}>
												<p className={classes.send}>Kirim Penilaian</p>
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default TeacherInformation;