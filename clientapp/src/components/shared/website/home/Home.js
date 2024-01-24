import React, { useMemo } from "react";
import Header from "./sections/header/Header";
import "./Home.css";
import Hero from "./sections/hero/Hero";
import Owner from "./sections/owner/Owner";
import Reservation from "./sections/reservation/Reservation";
import Menu from "./sections/menu/Menu";
import MostOrdered from "./sections/mostOrdered/MostOrdered";
import Featured from "./sections/featured/Featured";
import Testimonial from "./sections/testimonial/Testimonial";
import Team from "./sections/team/Team";
import About from "./sections/about/About";
import Follow from "./sections/follow/Follow";
import Footer from "./sections/footer/Footer";
import BtnProgressToTop from "components/sharedUI/btnProgressToTop/BtnProgressToTop";
import Loader001 from "components/sharedUI/loader001/Loader001";

function Home({
  systemInfo,
  userImg,
  userName,
  blnUserLogin,
  userNavList,
  categories,
  editable,
  adminNavList,
  onSaveUpperHeader,
  onSaveHero,
  onSaveOwner,
  onSaveAbout,
  onSaveReservation,
  lang,
  dir,
}) {
  const featured = useMemo(() => {
    return categories?.filter((category) => category.blnFeatured);
  }, [categories]);
  const mostOrdered = useMemo(() => {
    return categories?.filter((category) => category.blnMostOrdered);
  }, [categories]);
  const wsCategory = useMemo(() => {
    return categories?.find(
      (category) => category.bigID === systemInfo.bigWSCategoryID
    );
  }, [systemInfo.bigWSCategoryID]);

  return (
    <React.Fragment>
      <Header
        lang={lang}
        dir={dir}
        jsnSystemContact={systemInfo.jsnSystemContact}
        editable={editable}
        onSaveUpperHeader={onSaveUpperHeader}
        adminNavList={adminNavList}
        userImg={userImg}
        userName={userName}
        blnUserLogin={blnUserLogin}
        userNavList={userNavList}
      />
      <Hero
        lang={lang}
        dir={dir}
        editable={editable}
        lstHeroSlides={systemInfo.jsnSystemSections.lstHeroSlides}
        wsCategory={wsCategory}
        onSaveHero={onSaveHero}
      />
      <Owner
        lang={lang}
        dir={dir}
        jsnOwnerSection={systemInfo.jsnSystemSections.jsnOwnerSection}
        onSaveOwner={onSaveOwner}
        editable={editable}
      />
      <Reservation
        lang={lang}
        dir={dir}
        jsnReservation={systemInfo.jsnSystemSections.jsnReservation}
        onSaveReservation={onSaveReservation}
        editable={editable}
      />
      {/* <Menu lang={lang} dir={dir} categories={categories} />
      <MostOrdered lang={lang} dir={dir} lstMostOrdered={mostOrdered} />
      <Featured lang={lang} dir={dir} lstFeatured={featured} /> */}
      {/* <Testimonial
        lang={lang}
        dir={dir}
        lstSystemReviews={systemInfo.lstSystemReviews}
        jsnTestimonialSection={
          systemInfo.jsnSystemSections.jsnTestimonialSection
        }
      /> */}
      <Team lang={lang} lstSystemTeam={systemInfo.lstSystemTeam} />
      <About
        lang={lang}
        dir={dir}
        jsnAboutSection={systemInfo.jsnSystemSections.jsnAboutSection}
        onSaveAbout={onSaveAbout}
        editable={editable}
      />
      <Follow lang={lang} />
      <Footer lang={lang} />
      {/* <BtnProgressToTop lang={lang} /> */}
      <Loader001 status={"loaded"} />
    </React.Fragment>
  );
}

export default Home;
