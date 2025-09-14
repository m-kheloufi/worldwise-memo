import React from "react";
import type { Country } from "../Models/Country";
import styles from "./CountryItem.module.css";
const CountryItem: React.FC<{ country: Country }> = ({ country }) => {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
};

export default CountryItem;
