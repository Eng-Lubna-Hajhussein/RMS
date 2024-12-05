import { Link } from "@basetoolkit/ui";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  socialLink: {
    fontSize: "14px",
    fontWeight: "600",
  },
};

function SystemSocial({ social, lang }) {
  return (
    <Link
      href={social.path}
      target="_blank"
      color="#000"
      underline="always"
      style={styles.socialLink}
    >
      {dictionary.contact[social.type][lang]}
    </Link>
  );
}

export default SystemSocial;
