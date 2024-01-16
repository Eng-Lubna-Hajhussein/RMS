// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: {}, password: {}, userExists: {} };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = {
      en: "That email is not registered",
      ar: "البريد الالكتروني غير مسجل",
    };
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = {
      en: "That password is incorrect",
      ar: "كلمة المرور غير صحيحة",
    };
  }

  // duplicate email error
  if (err.code === 11000 || err.message === "user exists in system") {
    errors.email = {
      en: "That email is already registered in this system",
      ar: "هذا البريد الالكتروني مسجل مسبقا",
    };
    // return errors;
  }

  return errors;
};

// create json web token
const createToken = (id) => {
  const maxAge = 3 * 24 * 60 * 60;
  return jwt.sign({ id }, "strong secret", {
    expiresIn: maxAge,
  });
};

module.exports = { handleErrors, createToken };