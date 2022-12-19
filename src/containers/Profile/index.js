import React, { useEffect } from 'react';
import classes from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentProfile, getTeacherProfile } from '../../store/actions';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import jumbotron from '../../static/images/jumbotron.webp';

const Profile = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.mainReducer.student);
  console.log(student, 'student');

  useEffect(() => {
    const role = localStorage.getItem('role');
    console.log(role, '<<< role')
    if (role === '2') {
      dispatch(getStudentProfile());
    } else {
      console.log('masuk else')
      dispatch(getTeacherProfile())
    }
  }, [])
  
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Navbar />
        <img className={classes.jumbptron} src={jumbotron} alt='jumbotron' />
        <div className={classes.mainTitle}>
          Profile
        </div>
        <div className={classes.body}>
          <div className={classes.biodataWrapper}>
            <p className={classes.title}>Biodata Siswa</p>
            <div className={classes.wrapper}>
              <div className={classes.biodata}>
                <p className={classes.label}>Nama Siswa</p>
                <div className={classes.name}>Nama </div>
                <p className={classes.label}>NISN</p>
                <div className={classes.name}>Nama </div>
                <p className={classes.label}>NIK</p>
                <div className={classes.name}>Nama </div>
                <p className={classes.label}>Jenis Kelamin</p>
                <div className={classes.name}>Nama </div>
                <p className={classes.label}>Tempat, Tanggal Lahir</p>
                <div className={classes.name}>Nama </div>
                <p className={classes.label}>Kelompok Belajar</p>
                <div className={classes.name}>Nama </div>
                <p className={classes.label}>Kode Pembayaran</p>
                <div className={classes.name}>Nama </div>
                <p className={classes.label}>Alamat</p>
                <div className={classes.name}>Nama</div>
              </div>
              <div className={classes.document}>
                <p className={classes.statusTitle}>Status Pendaftaran</p>
                <div className={classes.status}>Status</div>
                <img alt='avatar' />
                <div>Lihat Sertifikat</div>
              </div>
            </div>
          </div>
          <div className={classes.parentBiodataWrapper}>
            <p className={classes.title}>Data Orang Tua/Wali Siswa/i</p>
            <div className={classes.wrapper}>
              <div className={classes.biodataFather}>
                <p className={classes.label}>Nama Ayah</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>No. Telpon</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>Jenis Kelamin</p>  
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>Tempat, Tanggal Lahirh</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>No. KTP Ayah</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>Pekerjaan Ayah</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>Alamat</p>
                <div className={classes.name}>Nama</div>
              </div>
              <div className={classes.biodataMother}>
                <p className={classes.label}>Nama Ibu</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>No. Telpon</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>Jenis Kelamin</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>Tempat, Tanggal Lahir</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>No. KTP Ibu</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>Pekerjaan Ibu</p>
                <div className={classes.name}>Nama</div>
                <p className={classes.label}>Alamat</p>
                <div className={classes.name}>Nama</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile