import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticle } from "../../../store/actions";
import classes from './index.module.scss';
import Navbar from '../../../components/Navbar';
import Footer from "../../../components/Footer";
// import img from '../../../static/images/article.webp';

const ActivityInformation = () => {
	const dispatch = useDispatch();
  const achievments = useSelector((state) => state.mainReducer.achievments);
  const activity = useSelector((state) => state.mainReducer.activity);

	useEffect(() => {
		dispatch(fetchArticle())
	}, [])

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
							{activity &&
							activity.map((data, idx) => {
								return (
									<div className={classes.articleCard} key={idx}>
										<div className={classes.top}>
											<img className={classes.img} src={data.image} alt='activity' />
											<div className={classes.article}>
												<p className={classes.title}>{data.title}</p>
												<p className={classes.subtitle}>{data.description}</p>
											</div>
										</div>
										<p className={classes.date}>{data.timestamp}</p>
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
							{achievments &&
							achievments.map((data, idx) => {
								return (
									<div className={classes.achievementCard} key={idx}>
										<img className={classes.img} src={data.image} alt='achievement' />
										<div className={classes.achievement}>
											<p className={classes.title}>	{data.title}</p>
											<p className={classes.category}>{data.description}</p>
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