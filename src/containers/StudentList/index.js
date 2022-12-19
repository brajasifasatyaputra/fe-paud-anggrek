import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchStudent } from '../../store/actions'
import classes from './index.module.scss';
import Navbar from "../../components/Navbar";
import Table from '../../components/TableStudent'
import BannerRegister from "../../components/Banner";
import Footer from "../../components/Footer";
import Whatsapp from '../../static/icon/whatsapp.webp'
import Location from '../../static/icon/location.webp'
import Email from '../../static/icon/email.webp'

const StudentList = () => {
  const students = useSelector((state) => state.mainReducer.students);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchStudent())
	},[])
  console.log(students, '<<< students');
	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Navbar />
				<div className={classes.body}>
          <p className={classes.title}>Data Siswa</p>
          <Table />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default StudentList;
