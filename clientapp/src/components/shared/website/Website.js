import Home from "./home/Home";

function Website({ systemInfo, categories, editable, onSaveUpperHeader,lang,dir }) {
  return (
    <Home
      systemInfo={systemInfo}
      categories={categories}
      editable={editable}
      onSaveUpperHeader={onSaveUpperHeader}
      lang={lang}
      dir={dir}
    />
  );
}

export default Website;
