import { userLogins } from "./database.js";

// console.log(login.userLogins);

const signUpEmail = document.querySelector(".sign-up-email");
const signUpFullName = document.querySelector(".sign-up-fullname");
const signUpUserName = document.querySelector(".sign-up-username");
const signUpPassword = document.querySelector(".sign-up-password");
const signUpBox = document.querySelector(".sign-up-box");
const signUpBtn = document.querySelector(".sign-up-btn");

// const userLogins = [
//   {
//     email: "dishantvaleja@gmail.com",
//     password: "Abcd@1234",
//     userName: "Dishant5",
//   },
// //   { email: "jayshah@gmail.com", password: "Abcd@1234", userName: "Jay09" },
// ];

const validateEmail = (email) => {
  return (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
    !userLogins.some((acc) => acc.email === email)
  );
};

const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
    password
  );
};

const validateUserName = (userName) => {
  return userLogins.some((acc) => acc.userName === userName);
};

const Validity = (event) => {
  const email = signUpEmail.value;
  const password = signUpPassword.value;
  const userName = signUpUserName.value;
  const fullName = signUpFullName.value;
  // console.log(event.target.closest(".sign-up-email"));

  // if (event.target.classlist.contains("sign-up-email")) {
  if (event.target.closest(".sign-up-email")) {
    document.querySelector(".sign-up-email-validation").innerHTML = `Email ${
      validateEmail(email) ? "is valid" : "is not valid"
    }`;

    if (validateEmail(email))
      document.querySelector(".sign-up-email-validation").style.color = "green";

    if (email === "")
      document.querySelector(".sign-up-email-validation").innerHTML = "";
  }

  if (event.target.closest(".sign-up-password")) {
    document.querySelector(
      ".sign-up-password-validation"
    ).innerHTML = `This password ${
      validatePassword(password) ? "is valid" : "is not valid"
    }`;

    if (validatePassword(password))
      document.querySelector(".sign-up-password-validation").style.color =
        "green";

    if (password === "")
      document.querySelector(".sign-up-password-validation").innerHTML = "";
  }

  if (event.target.closest(".sign-up-username")) {
    document.querySelector(
      ".sign-up-username-validation"
    ).innerHTML = `Username ${
      validateUserName(userName) ? "is taken" : "is not taken"
    }`;

    if (!validateUserName(userName))
      document.querySelector(".sign-up-username-validation").style.color =
        "green";
    else
      document.querySelector(".sign-up-username-validation").style.color =
        "red";

    if (userName === "")
      document.querySelector(".sign-up-username-validation").innerHTML = "";
  }

  if (event.target.closest(".sign-up-fullname")) {
    // document.querySelector(".sign-up-fullname-validation").innerHTML = "";
    if (fullName)
      document.querySelector(".sign-up-fullname-validation").innerHTML = "";
  }

  // document.querySelector(
  //   ".sign-up-username-validation"
  // ).innerHTML = `${userName} ${
  //   userLogins.some((acc) => acc.userName === userName)
  //     ? "is taken"
  //     : "is not taken"
  // }`;

  // const password = inputLoginPassword.value;
  // document.querySelector(
  //   ".password-validation-error"
  // ).innerHTML = `${password} ${
  //   validateEmail(password) ? "is valid" : "is not valid"
  // }`;
};

signUpBox.addEventListener("input", function (e) {
  Validity(e);
  // console.log(validateEmail(signUpEmail));
  // console.log(validateUserName(signUpUserName.value));
});

signUpBox.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    document
      .querySelector(".sign-up-password-validation")
      .innerHTML.includes("not valid") ||
    document
      .querySelector(".sign-up-username-validation")
      .innerHTML.includes("is taken") ||
    document
      .querySelector(".sign-up-email-validation")
      .innerHTML.includes("is not valid")
    // document.querySelector(".sign-up-username-validation").innerHTML === " " ||
    // document.querySelector(".sign-up-email-validation").innerHTML === " "
  ) {
    alert("Enter All of your details properly");
    return;
  }

  if (!Array.from(document.querySelectorAll("input")).every((el) => el.value)) {
    // document.querySelector(".sign-up-password-validation").innerHTML =
    //   "Enter Password";
    // document.querySelector(".sign-up-email-validation").innerHTML =
    //   "Enter your Email";
    // document.querySelector(".sign-up-username-validation").innerHTML =
    //   "Enter a Username";
    // document.querySelector(".sign-up-fullname-validation").innerHTML =
    //   "Enter your Name";

    Array.from(document.querySelectorAll("input"))
      .filter((el) => !el.value)
      .map(
        (el) =>
          (el.closest("div").querySelector("p").innerHTML = `Please enter ${
            el.closest("div").querySelector("input").className.split("-")[2]
          }`)
      );

    return;
  }

  let currentUser = {
    email: signUpEmail.value,
    fullName: signUpFullName.value,
    userName: signUpUserName.value,
    password: signUpPassword.value,
    posts: [],
    profileImageURL:
      "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg",
    id: 15,
    newAccount: true,
  };

  userLogins.push(currentUser);
  console.log(userLogins);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  window.location.assign("/src/account.html");
});

localStorage.removeItem("currentUser");
