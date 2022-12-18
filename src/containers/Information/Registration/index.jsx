import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import classes from './index.module.scss';
import { cost, SPP, group, regist, flow } from '../../../static/data/information';
import Footer from "../../../components/Footer";
import Popup from "../../../components/Popup";

const RegistrationInformation = () => {
	const [show, setShow] = useState(false);
  const [nameModal, setNameModal] = useState('');

	const toggleModalRegister = () => {
    setShow(!show);
    setNameModal('register');
  };

  return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Navbar />
				<div className={classes.body}>
					<div className={classes.mianTitle}>
						Informasi Pendaftaran
					</div>
					<div className={classes.mainBody}>
						<div className={classes.mainDetail}>
						{cost &&
						cost.map((data, idx) => {
							return (
								<div className={classes.costDetail} key={idx}>
									<p className={classes.title}>{data.title}</p>
									<p className={classes.notesPrice}>{data.price}</p>
									<p className={classes.notesPrice}>{data.notes}</p>
									*include
									<ul>
										<li>{data.include1}</li>
										<li>{data.include2}</li>
										<li>{data.include3}</li>
									</ul>
								</div>
								)
							})
						}
						{SPP &&
							SPP.map((data, idx) => {
								return (
									<div className={classes.priceDetail} key={idx}>
										<p className={classes.title}>{data.title}</p>
										<p className={classes.subtitle}>{data.price}</p>
									</div>
								)
							})
						}
						{group &&
							group.map((data, idx) => {
								return (
									<div className={classes.groupDetail} key={idx}>
										<p className={classes.title}>{data.title}</p>
										<ol>
											<li>{data.group1}</li>
											<li>{data.group2}</li>
										</ol>
										<p className={classes.notes}>{data.notes}</p>
									</div>
								)
							})
						}
						</div>
						<div className={classes.registWrapper}>
							{regist &&
								regist.map((data, idx) => {
									return (
										<div className={classes.registration} key={idx}>
											<p className={classes.invitation}>{data.invitation}</p>
											<p>{data.appeal}</p>
											<div className={classes.toggleRegistration} onClick={toggleModalRegister}>Daftar Akun</div>
										</div>
									)
								})
							}
						</div>
					</div>
						{flow &&
							flow.map((data, idx) => {
								return (
									<div className={classes.flowWrapperInfo} key={idx}>
										<p className={classes.title}>{data.title}</p>
										<p className={classes.message}>{data.message}</p>
										<ol>
											<li>{data.requirement1}</li>
											<li>{data.requirement2}</li>
											<li>{data.requirement3}</li>
											<li>{data.requirement4}</li>
											<li>{data.requirement5}</li>
										</ol>
										<p className={classes.notes}>{data.notes}</p>
									</div>
								)
							})
						}
						<Popup 
							show={show} setShow={setShow}
							nameModal={nameModal} handleClose={setShow} 
							handleChangeModal={setNameModal}
						/>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default RegistrationInformation;