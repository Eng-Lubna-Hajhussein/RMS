import { Demo_categories, Demo_jsnSystemInfo } from "appHelper/appVariables";
import Home from "./home/Home";

function Website({
  isDemo,
  systemInfo,
  categories,
  editable,
  adminNavList,
  onSaveUpperHeader,
  onSaveHero,
  onSaveOwner,
  addMenuCategory,
  deleteMenuCategory,
  editMenuCategory,
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
