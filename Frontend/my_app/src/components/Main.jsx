import {  MyCarousel } from "./Carousel";
import home1 from '../Images/home-1.jpg'
import home2 from '../Images/home-2.webp'
import home3 from '../Images/home-3.webp'
import home4 from '../Images/home-4.webp'
import { Image } from "@chakra-ui/react";

export const MainContent=()=>{
    
      return (
        <>
      
        <div>
           <Image src={home1} />
           <br />
           <h1 >Shop our Hydrating Hand Sanitizers</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/home-1'} />

          <Image src={home2} />
          <br />
          <h1>Keep Your Skin Healthy On The Move!</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/home-2'} />

          <br />
          <h1>Shop Our Best Sellers</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/home-3'} />

          <Image src={home3} />
          <br />
          <h1>Our Refills</h1>
          <MyCarousel fetchUrl={'https://behance-z9se.onrender.com/home-4'} />

          <Image src={home4} />
        </div>
        </>
      );
    };