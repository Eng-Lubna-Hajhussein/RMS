import { useState, useEffect, useRef } from "react";

const useUpload = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [requestFiles, setRequestFiles] = useState(null);
  const [userData, setUserData] = useState(null);
  const firstRender = useRef();

  useEffect(() => {
    const abortCont = new AbortController();
    if (firstRender) {
      setIsPending(false);
      firstRender.current = false;
    }
    if (requestFiles&&userData) {
      const formData = new FormData();
      formData.append("userData", JSON.stringify(userData));
      let isUploaded = {};
      requestFiles.forEach((file) => {
        isUploaded = { ...isUploaded, [file.name]: false };
        formData.append("files", file);
      });
      fetch("http://localhost:4000/file/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then(({ aryResponse }) => {
          setData([...aryResponse]);
          setRequestFiles(null);
          setUserData(null);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "BortError") {
            console.log("fetch aborted");
          } else {
            setRequestFiles(null);
            setUserData(null);
            setIsPending(false);
            setError(err.message);
          }
        });
    }

    //clean up side effects
    return () => abortCont.abort(); //pause the fetch
  }, [requestFiles,userData]);
  return { data, isPending, error, setRequestFiles, setUserData };
};

export default useUpload;
