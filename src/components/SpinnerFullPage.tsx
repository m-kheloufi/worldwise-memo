import Spinner from "./Spinner";
import React from "react";
import styles from "./SpinnerFullPage.module.css";

const SpinnerFullPage: React.FC = () => {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
};

export default SpinnerFullPage;
