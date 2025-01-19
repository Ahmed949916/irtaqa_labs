"use client"
import React from 'react';
import { Box, Typography } from '@mui/material';
import CountUp from 'react-countup';
import PeopleIcon from '@mui/icons-material/People';
import ScienceIcon from '@mui/icons-material/Science';
import CustomButton from '@/src/components/common/CustomButton';

import { download, download1 } from '@/src/assets/images';
import Slideshow from './SlideShow';

const Hero = () => {
    const slideshowImages = [
        {
          src: download,
          alt: "Slide 1: Welcome to Irtaqa Lab",
        },
        {
          src:download1,
          alt: "Slide 2: Our Services",
        },
      
        // Add more images as needed
      ];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap:"16px",
        // justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        background: '#e0f7fa',
        // textAlign: 'center',
        padding:"1rem"
        
      }}
    >
      {/* Main Title */}
      <Box>

      <Typography
        variant="h4"
        color="#004d40"
        gutterBottom
        sx={{ fontWeight: 'bold',margin:"0" }}
        >
        Irtaqa Lab
      </Typography>

      <Box sx={{display:"flex",gap:"4px"}}>

<Typography
 
 color="#004d40"
  sx={{ fontStyle: 'italic' }}
>
  A Project of
</Typography>
<Typography
 color="#004d40"
 sx={{ fontStyle: 'italic',fontWeight:"600" }}
 >
 Nawab Begum Trust
</Typography>

   </Box>



          </Box>

          <Slideshow
        images={slideshowImages}
        autoPlay={true}
        autoPlayInterval={7000} // 7 seconds
      />


         <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
<CustomButton padding='32px 64px'>
View your Reports
</CustomButton>


</Box>
     

      {/* Counters Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
    
          width: '100%',
        //   maxWidth: '800px',
        }}
      >
       
        <Box
          sx={{
            color:"#004d40",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '300px',
          }}
        >
          <PeopleIcon color="inherit" sx={{ fontSize: 50 }} />
          <Typography variant="h4" color="#004d40" sx={{ fontWeight: 'bold' }}>
            <CountUp end={1200} duration={2} separator="," />
            +
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Patients Served
          </Typography>
        </Box>

        {/* Tests Done Counter */}
        <Box
          sx={{
            // backgroundColor: '#ffffff',
       
            // borderRadius: 2,
            // boxShadow: 3,
            color:"#004d40",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '300px',
          }}
        >
          <ScienceIcon color="inherit" sx={{ fontSize: 50 }} /> {/* Updated Icon */}
          <Typography variant="h4" color="#004d40" sx={{ fontWeight: 'bold' }}>
            <CountUp end={5000} duration={2} separator="," />
            +
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Tests Done
          </Typography>
        </Box>



      </Box>



    </Box>
  );
};

export default Hero;
