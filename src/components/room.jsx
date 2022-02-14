import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, doc, setDoc,addDoc, getDoc } from "firebase/firestore";

import { app,db } from "../firebase";
import { Route, Link, useParams, useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ImageGallery from "react-image-gallery";
import { setDate } from "date-fns";
import * as nearAPI from "near-api-js";
import Modal from "./modal";
import TranscationModal from "./TransactionModal";
const images = [
  {
    original: "https://www.ahstatic.com/photos/b1i2_roskc_00_p_1024x768.jpg",
    thumbnail: "https://www.ahstatic.com/photos/b1i2_roskc_00_p_1024x768.jpg",
  },
  {
    original:
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/162290679.jpg?k=84cd5f24ac68dc3ca3b0eb4d8e69f5b40c06b6387eb7bbc977c2f69f40c0111e&o=&hp=1",
    thumbnail:
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/162290679.jpg?k=84cd5f24ac68dc3ca3b0eb4d8e69f5b40c06b6387eb7bbc977c2f69f40c0111e&o=&hp=1",
  },
  {
    original:
      "https://www.oyster.com/wp-content/uploads/sites/35/2019/05/deluxe-room-v4047251-1440-1024x683.jpg",
    thumbnail:
      "https://www.oyster.com/wp-content/uploads/sites/35/2019/05/deluxe-room-v4047251-1440-1024x683.jpg",
  },
];

const steps = ["Booking info", "Complete Booking"];

const products = [
  {
    name: "Room 1",
    desc: "2 Adult 1 Children",
    price: "$9.99",
  },
];

export default function App({wallet,near,user}) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    full_name: "",
    date: "",
    id_number: "",
    email: "",
    adults: 0,
    room_id:1,
    children: 0,
    startDate: new Date(),
    endDate: null,
  });
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState(false);
  const [transaction, setTransaction] = useState({
    hash: "",
    signature: "",
    receiver_id: "",
    signer_id: "",
  });
  const [modalTransaction, setModalTransaction] = useState(false);

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  const handleChange = (name, val) => {
    setData({ ...data, [name]: val });
  };


useEffect(()=>{
if(ready){
  checkAfterTransaction()
}
},[ready])
  

  const checkAfterTransaction =  () => {
   
    let hash = query.get("transactionHashes");
    console.log("wallet",wallet)
    console.log("hash",hash)
    if (hash && wallet) {

      
    console.log("current data ",data)
        getTransactionDetails(hash);
    
    }
  };
  // connect to NEAR

  async function getState(txHash,provider) {
    console.log("tx",txHash)
    console.log("user",user)
    console.log("wallet",wallet)
    const result = await provider.txStatus(txHash, wallet.getAccountId());
    console.log("hi")
      addCollection(result.transaction.signature)
    console.log("Result: ", result.transaction);
    setTransaction(result.transaction);
    console.log("hi")
    setModalTransaction(true);

   

    
  }

  const addCollection = async (signature) => {
    // Add a new document with a generated id
    console.log("data",user)
    const bookings = doc(collection(db, "bookings"));
    console.log("bookings",bookings)
   console.log(signature)
  
    try {
      const docRef = doc(db, "bookings", signature);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Booking already exist:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        const docRef =  await setDoc(doc(db, "bookings", signature),  { ...data, user_id:user, signature });
        console.log("Document written with ID: ", docRef);
      }
     
     
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // later...
  
  };

  const getTransactionDetails = async (hash) => {
    let wallet_id = wallet.getAccountId();
    let providers = nearAPI.providers;

    //network config (replace testnet with mainnet or betanet)
    const provider = new providers.JsonRpcProvider(
      "https://archival-rpc.testnet.near.org"
    );

    const TX_HASH = hash;
    // account ID associated with the transaction
    const ACCOUNT_ID = wallet_id;

    getState(TX_HASH,provider);

  };

  // create wallet connection
  useEffect(() => {
    const data = localStorage.getItem("booking_data");
    console.log(data);
    if (data) {
      console.log("data var", data);
      let parsed_data = JSON.parse(data);

      console.log(parsed_data);
      setData(parsed_data);
      setState([
        {
          startDate: new Date(parsed_data.startDate),
          endDate: new Date(parsed_data.endDate),
          key: "selection",
        },
      ]);
    }

    setReady(true)
  

   
  }, []);

  const nextStep = () => {
    console.log("user ",user)
    if (!user) {
      setModal(true);
    } else {
      setStep(1);
    }

    localStorage.setItem("booking_data", JSON.stringify(data));
  };

  const signIn = () => {
    wallet.requestSignIn(
      "example-contract.testnet", // contract requesting access
      "Metatravel", // optional
      "http://localhost:3000"
    );
  };
  const handleDate = (item) => {
    setState([item.selection]);
    setData({
      ...data,
      startDate: item.selection.startDate,
      endDate: item.selection.endDate,
    });
  };

  const calculateTotal = () => {
 

    var date1 = new Date(data.startDate);
    var date2 = new Date(data.endDate);
      
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
      
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    //https://near-contract-helper.onrender.com/fiat
console.log("difference in day ",data.adults * 10 + data.children * 5*Difference_In_Days)

    return data.adults * 10 + data.children * 5*Difference_In_Days;
  };

  const sendNear = async () => {
    const account = wallet.account();
    console.log(account);
/* global BigInt */
localStorage.setItem("booking_data", JSON.stringify(data));

    try {

      let response=await fetch("https://near-contract-helper.onrender.com/fiat")
     let data=await response.json()
   
      let near_price=data.near.usd
      console.log("near price",near_price)
      let usd_to_near=   Math.round((calculateTotal()/near_price + Number.EPSILON) * 100) / 100;
      /* global BigInt */
   var final_val =BigInt(usd_to_near*1000000000000000000000000) 
  console.log(final_val.toString())
      let res = await account.sendMoney(
        "skrite16.testnet", // receiver account
        `${final_val}`// amount in yoctoNEAR
      );

     
      console.log("response", res);
    } catch (error) {
      console.log(error);
    }
  };

  


  return (
    <div className="container-room w-100">
      <Modal open={modal} signIn={signIn} setOpen={(payload)=>setModal(payload)}/>
      <TranscationModal addCollection={addCollection} open={modalTransaction} transaction={transaction} setOpen={(payload)=>setModalTransaction(payload)}/>
      <Grid
        className="w-100"
        container
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Grid className="image-container w-100" xs={12} md={8}>
          <ImageGallery showBullets={false} showNav={false} items={images} />
        </Grid>
        <Grid
          container
          flexDirection={"column"}
          md={4}
          xs={12}
          justifyContent={"center"}
          className="p-2 w-100"
        >
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {step === 0 && (
            <Grid container className="w-100" flexDirection={"column"}>
              <Grid
                container
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <TextField
                  className="mtb-1 text-field"
                  id="outlined-basic"
                  label="Adults"
                  variant="outlined"
                  type={"number"}
                  value={data.adults}
                  name="adults"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <TextField
                  className="mtb-1 text-field"
                  id="outlined-basic"
                  label="Children"
                  variant="outlined"
                  type={"number"}
                  value={data.children}
                  name="children"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Grid>

              <DateRange
                onChange={(item) => handleDate(item)}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
              <Button
                onClick={() => nextStep()}
                className="c-button"
                variant="contained"
                color="primary"
              >
                Next{" "}
              </Button>
            </Grid>
          )}
          {step == 1 && (
            <Grid flexDirection={"column"} container>
              <TextField
                className="mt-1"
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                name="full_name"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <TextField
                className="mtb-1"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Id Number"
                variant="outlined"
                name="id"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />

              <List className="mtb-1 p-1">
                {products.map((product) => (
                  <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      primary={product.name}
                      secondary={`${data.adults} adult , ${data.children} children`}
                    />
                    <h2 variant="body2">{calculateTotal()}$</h2>
                  </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Total" />
                  <h2 variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {calculateTotal()}$
                  </h2>
                </ListItem>
              </List>
              <Grid
                container
                flexDirection={"row"}
                justifyContent={"space-between"}
                className="mtb-1"
              >
                <Button
                  onClick={() => setStep(0)}
                  variant="contained"
                  color="secondary"
                >
                  Back
                </Button>
                <Button onClick={sendNear} variant="contained" color="primary">
                  Complete Booking
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
   
    </div>
  );
}
