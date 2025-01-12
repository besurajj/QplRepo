const API_DATA_LIMIT = 10;
const PAGES = {
  addressable: "addressable",
  design: "design",
  user: "user",
};

const ENVIRONMENT = {
  ENABLE_ENCRYPTION: process.env.REACT_APP_ENABLE_ENCRYPTION,
  API_HOST: process.env.REACT_APP_API_HOST,
  S3_BUCKET_URL: process.env.REACT_APP_S3_BUCKET,
  STRING: process.env.REACT_APP_STRING,
};

const API_URLS = {
  UPDATE_SETTING: "api/v1/settings/updateAdminSettings",
  CHANGE_PASSWORD: "api/v1/admin/changePassword",
  USERS: "api/v1/admin/details",
  LOGIN: "api/v1/exam_board/login",
  VERIFY_OTP: "api/v1/auth/verify_otp",
  LOGOUT: "api/v1/auth/logout",
  GET_EXAMS: "api/v1/exam_board/exams",
  GET_PAPER: "api/v1/maintainers/set-paper/:id",
  CREATE_EXAM: "api/v1/exam_board/exam_schedule",
  GET_CONTRIBUTORS: "api/v1/exam_board/maintainer_by_role",
  GET_EXAM_PAPER: "https://api.escuelajs.co/api/v1/products",
};

const ENCRYPTION_EXCLUDED = [API_URLS?.IMAGE_UPLOAD];

const ROUTES = {
  ROOT: "/",
  ADMIN: "/admin",
  DASHBOARD: "/admin/dashboard",
  EXAM_MANAGEMENT: "/admin/examList",
  PROFILE_SETTING: "/admin/profile-setting",
  CREATE_PAPER: "/admin/createPaper",
  QUEST_PAPER: "/admin/questionPaper",
  CREATE_EXAM: "/admin/createExam",
  TOPIC: "/admin/questionPaper",
  VIEW_QUESTIONS: "/admin/exam",
  // MCQ:"/admin/topicManagement/mcq"
};

const ROLES = {
  admin: "admin",
  subAdmin: "subAdmin",
};

const FORMIK_REGEX = {
  ALPHA_REGEX: /^[A-Za-z\s]+$/,
  NAME: /^(?![-' ])(?!.*[-' ]$)[A-Za-z-' ]{3,30}$/,
  MOBILE_NUMBER_REGEX: /^\+(?:[0-9]●?){6,16}[0-9]$/,
  PASSWORD_REGEX:
    /^.*(?=.{6})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  WHOLE_DECIMALNUMBERS_REGEX: /^[1-9]\d{0,9}(\.\d{1,2})?%?$/,
  NATURAL_NUMBERS_REGEX: /^[1-9][0-9]{0,9}$/,
  ROYALITY_REGEX: /^(?:[1-9]|[1-9][0-9]|100)$/,
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  TITLE_REGEX: /^[a-zA-Z0-9][a-zA-Z0-9 _-]{1,48}[a-zA-Z0-9]$/,
  DESCRIPTION_REGEX: /^[a-zA-Z0-9][a-zA-Z0-9 _-]{2,500}[a-zA-Z0-9]$/,
};
const PLACEHOLDER_TEXT = {
  default: "Search by Name ",
  title: "Search by Name ",
  email: "Search by Email and Name",
  search: "Search by Name ",
  NAME: "Name",
  TITLE: "Title",
  COLOR_CODE: "Colour Code",
  DESCRIPTION: "Description",
};

const MESSAGES = {
  REQUIRED: "Field is required.",
  MINIMUM_2_CHARACTERS: "Minimum 2 characters are required.",
  MINIMUM_3_CHARACTERS: "Minimum 3 characters are required.",
  MINIMUM_10_CHARACTERS: "Minimum 10 characters are required.",
  MAXIMUM_30_CHARACTERS: "Maximum 30 characters are allowed.",
  MAXIMUM_50_CHARACTERS: "Maximum 50 characters are allowed.",
  MAXIMUM_500_CHARACTERS: "Maximum 500 characters are allowed.",
  MAXIMUM_200_CHARACTERS: "Maximum 200 characters are allowed.",
  VALID_NAME: "Please enter valid Name.",
};

export {
  API_DATA_LIMIT,
  PAGES,
  ROLES,
  FORMIK_REGEX,
  PLACEHOLDER_TEXT,
  ROUTES,
  ENVIRONMENT,
  ENCRYPTION_EXCLUDED,
  API_URLS,
  MESSAGES,
};
