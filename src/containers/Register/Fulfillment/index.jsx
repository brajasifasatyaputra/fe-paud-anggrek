import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { Alert, Paper } from '@mui/material';
import { useHistory } from "react-router";

import { profileFulfillment } from "../../../store/actions";

import classes from './index.module.scss';
import Navbar from "../../../components/Navbar";
import BannerRegister from '../../../components/Banner';
import Footer from "../../../components/Footer";

const RegisterFulfillment = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [isLogin] = useState(!_.isEmpty(localStorage.getItem('access_token')))
	const [displayImg, setDisplayImg] = useState(null)
	const [input, setInput] = useState({});
  const teachers = useSelector((state) => state.mainReducer.teachers);
  const assessments = useSelector((state) => state.mainReducer.assessments);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
	// console.log(isFailed, '<<< isFailed');
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
    formData.set('nama_panggilan', input.nama_panggilan);
    formData.set('foto_murid', input.foto_murid[0], input.foto_murid[0].name);
    formData.set('jenis_kelamin', input.jenis_kelamin);
    formData.set('tempat_lahir', input.tempat_lahir);
    formData.set('agama', input.agama);
    formData.set('kewarganegaraan', input.kewarganegaraan);
    formData.set('anak_ke_dari', input.anak_ke_dari);
    formData.set('tinggi_badan', input.tinggi_badan);
    formData.set('berat_badan', input.berat_badan);
    formData.set('alamat_rumah', input.alamat_rumah);
    formData.set('penyakit_diderita', input.penyakit_diderita);
    formData.set('penyakit_berat', input.penyakit_berat);
    formData.set('pantangan_makan', input.pantangan_makan);
    formData.set('nama_ayah', input.nama_ayah);
    formData.set('telpon_ayah', input.telpon_ayah);
    formData.set('pendidikan_ayah', input.pendidikan_ayah);
    formData.set('agama_ayah', input.agama_ayah);
    formData.set('penghasilan_ayah', input.penghasilan_ayah);
    formData.set('nama_ibu', input.nama_ibu);
    formData.set('pekerjaan_ibu', input.pekerjaan_ibu);
    formData.set('telpon_ibu', input.telpon_ibu);
    formData.set('agama_ibu', input.agama_ibu);
    formData.set('pendidikan_ibu', input.pendidikan_ibu);
    formData.set('penghasilan_ibu', input.penghasilan_ibu);
    formData.set('pekerjaan_ayah', input.pekerjaan_ayah);
		
		dispatch(
			profileFulfillment(
				formData,
				() => {
					setInput({});
					history.push('/register/upload-document');
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
						<p className={classes.title}>Formulir Pendaftaran</p>
					</div>
				</div>
				<form className={classes.form} onSubmit={onSubmitForm}>
					<Paper className={classes.studentFormContainer}>
						<div className={classes.leftSection}>
							<p>Data Siswa</p>
							<div className={classes.inputColumn}>
								<label for="nama_panggilan">Nama Panggilan</label>
								<input required name='nama_panggilan' type='text' onChange={handleFormChange} />
							</div>
							<div className={classes.inputRow}>
								<div className={classes.left}>
									<label for="jenis_kelamin">Jenis Kelamin</label>
									<select required name="jenis_kelamin" id="jenis_kelamin" className={classes.select} onChange={(e) => handleFormChange(e)}>
										<option disabled selected>-- Pilih --</option>
											<option value='Laki - Laki'>Laki - Laki</option>
											<option value='Perempuan'>Perempuan</option>
									</select>
								</div>
								<div className={classes.right}>
									<label for="tempat_lahir">Tempat Tanggal Lahir</label>
									<input required name='tempat_lahir' type='text' onChange={handleFormChange} />
								</div>
							</div>
							<div className={classes.inputRow}>
								<div className={classes.left}>
									<label for="agama">Agama</label>
									<input required name='agama' type='text' onChange={handleFormChange} />
								</div>
								<div className={classes.right}>
									<label for="kewarganegaraan">Kewarganegaraan</label>
									<input required name='kewarganegaraan' type='text' onChange={handleFormChange} />
								</div>
							</div>
							<div className={classes.inputThreeRow}>
								<div className={classes.left}>
									<label for="anak_ke_dari">Anak Ke Dari</label>
									<input required name='anak_ke_dari' type='text' onChange={handleFormChange} />
								</div>
								<div className={classes.mid}>
									<label for="tinggi_badan">Tinggi Badan</label>
									<input required name='tinggi_badan' type='text' onChange={handleFormChange} />
								</div>
								<div className={classes.right}>
									<label for="berat_badan">Berat Badan</label>
									<input required name='berat_badan' type='text' onChange={handleFormChange} />
								</div>
							</div>
							<div className={classes.inputColumn}>
								<label for="alamat_rumah">Alamat Rumah</label>
								<textarea required name='alamat_rumah' type='text' onChange={handleFormChange} />
							</div>
							<div className={classes.inputThreeRow}>
								<div className={classes.left}>
									<label for="penyakit_diderita">Penyakit Diderita</label>
									<input required name='penyakit_diderita' type='text' onChange={handleFormChange} />
								</div>
								<div className={classes.mid}>
									<label for="penyakit_berat">Penyakit Berat</label>
									<input required name='penyakit_berat' type='text' onChange={handleFormChange} />
								</div>
								<div className={classes.right}>
									<label for="pantangan_makan">Pantangan Makan</label>
									<input required name='pantangan_makan' type='text' onChange={handleFormChange} />
								</div>
							</div>
						</div>
						<div className={classes.rightSection}>
							<img src={displayImg ? displayImg : "https://simasda.bandungkab.go.id/images/no-image-dataset.png"} />
              <input
                style={{ marginTop: '4%', marginLeft: '15%'}}
                onChange={(e) => handleFormChange(e)}
                type="file"
                name="foto_murid"
                required
              />
						</div>
					</Paper>
					<Paper className={classes.fatherFormContainer}>
						<p>Data Ayah</p>
						<div className={classes.inputThreeRow}>
							<div className={classes.left}>
								<label for="nama_ayah">Nama Ayah</label>
								<input required name='nama_ayah' type='text' onChange={handleFormChange} />
							</div>
							<div className={classes.mid}>
								<label for="telpon_ayah">Telpon Ayah</label>
								<input required name='telpon_ayah' type='text' onChange={handleFormChange} />
							</div>
							<div className={classes.right}>
								<label for="agama_ayah">Agama Ayah</label>
								<input required name='agama_ayah' type='text' onChange={handleFormChange} />
							</div>
						</div>
						<div className={classes.inputThreeRow}>
							<div className={classes.left}>
								<label for="pendidikan_ayah">Pendidikan Ayah</label>
								<input required name='pendidikan_ayah' type='text' onChange={handleFormChange} />
							</div>
							<div className={classes.mid}>
								<label for="pekerjaan_ayah">Pekerjaan Ayah</label>
								<input required name='pekerjaan_ayah' type='text' onChange={handleFormChange} />
							</div>
							<div className={classes.right}>
								<label for="penghasilan_ayah">Penghasilan Ayah</label>
								<select required name="penghasilan_ayah" id="penghasilan_ayah" className={classes.select} onChange={(e) => handleFormChange(e)}>
									<option disabled selected>-- Pilih --</option>
										<option value='Kurang Dari 3 Juta'>Kurang Dari 3 Juta</option>
										<option value='3 Sampai 5 Juta'>3 Sampai 5 Juta</option>
										<option value='Lebih Dari 5 Juta'>Lebih Dari 5 Juta</option>
								</select>
							</div>
						</div>
					</Paper>
					<Paper className={classes.motherFormContainer}>
						<p>Data Ibu</p>
						<div className={classes.inputThreeRow}>
							<div className={classes.left}>
								<label for="nama_ibu">Nama Ibu</label>
								<input required name='nama_ibu' type='text' onChange={handleFormChange} />
							</div>
							<div className={classes.mid}>
								<label for="telpon_ibu">Telpon Ibu</label>
								<input required name='telpon_ibu' type='text' onChange={handleFormChange} />
							</div>
							<div className={classes.right}>
								<label for="agama_ibu">Agama Ibu</label>
								<input required name='agama_ibu' type='text' onChange={handleFormChange} />
							</div>
						</div>
						<div className={classes.inputThreeRow}>
							<div className={classes.left}>
								<label for="pendidikan_ibu">Pendidikan Ibu</label>
								<input required name='pendidikan_ibu' type='text' onChange={handleFormChange} />
							</div>
							<div className={classes.mid}>
								<label for="pekerjaan_ibu">Pekerjaan Ibu</label>
								<input required name='pekerjaan_ibu' type='text' onChange={handleFormChange} />
							</div>
							<div className={classes.right}>
								<label for="penghasilan_ibu">Penghasilan Ibu</label>
								<select required name="penghasilan_ibu" id="penghasilan_ibu" className={classes.select} onChange={(e) => handleFormChange(e)}>
									<option disabled selected>-- Pilih --</option>
										<option value='Kurang Dari 3 Juta'>Kurang Dari 3 Juta</option>
										<option value='3 Sampai 5 Juta'>3 Sampai 5 Juta</option>
										<option value='Lebih Dari 5 Juta'>Lebih Dari 5 Juta</option>
								</select>
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

export default RegisterFulfillment;