import React, { useMemo } from "react";
import Header from "./sections/header/Header";
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
import Loader001 from "components/sharedUI/loader001/Loader001";
import "./Home.css";

function Home({
  systemInfo,
  userImg,
  userName,
  blnUserLogin,
  userNavList,
  addWS,
  websiteLogo,
  ws,
  navList,
  systemPath,
  removeWS,
  editable,
  adminEditMode,
  customerEditMode,
  loggedIn,
  adminNavList,
  onSaveUpperHeader,
  userCart,
  addOrderProduct,
  removeOrderProduct,
  onSaveHero,
  onSaveOwner,
  onSaveAbout,
  onSaveReservation,
  systemID,
  addMenuCategory,
  deleteMenuCategory,
  editMenuCategory,
  addChef,
  editChef,
  deleteChef,
  jsnSystemLocation,
  lang,
  dir,
}) {
  const featured = useMemo(() => {
    return systemInfo.systemMenu?.filter(
      (category) => category?.jsnCategoryInfo?.blnFeatured
    );
  }, [systemInfo.systemMenu]);
  const mostOrdered = useMemo(() => {
    return systemInfo.systemMenu?.filter(
      (category) => category?.jsnCategoryInfo?.blnMostOrdered
    );
  }, [systemInfo.systemMenu]);
  const wsCategory = useMemo(() => {
    return systemInfo.systemMenu?.find(
      (category) => category.bigID === systemInfo.bigWSCategoryID
    );
  }, [systemInfo.bigWSCategoryID]);

  return (
    <React.Fragment>
      <Header
        lang={lang}
        dir={dir}
        jsnSystemContact={systemInfo.jsnSystemContact}
        editable={adminEditMode}
        onSaveUpperHeader={onSaveUpperHeader}
        adminNavList={adminNavList}
        userImg={userImg}
        navList={navList}
        userName={userName}
        customerEditMode={customerEditMode}
        intCartProduct={customerEditMode && userCart?.lstProduct?.length}
        blnUserLogin={blnUserLogin}
        userNavList={userNavList}
        systemPath={systemPath}
        websiteLogo={websiteLogo}
      />
      <Hero
        lang={lang}
        dir={dir}
        editable={adminEditMode}
        lstHeroSlides={systemInfo.jsnSystemSections.lstHeroSlides}
        wsCategory={wsCategory}
        onSaveHero={onSaveHero}
      />
      <Owner
        lang={lang}
        dir={dir}
        jsnOwnerSection={systemInfo.jsnSystemSections.jsnOwnerSection}
        onSaveOwner={onSaveOwner}
        editable={adminEditMode}
        websiteLogo={websiteLogo}
      />
      <Reservation
        lang={lang}
        dir={dir}
        jsnReservation={systemInfo.jsnSystemSections.jsnReservation}
        onSaveReservation={onSaveReservation}
        editable={adminEditMode}
      />
      <Menu
        lang={lang}
        dir={dir}
        categories={systemInfo.systemMenu}
        addMenuCategory={addMenuCategory}
        deleteMenuCategory={deleteMenuCategory}
        editMenuCategory={editMenuCategory}
        ws={ws}
        addWS={addWS}
        userCart={userCart}
        addOrderProduct={addOrderProduct}
        removeOrderProduct={removeOrderProduct}
        removeWS={removeWS}
        systemID={systemID}
        editable={editable}
        customerEditMode={customerEditMode}
        adminEditMode={adminEditMode}
        loggedIn={loggedIn}
      />
      <MostOrdered lang={lang} dir={dir} lstMostOrdered={mostOrdered} />
      <Featured lang={lang} dir={dir} lstFeatured={featured} />
      <Team
        lang={lang}
        dir={dir}
        lstSystemTeam={systemInfo.lstSystemTeam}
        editable={adminEditMode}
        addChef={addChef}
        editChef={editChef}
        deleteChef={deleteChef}
      />

      {!!systemInfo?.lstSystemReviews?.length && (
        <Testimonial
          lang={lang}
          dir={dir}
          lstSystemReviews={systemInfo.lstSystemReviews}
          jsnTestimonialSection={
            systemInfo.jsnSystemSections.jsnTestimonialSection
          }
        />
      )}
      <About
        lang={lang}
        dir={dir}
        jsnAboutSection={systemInfo.jsnSystemSections.jsnAboutSection}
        onSaveAbout={onSaveAbout}
        editable={editable}
      />
      <Follow lang={lang} />
      <Footer
        jsnSystemLocation={jsnSystemLocation}
        lang={lang}
        jsnSystemContact={systemInfo.jsnSystemContact}
        dir={dir}
        websiteLogo={websiteLogo}
        blnAdmin={adminEditMode}
      />
      <Loader001 status={"loaded"} />
    </React.Fragment>
  );
}

export default Home;
