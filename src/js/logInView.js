import { userLogins } from "./database.js";

const inputLoginEmail = document.querySelector(".login-email");
const inputLoginPassword = document.querySelector(".login-password");
const frontPageLoginBox = document.querySelector(".wrapper");
// const emailBox = document.querySelector(".email-entry");
document.querySelector(".login-btn").innerHTML = "Log in";
//
if (frontPageLoginBox) {
  frontPageLoginBox.addEventListener("input", function (e) {
    e.target
      .closest(".valid-container")
      .querySelector(".overall-validation").innerHTML = "";

    if (document.querySelector(".final-validation")) {
      document.querySelector(".final-validation").innerHTML = "";
    }
  });

  frontPageLoginBox.addEventListener("submit", async function (e) {
    e.preventDefault();

    // if (
    //   userLogins.find((acc) => acc.email === inputLoginEmail.value) !==
    //   inputLoginEmail.value
    // )
    // console.log(
    //   userLogins.find((acc) => acc.email === inputLoginEmail.value) !==
    //     inputLoginEmail.value
    // );
    // let currentAccount = userLogins.find(
    //   (acc) =>
    //     acc.email === inputLoginEmail.value &&
    //     acc.password === inputLoginPassword.value
    // );
    try {
      const userApi = await fetch(
        `https://6567297f64fcff8d730fda23.mockapi.io/user?password=${inputLoginPassword.value}&email=${inputLoginEmail.value}`
      );
      console.log(userApi);
      const userApiObj = await userApi.json();

      if (userApiObj.length === 0) throw new Error();

      if (
        !Array.from(document.querySelectorAll("input")).every((el) => el.value)
      ) {
        Array.from(document.querySelectorAll("input"))
          .filter((el) => !el.value)
          .map(
            (el) =>
              (el
                .closest("div")
                .querySelector("p").innerHTML = `Please enter your ${
                el.closest("div").querySelector("input").className.split("-")[1]
              }`)
          );

        return;
      }

      const currentUser = userApiObj[0];
      console.log(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      window.location.assign("account.html");
    } catch (err) {
      if (document.querySelector(".final-validation")) {
        document.querySelector(".final-validation").remove();
      }
      document
        .querySelector(".l-part")
        .insertAdjacentHTML(
          "afterend",
          '<p class="overall-validation final-validation">Sorry, your email or password was incorrect. Please double-check.</p>'
        );
    }

    // let currentPass = userLogins.find(
    //   (acc) =>
    // );
    // console.log(currentPass);

    // if (currentAccount === undefined) {
    //   document
    //     .querySelector(".l-part")
    //     .insertAdjacentHTML(
    //       "afterend",
    //       '<p class="overall-validation">Sorry, your email or password was incorrect. Please double-check.</p>'
    //     );
    // document.querySelector(".overall-validation").innerHTML =
    //   "Sorry, your email or password was incorrect. Please double-check.";
    // } else {
    //   console.log(currentAccount);
    //   if (document.querySelector(".overall-validation")) {
    //     document.querySelector(".overall-validation").innerHTML = "";
    //     inputLoginEmail.value = inputLoginPassword.value = "";
    //   }
    // }
  });
}

localStorage.removeItem("currentUser");
