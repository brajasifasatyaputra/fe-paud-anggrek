import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from '@mui/material';
import {
  CCardBody,
  CDataTable,
  CImg,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CAlert,
} from "@coreui/react";

import { fetchStudent, uploadCertificate } from '../../store/actions'
import classes from './index.module.scss';
import Navbar from "../../components/Navbar";
import BannerRegister from "../../components/Banner";
import Footer from "../../components/Footer";
import Whatsapp from '../../static/icon/whatsapp.webp'
import Location from '../../static/icon/location.webp'
import Email from '../../static/icon/email.webp'

const fields = [
  {
    key: "No",
    sorter: true,
  },
  {
    key: "nama_lengkap",
    label: "Nama Lengkap",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "jenis_kelamin",
    label: "Jenis Kelamin",
  },
	{
		key: 'Sertifikat'
	},
  {
    key: "Action",
  },
];

const StudentList = () => {
  const students = useSelector((state) => state.mainReducer.students);
	const [showPopupImg, setShowPopupImg] = useState(false);
	const [selectedImg, setSelectedImg] = useState(null);
	const [displayImg, setDisplayImg] = useState(null);
	const [form, setForm] = useState({});
	const [showPopupUpload, setShowPopupUpload] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchStudent())
	},[])

	useEffect(() => {
		setTimeout(() => {
			setIsSuccess(false);
		},3000)
	},[isSuccess])

	const onUploadCertificate = () => {
		// e.preventDefault();
		// const formData = new FormData();
		const formData = new FormData();
    formData.set('file', form.file[0], form.file[0].name);
		dispatch(
			uploadCertificate(
				formData,
				selectedUser.id,
				() => {
					setIsSuccess(true);
					setShowPopupUpload(false);
				}
			)
		)
	}
	
	const openPopupUpload = (item) => {
		setSelectedUser(item);
		setShowPopupUpload(true);
	}

	const openImage = (image) => {
		setShowPopupImg(true);
		setSelectedImg(image);
	}

	const updateForm = (e) => {
    if (e.target.files) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setDisplayImg(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  }
	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Navbar />
				<div className={classes.body}>
          <p className={classes.title}>Data Siswa</p>
					{isSuccess && <Alert severity="success">Sukses Upload Sertifikat</Alert>}
					<CCardBody className={classes.cardBody}>
						<CDataTable
							items={students && students}
							fields={fields}
							itemsPerPage={5}
							dark
							striped
							pagination
							sorter
							tableFilter
							hover
							scopedSlots={{
								No: (item, index) => {
									return <td className={classes.number}>{index + 1}.</td>;
								},
								'Sertifikat': (item, index) => {
									return (
										<td className="py-3">
											{item?.studentData[0]?.file ?
												<CImg style={{cursor: 'pointer'}} src={item?.studentData[0]?.file} thumbnail width={80} onClick={() => openImage(item)} />
												:
												'-'
											}
										</td>
									)
								},
								'Action': (item, index) => {
									return (
										<td className="py-5" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
											<CButton color="info" size="sm" style={{cursor: 'pointer'}} onClick={() => openPopupUpload(item)}>
												Upload Sertifikat
											</CButton>
										</td>
									)
								},
							}}
						/>
					</CCardBody>
				</div>
			</div>
			<CModal
				centered
				show={showPopupImg}
				onClose={() => setShowPopupImg(false)}
			>
				<CModalHeader closeButton></CModalHeader>
				<CModalBody style={{display: 'flex', justifyContent: 'center'}}>
					<CImg centered src={selectedImg?.studentData[0].file} width={450} />
				</CModalBody>
			</CModal>
			<CModal
				centered
				show={showPopupUpload}
				onClose={() => setShowPopupUpload(false)}
			>
				<CModalHeader closeButton></CModalHeader>
				<CModalBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<img style={{ width: '150px'}} src={displayImg ? displayImg : "https://simasda.bandungkab.go.id/images/no-image-dataset.png"} />
					<input
						style={{ marginTop: '4%'}}
						onChange={(e) => updateForm(e)}
						type="file"
						name="file"
						required
					/>
					<CButton color="success" size="sm" style={{cursor: 'pointer'}} onClick={() => onUploadCertificate()}>
						Upload
					</CButton>
				</CModalBody>
			</CModal>
			<Footer />
		</div>
	);
};

export default StudentList;
