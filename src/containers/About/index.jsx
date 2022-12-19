import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGallery } from '../../store/actions'
import classes from './index.module.scss';
import Navbar from "../../components/Navbar";
import BannerRegister from "../../components/Banner";
import Footer from "../../components/Footer";
import profile from '../../static/data/about';
import structure from '../../static/images/structure.webp';

const AboutPage = () => {
  const galleries = useSelector((state) => state.mainReducer.galleries);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchGallery())
	},[])

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Navbar />
				<div className={classes.body}>
					<div className={classes.btn}>
						Tentang Sekolah
					</div>
					<div className={classes.mainBody}>
						<div className={classes.profileWrapper}>
							<p className={classes.title}>Profile Sekolah</p>
							<p className={classes.profile}>{profile.title}</p>
							<ul>
								<li>
									<div className={classes.li}>
										<p>Hari</p><span><p className={classes.content}>: {profile.day}</p></span>
									</div>
								</li>
								<li>
									<div className={classes.li}>
										<p>Pukul</p><span><p className={classes.content}>: {profile.hour}</p></span>
									</div>
								</li>
								<li>
									<div className={classes.li}>
										<p>Alamat</p><span><p className={classes.content}>: {profile.address}</p></span>
									</div>
								</li>
							</ul>
						</div>
						<div className={classes.photo}>
							<img src={profile.img} alt={'about'} />
						</div>
					</div>
					<div className={classes.subDetails}>
						<div className={classes.leftDetails}>
							<strong><p>Visi</p></strong>
							<p>{profile.vision}</p>
							<strong><p>Misi</p></strong>
							<ul>
								<li>
									{profile.mission1}
								</li>
								<li>
									{profile.mission2}
								</li>
							</ul>
						</div>
						<div className={classes.rightDetails}>
							<strong><p>Tujuan</p></strong>
							<ul>
								<li>
									{profile.purpose1}
								</li>
								<li>
									{profile.purpose2}
								</li>
								<li>
									{profile.purpose3}
								</li>
							</ul>
						</div>
					</div>
					<div className={classes.structure}>
						<img src={structure} alt={'structure'} />
					</div>
					<BannerRegister />
					<div className={classes.galleryWrapper}>
						<div className={classes.btn}>
							Gallery Sekolah
						</div>
						<div className={classes.content}>
							{galleries &&
							galleries.map((data, idx) => {
								return (
									<div className={classes.card} key={idx}>
										<div className={classes.photoWrapper}>
											<img src={data.image} alt='gallery' />
										</div>
											<p>{data.title}</p>
									</div>
								)
							})
							}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AboutPage;
