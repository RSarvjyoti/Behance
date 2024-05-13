import { useEffect } from "react"
import { Footer } from "./Footer"
import { MainContent } from "./Main"



export const Home=()=>{


   const onCardClick=(id)=>{
        // console.log(id);
      }
    
    return (
        <>
        {/* <Navbar /> */}
        <MainContent handleCardClick={onCardClick}/>
        <Footer />
        </>
    )
}