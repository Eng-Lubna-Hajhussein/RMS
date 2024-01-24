import Carousel from "components/sharedUI/carousel/Carousel";
import HeroContent from "./heroContent/HeroContent";
import React, { useMemo } from "react";

function Hero({ lang, dir, lstHeroSlides, wsCategory, editable, onSaveHero }) {
  const slides = useMemo(() => {
    return lstHeroSlides.map((slide,index) => ({
      image: slide?.strImgPath,
      slideContent: (
        <HeroContent
          lang={lang}
          dir={dir}
          content={{
            jsnTitle: slide.jsnTitle,
            jsnSubtitle: slide.jsnSubtitle,
            strVideoPath: slide.strVideoPath,
            strImgPath:slide.strImgPath,
            wsCategory: wsCategory,
            index:index
          }}
          lstHeroSlides={lstHeroSlides}
          editable={editable}
          onSaveHero={onSaveHero}
          />
          ),
          bgAnimation:slide?.strBgAnimationType,
      sxStyle: { height: { lg: "600px", xs: "700px" } },
    }));
  }, [lstHeroSlides, lang, dir]);

  return (
    <React.Fragment>
      <Carousel
        activeColor={"#ffd40d"}
        inactiveColor={"#fff"}
        inset={true}
        activeSlides={1}
        justify={"start"}
        slides={slides}
        onSave={onSaveHero}
        editable={editable}
        lang={lang}
        dir={dir}
      />
    </React.Fragment>
  );
}

export default Hero;
