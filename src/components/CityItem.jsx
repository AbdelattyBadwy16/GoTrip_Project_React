import { Link } from "react-router-dom";
import styles from "./CityItem.module.css"
import { useCities } from "../contexts/CitiesContext";

export default function CityItem({ city }) {
    const { cityName, emoji, date , id , position } = city;
    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));

    const flagemojiToPNG = (flag) => {
        var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char - 127397).toLowerCase()).join('')
        return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
    }
    const {currentCity , DeleteCity} = useCities();

    function handelClick(e)
    {
         e.preventDefault();
         DeleteCity(id);

    }

    return (
        <li >
            <Link className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={styles.name}>{cityName}</span>
            <h3 className={styles.emoji}>{flagemojiToPNG(emoji)}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn} onClick={handelClick}>x</button>
            </Link>
        </li>
    )
}