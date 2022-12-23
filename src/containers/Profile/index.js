import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getStudentProfile, getTeacherProfile } from '../../store/actions';
import { postTestimony } from '../../store/actions';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TeacherProfile from '../../components/TeacherProfile';
import jumbotron from '../../static/images/jumbotron.webp';
import { Alert } from '@mui/material';

const Profile = () => {
  const [input, setInput] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
  const [userRole, setUserRole] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useSelector((state) => state.mainReducer.student);
  const teacher = useSelector((state) => state.mainReducer.teacher);
  const img = 'https://tse1.mm.bing.net/th?id=OIP.zsaaVp0tIiSnOK-1rYpBnwAAAA&pid=Api&P=0';

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    if (role === '2') {
      dispatch(getStudentProfile());
    } else {
      dispatch(getTeacherProfile())
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsFailed(false);
      setIsSuccess(false);
    },3000)

  },[isSuccess, isFailed])

  const handleTestimony = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput(values => ({...values, [name]: value}))
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      postTestimony(
        input,
        () => {
          setInput({
            nama: '',
            message: '',
          });
          setIsSuccess(true);
        },
        () => {
          setIsFailed(true)
        }
      )
    )
  }

  const openCertificate = () => {
    window.open(student?.studentData[0].file, '_blank');
  }

  const goToPayment = () => {
    history.push('/register/payment');
  }

  const generateUserProfile = () => {
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Navbar />
          <img className={classes.jumbotron} src={jumbotron} alt='jumbotron' />
          <div className={classes.mainTitle}>
            Profile
          </div>
          <div className={classes.body}>
            <div className={classes.biodataWrapper}>
              <p className={classes.title}>Biodata Siswa</p>
              <div className={classes.wrapper}>
                <div className={classes.biodata}>
                  <p className={classes.label}>Nama Siswa</p>
                  <div className={classes.name}>{student.nama_lengkap}</div>
                  <p className={classes.label}>NIK</p>
                  <div className={classes.name}>{student.nik_anak}</div>
                  <p className={classes.label}>Jenis Kelamin</p>
                  <div className={classes.name}>{student.jenis_kelamin}</div>
                  <p className={classes.label}>Tempat, Tanggal Lahir</p>
                  <div className={classes.name}>{student.tempat_lahir}</div>
                  <p className={classes.label}>Kelompok Belajar</p>
                  <div className={classes.name}>{student.kelompok_belajar ? student.kelompok_belajar : '-'}</div>
                  <p className={classes.label}>Kode Pembayaran</p>
                  <div className={classes.name}>{student.nomor_pendaftaran}</div>
                  <p className={classes.label}>Alamat</p>
                  <div className={classes.name}>{student.alamat_rumah}</div>
                </div>
                <div className={classes.document}>
                  <div className={classes.wrapper}>
                    <p className={classes.statusTitle}>Status Pendaftaran</p>
                    <div className={classes.status}>{student.status_pendaftaran}</div>
                    <img className={classes.img} src={student.foto_murid ? student.foto_murid : img} alt='avatar' />
                    {!_.isEmpty(student?.studentData) &&
                      <div className={classes.sertification} onClick={openCertificate}>Lihat Sertifikat</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          <div className={classes.btnUpload} onClick={goToPayment}>Upload Bukti Pembayaran</div>
          <div className={classes.parentBiodataWrapper}>
            <div className={classes.wrapper}>
              <p className={classes.title}>Data Orang Tua/Wali Siswa/i</p>
              <div className={classes.mainContent}>
                <div className={classes.biodataFather}>
                  <p className={classes.label}>Nama Ayah</p>
                  <div className={classes.name}>{student.nama_ayah}</div>
                  <p className={classes.label}>No. Telpon</p>
                  <div className={classes.name}>{student.telpon_ayah}</div>
                  <p className={classes.label}>Pendidikan</p>
                  <div className={classes.name}>{student.pendidikan_ayah}</div>
                  <p className={classes.label}>Pekerjaan Ayah</p>
                  <div className={classes.name}>{student.pekerjaan_ayah}</div>
                  <p className={classes.label}>Penghasilan</p>
                  <div className={classes.name}>{student.penghasilan_ayah}</div>
                  <p className={classes.label}>Alamat</p>
                  <div className={classes.name}>{student.alamat_rumah}</div>
                </div>
                <div className={classes.biodataMother}>
                  <p className={classes.label}>Nama Ibu</p>
                  <div className={classes.name}>{student.nama_ibu}</div>
                  <p className={classes.label}>No. Telpon</p>
                  <div className={classes.name}>{student.telpon_ibu}</div>
                  <p className={classes.label}>Pendidikan</p>
                  <div className={classes.name}>{student.pendidikan_ibu}</div>
                  <p className={classes.label}>Pekerjaan Ibu</p>
                  <div className={classes.name}>{student.pekerjaan_ibu}</div>
                  <p className={classes.label}>Penghasilan</p>
                  <div className={classes.name}>{student.penghasilan_ibu}</div>
                  <p className={classes.label}>Alamat</p>
                  <div className={classes.name}>{student.alamat_rumah}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.banner}>
            <p>Silahkan Beri Penilaian atau Pesan dan Kesan kepada SPS PAUD Anggrek 05</p>
          </div>
          <div className={classes.testimoniContainer}>
            <div className={classes.testimoni}>
              <div className={classes.inputData}>
                <form className={classes.input} onSubmit={onSubmitForm}>
                  {isSuccess && <Alert severity="success">Pesan Berhasil Terkirim</Alert>}
                  {isFailed && <Alert severity="error">Mohon Maaf, terjadi kesalahan pada sistem. Silakan coba lagi</Alert>}
                  <div className={classes.upper}>
                    <div className={classes.name}>
                      <label>Nama :</label>
                      <input value={input.nama} name='nama' type='text' onChange={handleTestimony} />
                    </div>
                  </div>
                  <div className={classes.bottom}>
                    <div className={classes.contact}>
                      <label>Tuliskan Peniliaian atau pesan dan kesan untuk SPS PAUD Anggrek 05 :</label>
                      <input value={input.message} name='message' type='text' onChange={handleTestimony} />
                    </div>
                    <button className={classes.btnSend} type='submit'>Kirim Penilaian</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return userRole === '2' ? generateUserProfile() : <TeacherProfile teacher={teacher} />;
};

export default Profile