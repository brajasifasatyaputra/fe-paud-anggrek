import React from "react";
import classes from "./index.module.scss";
import Navbar from "../../components/Navbar";
// import Home from '../../static/images/home.webp';
// import { useHistory } from "react-router-dom";
import Footer from "../../components/Footer/index";
import BannerRegister from '../../components/Banner/index';
import primacy from '../../static/data/superiority';
// import { useState } from "react";

const HomePage = () => {
  // const isLogin = true;
  // const [login, setLogin] = useState(isLogin);

  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.body}>
        <div className={classes.bannerWrapper}>
          <strong>
            <p>SPS PAUD Anggrek 05</p>
          </strong>
          <p>
            "Membantu anak didik mengembangkan berbagai potensi yang dimiliki untuk siap memasuki<br/>
            pendidikan dasar melalui kegiatan bermain sambil belajar"
          </p>
        </div>
        <div className={classes.mainBody}>
          <div className={classes.titleWrapper}>
            <strong>
              <p>Kenapa SPS PAUD Anggrek 50?</p>
            </strong>
            <p className={classes.subtitle}>SPS PAUD Anggrek 05 memiliki beberapa keunggulan seperti...</p>
          </div>
          <div className={classes.cardWrapper}>
            {primacy &&
            primacy.map((data, idx) => {
              return (
                <div className={classes.card} key={idx}>
                  <img src={data.img} className={classes.imgCard} alt={'icon'} />
                  <div className={classes.textWrapper}>
                    <p className={classes.title}>{data.title}</p>
                    <p className={classes.subtitle}>{data.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <BannerRegister />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
