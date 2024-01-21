import Home from "./home/Home";

function Website({ systemInfo, categories, editable, onSaveUpperHeader,onSaveHero,lang,dir }) {
  return (
    <Home
      systemInfo={systemInfo}
      categories={categories}
      editable={editable}
      onSaveUpperHeader={onSaveUpperHeader}
      onSaveHero={onSaveHero}
      lang={lang}
      dir={dir}
    />
  );
}

export default Website;
