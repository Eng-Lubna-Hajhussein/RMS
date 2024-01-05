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
import About from "./sections/about/About";
import Follow from "./sections/follow/Follow";
import Footer from "./sections/footer/Footer";
import BtnProgressToTop from "components/sharedUI/btnProgressToTop/BtnProgressToTop";
import Loader001 from "components/sharedUI/loader001/Loader001";

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
            <About />
            <Follow />
            <Footer />
            <BtnProgressToTop />
            <Loader001 status={"loaded"} />
        </React.Fragment>
    )
}

export default Home;