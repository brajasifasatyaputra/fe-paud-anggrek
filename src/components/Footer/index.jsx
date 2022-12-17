import React from "react";
import classes from "./index.module.scss";

export const Footer = () => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerWrapper}>
        <div className={classes.leftSection}>
          <strong>
            <p>
              SPSS PAUD Anggrek 05
            </p>
          </strong>
          <p>
          SPS PAUD Anggrek 05 merupakan lembaga<br/>
          pendidikan anak usia dini dibawah naungan<br/>
          yang mengembangkan pendidikan berkarakter<br/>
          bagi anak muridnya
          </p>
        </div>
        <div className={classes.rightSection}>
          <strong>
            <p>
              Alamat
            </p>
          </strong>
          <p>
            Jl. Bendungan Melayu RT.008 RW.005<br/>
            Kelurahan Tugu Selatan, Kecamatan Koja,<br/>
            Jakarta Utara<br/>
            <br/>
            Kontak  : 0812-8617-5278<br/>
            Email   :  juwariyah234@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
