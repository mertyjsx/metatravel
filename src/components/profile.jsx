import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import VerifiedIcon from '@mui/icons-material/Verified';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import Card from "./card"
import { Button, Grid, TextField } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import { collection, query, where, doc, setDoc,addDoc, getDocs } from "firebase/firestore";

import { app,db } from "../firebase";
export default function IconLabelTabs({user,near}) {
  const [value, setValue] = React.useState(0);
  const [bookings,setBookings]=React.useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

React.useEffect(async ()=>{
console.log("profile")
   try {
    const account = await near.account(user);
   var details= await account.getAccountDetails();
    console.log("details",details)
const q = query(collection(db, "bookings"), where("user_id", "==", user));

const querySnapshot = await getDocs(q);
    let temp=[]
   console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("hi",doc.data());
      temp.push(doc.data())
    });
setBookings(temp)
       console.log(temp)
   } catch (error) {
       console.log(error)
   }

},[])


  return (
      <div className='profileContainer'>
          <h2 className='center'>skrite15.mainnet

              <VerifiedIcon className="ml-1"></VerifiedIcon>
          </h2>
    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
      <Tab onClick={()=>setValue(0)} icon={<BurstModeIcon />} label="Nfts" />
      <Tab onClick={()=>setValue(1)} icon={<BookIcon />} label="Bookings" />
    
    </Tabs>
    {value===0&& <Grid container className="mt-2" justifyContent={"center"} alignItems="center">
  {
        [].map(item=> <Grid container lg={4}  justifyContent={"center"} alignItems="center"><Card/></Grid>)
    }
  </Grid>}
 {value===1&& <Grid container className="mt-2" justifyContent={"center"} alignItems="center">
  {
        bookings.map(data=> <Grid  container lg={4}  justifyContent={"center"} alignItems="center"><Card data={data}/></Grid>)
    }
  </Grid>}
    </div>
  );
}