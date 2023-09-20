import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext';
export default function CountryList()
{
    const {cities, isloading} = useCities();
    if(isloading)return <Spinner></Spinner>
    if(!cities.length)
    return (<Message message={"Add your first city by clicking on a city on the map . "}></Message>)
    const Countries = cities.reduce((arr,city)=>
    {
           if(!arr.map((el)=>el.country).includes(city.country))
           return [...arr , {country : city.country , emoji: city.emoji}]
           else return arr;
    },[]);
    return(<ul className={styles.countryList}>
            {
               Countries.map((country)=><CountryItem country={country}></CountryItem>)
            }
    </ul>
    )
}