import React from "react";
import classes from './index.module.scss';
import Navbar from '../../../components/Navbar';
import Footer from "../../../components/Footer";
import img from '../../../static/images/article.webp';

const ActivityInformation = () => {
	const article = [
		{
			img : img,
			title : 'Ekstrakulikuler Renang',
			subtitle : 'Olahraga renang selain bisa membuat tubuh lebih sehat juga bisa melatih anak lebih berani dan mandiri serta mengasah kemampuan motorik kasar anak melalui berenang.',
			date : 'Tiap bulan sekali hari Minggu'
		},
		{
			img : img,
			title : 'Pekan Olahraga dan Seni (Porseni)',
			subtitle : 'Merupakan sebuah wadah dimana kita dapat menyalurkan minat, bakat dan hobi khusunya bagi siswa. Dalam lingkup sekolah PORSENI biasanya dilaksanakan setiap tahunnya setelah semester.',
			date : 'Juli, 2022'
		},
		{
			img : img,
			title : 'Apresiasi Kemerdekaan RI',
			subtitle : 'Mengadakan perlombaan anak - anak ',
			date : 'Agustus, 2022'
		},
		{
			img : img,
			title : 'Ekstrakulikuler Renang',
			subtitle : 'Olahraga renang selain bisa membuat tubuh lebih sehat juga bisa melatih anak lebih berani dan mandiri serta mengasah kemampuan motorik kasar anak melalui berenang.',
			date : 'Tiap bulan sekali hari Minggu'
		},
		// {
		// 	img : img,
		// 	title : 'Pekan Olahraga dan Seni (Porseni)',
		// 	subtitle : 'Merupakan sebuah wadah dimana kita dapat menyalurkan minat, bakat dan hobi khusunya bagi siswa. Dalam lingkup sekolah PORSENI biasanya dilaksanakan setiap tahunnya setelah semester.',
		// 	date : 'Juli, 2022'
		// },
		// {
		// 	img : img,
		// 	title : 'Apresiasi Kemerdekaan RI',
		// 	subtitle : 'Mengadakan perlombaan anak - anak ',
		// 	date : 'Agustus, 2022'
		// },
	]

	const achievement = [
		{
			img : img,
			title : 'Juara I',
			category : 'memasukan bola kedalam keranjang',
			level : 'Tingkat PORSENI (Pekan Olahraga dan Seni)'
		},
		{
			img : img,
			title : 'Juara II',
			category : 'memasukan bola sesuai warna',
			level : 'Tingkat Gebyar Hari Anak'
		},
		{
			img : img,
			title : 'Juara III',
			category : 'Lari Estafet',
			level : 'Tingkat PORSENI (Pekan Olahraga dan Seni)'
		},
		// {
		// 	img : img,
		// 	title : 'Juara I',
		// 	category : 'memasukan bola kedalam keranjang',
		// 	level : 'Tingkat PORSENI (Pekan Olahraga dan Seni)'
		// },
		// {
		// 	img : img,
		// 	title : 'Juara II',
		// 	category : 'memasukan bola sesuai warna',
		// 	level : 'Tingkat Gebyar Hari Anak'
		// },
		// {
		// 	img : img,
		// 	title : 'Juara III',
		// 	category : 'Lari Estafet',
		// 	level : 'Tingkat PORSENI (Pekan Olahraga dan Seni)'
		// },
	]

  return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Navbar />
				<div className={classes.body}>
					<div className={classes.activityInformation}>
						<div className={classes.titleWrapper}>
							<p className={classes.title}>Informasi Kegiatan</p>
							<p className={classes.subtitle}>Beberapa kegiatan yang akan dilakukan selama satu periode</p>
						</div>
						<div className={classes.articleWrapper}>
							{article &&
							article.map((data, idx) => {
								return (
									<div className={classes.articleCard} key={idx}>
										<img className={classes.img} src={data.img} alt='activity' />
										<div className={classes.article}>
											<p className={classes.title}>{data.title}</p>
											<p className={classes.subtitle}>{data.subtitle}</p>
											<p className={classes.date}>{data.date}</p>
										</div>
									</div>
								)
							})
							}
						</div>
					</div>
					<div className={classes.achievementInformation}>
						<div className={classes.titleWrapper}>
							<p className={classes.title}>Informasi Prestasi</p>
							<p className={classes.subtitle}>Beberapa prestasi yang dihasilkan anak murid selama satu periode pembelajaran</p>
						</div>
						<div className={classes.achievementWrapper}>
							{achievement &&
							achievement.map((data, idx) => {
								return (
									<div className={classes.achievementCard} key={idx}>
										<img className={classes.img} src={data.img} alt='achievement' />
										<div className={classes.achievement}>
											<p className={classes.title}>	{data.title}</p>
											<p className={classes.category}>{data.category}</p>
											<p className={classes.level}>{data.level}</p>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default ActivityInformation;