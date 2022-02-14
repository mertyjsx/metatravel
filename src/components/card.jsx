import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { Button, Grid, TextField } from "@mui/material";

export default function ImgMediaCard({data}) {
   
   
   const description=()=>{

    return ` Between ${convertDate(data.startDate)} and ${convertDate(data.endDate)}, you have a reservation named ${data.full_name} for ${data.adults} adults and 1 ${data.children}. `
   }

    const convertDate=(date)=>{
      return new Date(date).toISOString().split('T')[0]
        }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         Room id
        </Typography>
        <Typography variant="body2" color="text.secondary">
     {description()}
        </Typography>
      </CardContent>
    
    </Card>
  );
}


/**
 * 
 *   <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
 * 
 */