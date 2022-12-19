import React from "react";
import { useHistory } from "react-router-dom";
import classes from './index.module.scss';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TeacherProfle = ({ teacher }) => {
  const history = useHistory();

  const goToStudentList = () => {
    history.push('/student/list')
  }

	return (
		<div className={classes.container}>
      <div className={classes.wrapper}>
        <Navbar />
        <img className={classes.teacherImg} src={teacher?.image} alt='jumbotron' />
        <div className={classes.teacherName}>
          {teacher.nama}
        </div>
        <div className={classes.body}>
          <div className={classes.teacherBiodata}>
            <div className={classes.wrapper}>
              <p className={classes.title}>Biodata Guru</p>
              <div className={classes.mainContent}>
                <div className={classes.biodataContent}>
                  <p className={classes.label}>Nama Guru</p>
                  <div className={classes.name}>{teacher.nama}</div>
                  <p className={classes.label}>Jabatan</p>
                  <div className={classes.name}>{teacher.jabatan}</div>
                  <p className={classes.label}>No Telpon</p>
                  <div className={classes.name}>{teacher.no_telpon}</div>
                  <p className={classes.label}>Email</p>
                  <div className={classes.name}>{teacher.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.btn} onClick={goToStudentList}>
          <strong>
            Beri Penilaian Siswa/i
          </strong>
        </div>
      </div>
      <Footer />
    </div>
	);
};

export default TeacherProfle;
