import React from "react"
import Header from "./sections/header/Header";
import './Home.css'
import Hero from "./sections/hero/Hero";
import Owner from "./sections/owner/Owner";
import Events from "./sections/events/Events";
import Menu from "./sections/menu/Menu";
import MostOrdered from "./sections/mostOrdered/MostOrdered";
import Reservation from "./sections/reservation/Reservation";
import Featured from "./sections/featured/Featured";
import Testimonial from "./sections/testimonial/Testimonial";
import Team from "./sections/team/Team";

function Home(){
    return (
        <React.Fragment>
            <Header />
            <Hero />
            <Owner />
            <Events />
            <Menu />
            <MostOrdered />
            <Reservation />
            <Featured />
            <Testimonial />
            <Team />
        </React.Fragment>
    )
}

export default Home;