import React, { useState } from "react";
import classes from './index.module.scss';
import Navbar from "../../../components/Navbar";
import BannerRegister from '../../../components/Banner';
import Footer from "../../../components/Footer";
import secretary from '../../../static/images/secretary.webp';
import headmaster from '../../../static/images/headmaster.webp';
import treasurer from '../../../static/images/treasurer.webp';

const TeacherInformation = () => {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState({});
	console.log(input,'><>><><><><>');

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleScore = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInput(values => ({...values, [name]: value}))
	};

	const teacher = [
		{
			position : 'Sekretaris dan Pendidik',
			img : secretary,
			name : 'Dewi Lusiana',
			birthday : 'Jakarta, 15 November 1974',
			phone : '083896993935',
			email : 'dewilusi498@gmail.com',
			address : 'Jl. Bendungan Melayu RT 012 RW 05, Tugu Selatan, Koja, Jakarta Utara'
		},
		{
			position : 'Kepala Sekolah dan Pendidik',
			img : headmaster,
			name : 'Juariyah',
			birthday : 'Blitar, 27 Desember 1963',
			phone : '081286175278',
			email : 'juwariyah@gmail.com',
			address : 'Jl. Bendungan Melayu RT 07 RW 05, Tugu Selatan, Koja, Jakarta Utara'
		},
		{
			position : 'Bendahara dan Pendidik',
			img : treasurer,
			name : 'Nunung Nurhayati',
			birthday : 'Jakarta, 1 Januari 1972',
			phone : '089787987',
			email : 'nunungnurhayati010172@gmail.com',
			address : 'Jl. Bendungan Melayu RT 09 RW 05, Tugu Selatan, Koja, Jakarta Utara'
		}
	]

	const ponten = [
		{
			from : 'Kanaya',
			to : 'Ibu Dewi Lusiana',
			ponten : 'Ibu Dewi cantik'
		},
		{
			from : 'Kanaya',
			to : 'Ibu Dewi Lusiana',
			ponten : 'Ibu Dewi cantik'
		},
		{
			from : 'Kanaya',
			to : 'Ibu Dewi Lusiana',
			ponten : 'Ibu Dewi cantik'
		},
		{
			from : 'Kanaya',
			to : 'Ibu Dewi Lusiana',
			ponten : 'Ibu Dewi cantik'
		},
	]

  return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Navbar />
				<div className={classes.body}>
					<div className={classes.teacherData}>
						<p className={classes.title}>Data Guru pada SPS PAUD Anggrek 05</p>
						<div className={classes.teachers}>
							{teacher &&
							teacher.map((data, idx) => {
								return (
									<div className={classes.teacherCard} ke={idx}>
										<p className={classes.position}>{data.position}</p>
										<img className={classes.img} src={data.img} alt='teacher' />
										<p className={classes.name}>{data.name}</p>
										<p className={classes.data}>
											{data.birthday}<br/>
											{data.phone}<br/>
											{data.email}<br/>
											{data.address}
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
							{ponten &&
							ponten.map((data, idx) => {
								return (
									<div className={classes.pontenWrapper} key={idx}>
										<div className={classes.scorer}>
											<p>Dari : <span>Orang Tua Murid{data.from}</span></p>
											<p>Kepada : <span>{data.to}</span></p>
										</div>
										<div className={classes.ponten}><p>{data.ponten}</p></div>
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
							<div className={classes.upperSection}>
								<div className={classes.formScorer}>
									<div className={classes.name}>
										<p>Nama :</p>
										<input name='nama' type='text' onChange={handleScore} />
									</div>
									<div className={classes.contact}>
										<p>Kontak :</p>
										<input name='kontak' type='text' onChange={handleScore} />
									</div>
								</div>
								<div className={classes.candidatesWrapper}>
									<p>Penilaian Kepada : (pilih satu)</p>
									<div className={classes.candidatesScoring}>
										<button onClick={handleOpen}>Pilih</button>
										{open ? (
											<div className={classes.ul}>
												<p>Ibu Guru</p>
												<p>Ibu Juariyah</p>
												<p>Ibu Juariyah</p>
												<p>Ibu Nunung Nurhayati</p>
											</div>
										) : null}
									</div>
								</div>
							</div>
							<div className={classes.bottomSection}>
								<div className={classes.testimonialWrapper}>
									<p>Tuliskan Penilaian atau pesan dan kesan kepada pendidik SPS PAUD Anggrek 05 :</p>
									<textarea className={classes.txtarea} name='penilaian' type='text' onChange={handleScore} />
									<div className={classes.btn}>
										<p className={classes.send}>Kirim Penilaian</p>
										</div>
								</div>
							</div>
						</div>
					</div>
				</div>
					<Footer />
			</div>
		</div>
	);
};

export default TeacherInformation;