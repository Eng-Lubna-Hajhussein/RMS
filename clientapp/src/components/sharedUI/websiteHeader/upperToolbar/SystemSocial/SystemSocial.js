import { Link } from "@mui/material";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  socialLink: {
    color: "#000",
    fontSize: "14px",
    textDecoration: "underline #000",
    fontWeight: "600",
  },
};

function SystemSocial({ social, lang }) {
  return (
    <Link href={social.path} target="_blank" sx={styles.socialLink}>
      {dictionary.contact[social.type][lang]}
    </Link>
  );
}

export default SystemSocial;
