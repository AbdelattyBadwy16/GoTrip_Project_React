// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import Spinner from "./Spinner"
import Message from "./Message"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../Hook/useUrl";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const Url= "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat,lng] = useUrlPosition();
  const [isLoadingGeo,setIsLoadingGeo] = useState(false); 
  const [emoji , setEmoji] = useState("");
  const {CreateCity , isLoading} = useCities();
  const navigate = useNavigate();


  useEffect(function(){
    if(!lat && !lng)return ;
    async function fetchData(){
      try{
           setIsLoadingGeo(true);
           const res = await fetch(`${Url}?latitude=${lat}&longitude=${lng}`);
           const data = await res.json();
           setCityName(data.city || data.locality  || "");
           setCountry(data.countryName);
           setEmoji(convertToEmoji(data.countryCode));
      }catch(err){
        alert("error")
      }finally{
        setIsLoadingGeo(false); 
      }
    }
    fetchData();
  },[lat,lng])

  if(isLoadingGeo) return <Spinner></Spinner>
  
  if(!lat && ! lng) return <Message message="Start by clicking somewhere on the map !!"></Message>

  async function handleSubmit(e) {
    e.preventDefault();
    if(!cityName || !date)return;
    
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat,lng}
    }
    await CreateCity(newCity);
    navigate("/app/cities")
  }

  return (
  <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        { <span className={styles.flag}>{emoji}</span> }
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={(date)=>setDate(date)} selected={date} dateFormat="dd/MM/yyyy"></DatePicker>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e)=>{
          e.preventDefault();
          navigate(-1);
          }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
