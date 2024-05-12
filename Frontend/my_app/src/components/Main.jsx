// import axios from "axios";
// import { useEffect, useState } from "react"
import {  MyCarousel } from "./Carousel";


export const MainContent=()=>{
          
    
      return (
        <>
      
        <div>
           <h1>Image 1</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/data'} />
          <h1>Image 2</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/data'} />
          <h1>Image 3</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/data'} />
          <h1>Image 4</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/data'} />
        </div>
        </>
      );
    };