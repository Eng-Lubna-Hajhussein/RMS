import { Demo_categories, Demo_jsnSystemInfo } from "appHelper/appVariables";
import Home from "./home/Home";

function Website({
  isDemo,
  systemInfo,
  addWS,
  removeWS,
  ws,
  categories,
  editable,
  adminNavList,
  onSaveUpperHeader,
  onSaveHero,
  onSaveOwner,
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
  lang,
  dir,
}) {
  return (
    <Home
      systemInfo={systemInfo}
      categories={categories}
      editable={editable}
      onSaveUpperHeader={onSaveUpperHeader}
      onSaveHero={onSaveHero}
      onSaveOwner={onSaveOwner}
      onSaveAbout={onSaveAbout}
      addMenuCategory={addMenuCategory}
      deleteMenuCategory={deleteMenuCategory}
      editMenuCategory={editMenuCategory}
      addChef={addChef}
      editChef={editChef}
      deleteChef={deleteChef}
      addWS={addWS}
      removeWS={removeWS}
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
