const validateUserData = (userData, res) => {
  if (!userData.email || !userData.password) {
    return res.status(400).json({ message: "Email or password is not valid." });
  }
};

export const userSignUp = (req, res) => {
  const newUser = {
    id: 2,
    email: req.body.email,
    password: req.body.password,
  };

  validateUserData(newUser, res);

  res.status(201).json(newUser);
};

export const userSignIn = (req, res) => {
  // const userData = {
  //   email: req.body.email,
  //   password: req.body.password,
  // };
  // validateUserData(userData, res);

  res.json({ user: "xd" });
};
