import { Demo_categories, Demo_jsnSystemInfo } from "appHelper/appVariables";
import Home from "./home/Home";

function Website({
  systemInfo,
  addWS,
  removeWS,
  userCart,
  addOrderProduct,
  removeOrderProduct,
  ws,
  navList,
  categories,
  editable,
  adminEditMode,
  customerEditMode,
  adminNavList,
  onSaveUpperHeader,
  onSaveHero,
  onSaveOwner,
  systemID,
  addMenuCategory,
  deleteMenuCategory,
  editMenuCategory,
  addChef,
  editChef,
  deleteChef,
  onSaveReservation,
  onSaveAbout,
  userImg,
  userName,
  blnUserLogin,
  userNavList,
  systemPath,
  lang,
  dir,
}) {
  return (
    <Home
      systemInfo={systemInfo}
      categories={categories}
      editable={editable}
      systemPath={systemPath}
      onSaveUpperHeader={onSaveUpperHeader}
      onSaveHero={onSaveHero}
      onSaveOwner={onSaveOwner}
      onSaveAbout={onSaveAbout}
      systemID={systemID}
      navList={navList}
      userCart={userCart}
      addOrderProduct={addOrderProduct}
      removeOrderProduct={removeOrderProduct}
      addMenuCategory={addMenuCategory}
      deleteMenuCategory={deleteMenuCategory}
      editMenuCategory={editMenuCategory}
      addChef={addChef}
      editChef={editChef}
      deleteChef={deleteChef}
      addWS={addWS}
      removeWS={removeWS}
      adminEditMode={adminEditMode}
      customerEditMode={customerEditMode}
      ws={ws}
      lang={lang}
      onSaveReservation={onSaveReservation}
      adminNavList={adminNavList}
      userImg={userImg}
      userName={userName}
      blnUserLogin={blnUserLogin}
      userNavList={userNavList}
      dir={dir}
    />
  );
}

export default Website;
