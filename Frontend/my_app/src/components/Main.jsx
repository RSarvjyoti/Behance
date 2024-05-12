// import axios from "axios";
// import { useEffect, useState } from "react"
import {  MyCarousel } from "./Carousel";


export const MainContent=()=>{
          
    
      return (
        <>
      
        <div>
           <h1>Image 1</h1>
           <br />
           <h1 >Shop our Hydrating Hand Sanitizers</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/home-1'} />

          <h1>Image 2</h1>
          <br />
          <h1>Keep Your Skin Healthy On The Move!</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/home-2'} />

          <br />
          <h1>Shop Our Best Sellers</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/home-3'} />

          <h1>Image 3</h1>
          <br />
          <h1>Our Refills</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/home-4'} />

          <h1>Image 4</h1>
        </div>
        </>
      );
    };