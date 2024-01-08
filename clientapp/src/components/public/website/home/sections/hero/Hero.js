import HeroCarousel from "components/sharedUI/heroCarousel/HeroCarousel";
import React from "react";


function Hero({lang,dir,jsnHeroSection}){
    return <React.Fragment>
            <HeroCarousel lang={lang} dir={dir} jsnHeroSection={jsnHeroSection} />
    </React.Fragment>
}

export default Hero;