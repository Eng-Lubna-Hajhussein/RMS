import Carousel from "components/sharedUI/carousel/Carousel";
import HeroCarousel from "components/sharedUI/heroCarousel/HeroCarousel";
import HeroContent from "components/sharedUI/heroContent/HeroContent";
import React, { useMemo } from "react";

function Hero({ lang, dir, lstHeroSlides }) {
  const slides = useMemo(() => {
    return lstHeroSlides.map((slide) => ({
      image: slide?.strImgPath,
      slideContent: (
        <HeroContent
          lang={lang}
          dir={dir}
          content={{
            jsnTitle: slide.jsnTitle,
            jsnSubtitle: slide.jsnSubtitle,
            strVideoPath: slide.strVideoPath,
          }}
        />
      ),
      sxStyle: {height: { lg: "600px", xs: "700px" }},
    }));
  }, [lstHeroSlides]);
  return (
    <React.Fragment>
      <Carousel activeColor={"#ffd40d"} inactiveColor={'#fff'} inset={true} activeSlides={1} justify={'start'} slides={slides} lang={lang} dir={dir} />
    </React.Fragment>
  );
}

export default Hero;
