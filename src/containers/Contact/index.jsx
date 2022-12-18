import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTestimony } from '../../store/actions'
import classes from './index.module.scss';
import Navbar from "../../components/Navbar";
import BannerRegister from "../../components/Banner";
import Footer from "../../components/Footer";
import Whatsapp from '../../static/icon/whatsapp.webp'
import Location from '../../static/icon/location.webp'
import Email from '../../static/icon/email.webp'

const AboutPage = () => {
  const testimonies = useSelector((state) => state.mainReducer.testimonies);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchTestimony())
	},[])

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Navbar />
				<div className={classes.body}>
					<div className={classes.btn}>
						Hubungi Kami
					</div>
					<div className={classes.mainBody}>
            <div className={classes.top}>
              <div className={classes.left}>
                <img src={Whatsapp} alt="whatsapp" />
                0812-8617-5278
              </div>
              <div className={classes.right}>
                <img src={Email} alt="email" />
                juwariyah234@gmail.com
              </div>
            </div>
            <div className={classes.bottom}>
              <img src={Location} alt="location" />
              Jl. Bendungan Melayu RT.008 RW.005 Kelurahan Tugu Selatan, Kecamatan Koja, Jakarta Utara
            </div>
					</div>
          <BannerRegister />
					<div className={classes.bodyBottom}>
            <div className={classes.left}>
              <div className={classes.btn}>
                <p>Pesan dan Kesan</p> 
                <p>SPS PAUD Anggrek 05</p>
              </div>
              <div className={classes.testimony}>
                {testimonies && testimonies.map((testimony) => {
                  return (
                    <div className={classes.testimonyWrapper}>
                      <div className={classes.name}>
                        {testimony?.nama}
                      </div>
                      <div className={classes.message}>
                        {testimony?.message}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={classes.right}>
              <div className={classes.btn}>
                <p>Lokasi</p> 
                <p>SPS PAUD Anggrek 05</p>
              </div>
              <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d432.22089908512936!2d106.90550683925458!3d-6.134274758495632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f59e278c6bf5%3A0xd4f91684d4bf0900!2sRani%20Maharani!5e0!3m2!1sid!2sid!4v1671283027060!5m2!1sid!2sid" width="600" height="600" style={{border: "0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AboutPage;
