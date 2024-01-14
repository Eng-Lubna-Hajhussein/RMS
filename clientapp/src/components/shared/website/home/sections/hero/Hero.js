import Carousel from "components/sharedUI/carousel/Carousel";
import HeroContent from "./heroContent/HeroContent";
import React, { useMemo } from "react";

function Hero({ lang, dir, lstHeroSlides, wsCategory }) {
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
            wsCategory: wsCategory,
          }}
        />
      ),
      sxStyle: { height: { lg: "600px", xs: "700px" } },
    }));
  }, [lstHeroSlides]);

  return (
    <Carousel
      activeColor={"#ffd40d"}
      inactiveColor={"#fff"}
      inset={true}
      activeSlides={1}
      justify={"start"}
      slides={slides}
      lang={lang}
      dir={dir}
    />
  );
}

export default Hero;
