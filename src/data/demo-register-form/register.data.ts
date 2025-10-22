interface ICredentials {
  username: string;
  password: string;
}

interface IUserData {
  title: string;
  creds: ICredentials;
  errorMessage: REGISTRATION_ERRORS;
}

enum REGISTRATION_ERRORS {
  USERANAME_TOO_SHORT = "Username should contain at least 3 characters",
  PASSWORD_TOO_SHORT = "Password should contain at least 8 characters",
  USERNAME_USE_SPACES_ONLY = "Prefix and postfix spaces are not allowed is username",
  PASSWORD_REQUIRED = "Password is required",
  INVALID_DATA = "Please, provide valid data",
  USERNAME_USE_PREFIX_POSTFIX = "Prefix and postfix spaces are not allowed is username",
  USERNAME_REQUIRED = "Username is required",
}

const invalidTestData: IUserData[] = [
  {
    title: "Registration with invalid creds: short username",
    creds: { username: "Do", password: "SuperSecret" },
    errorMessage: REGISTRATION_ERRORS.USERANAME_TOO_SHORT,
  },

  {
    title: "Registration with invalid creds: short password",
    creds: { username: "Dobby", password: "Seven12" },
    errorMessage: REGISTRATION_ERRORS.PASSWORD_TOO_SHORT,
  },

  {
    title:
      "Registration with invalid creds:  username containing only valid number of spaces",
    creds: { username: "          ", password: "SuperSecret" },
    errorMessage: REGISTRATION_ERRORS.USERNAME_USE_SPACES_ONLY,
  },

  {
    title:
      "Registration with invalid creds:  password containing only valid number of spaces",
    creds: { username: "Dobby", password: "           " },
    errorMessage: REGISTRATION_ERRORS.PASSWORD_REQUIRED,
  },
  {
    title:
      "Registration with invalid creds:  username and  password containing only valid number of spaces",
    creds: { username: "          ", password: "           " },
    errorMessage: REGISTRATION_ERRORS.INVALID_DATA,
  },
  {
    title:
      "Registration with invalid creds:  username containing prefix spaces",
    creds: { username: "  Dobby", password: "SuperSecret" },
    errorMessage: REGISTRATION_ERRORS.USERNAME_USE_PREFIX_POSTFIX,
  },
  {
    title:
      "Registration with invalid creds:  username containing postfix spaces",
    creds: { username: "Dobby    ", password: "SuperSecret" },
    errorMessage: REGISTRATION_ERRORS.USERNAME_USE_PREFIX_POSTFIX,
  },
  {
    title:
      "Registration with invalid creds:  username containing prefix and postfix spaces",
    creds: { username: "   Dobby   ", password: "SuperSecret" },
    errorMessage: REGISTRATION_ERRORS.USERNAME_USE_PREFIX_POSTFIX,
  },

  {
    title: "Registration with invalid creds: without username",
    creds: { username: "", password: "SuperSecret" },
    errorMessage: REGISTRATION_ERRORS.USERNAME_REQUIRED,
  },
  {
    title: "Registration with invalid creds: without password",
    creds: { username: "Dobby", password: "" },
    errorMessage: REGISTRATION_ERRORS.PASSWORD_REQUIRED,
  },
  {
    title: "Registration with invalid creds: without username and password",
    creds: { username: "", password: "" },
    errorMessage: REGISTRATION_ERRORS.INVALID_DATA,
  },
];

export default invalidTestData;
