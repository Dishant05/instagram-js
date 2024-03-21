import { userLogins } from "./database.js";

const profileName = document.querySelector(".profile-user-name");
const addPostBtn = document.querySelector(".add-post-btn");

const newPostWindow = document.querySelector(".add-new-post");

const modalWindowsDiv = document.querySelector(".modal-windows");

const newPostImageURL = document.querySelector(".new-post-image-url");
const newPostDescription = document.querySelector(".new-post-description-text");
const newPostSubmissionBtn = document.querySelector(".new-post-submission-btn");

const searchBox = document.querySelector(".search-box");

const postImageType = document.querySelector(".post-image-type");
const postCount = document.querySelector(".profile-posts");
const imageType = document.querySelector(".post-image-type-filter");
const postGallery = document.querySelector(".gallery");

const overlayFilter = document.querySelector(".overlay");

let fileUpload = new FileReader();

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
// console.log(
//   currentUser.posts[0].userId ===w
//     JSON.parse(localStorage.getItem("currentUser")).posts[0].userId
// );

document.querySelector(".profile-user-name").textContent = currentUser.userName;
document.querySelector(".profile-real-name").textContent = currentUser.fullName;
document.querySelector(".username").textContent = currentUser.userName;
document.querySelector(".profile-image").querySelector("img").src =
  currentUser.profileImageURL;
// document.querySelector(
//   ".user-profile"
// ).style.backgroundImage = `url('${currentUser.profileImageURL}')`;
// console.log(
//   document.querySelector(".user-profile").style.backgroundImage
//   // .slice(5, 43)
// );
// const URLTest = document
//   .querySelector(".user-profile")
//   .style.backgroundImage.split('"');

// console.log(URLTest[1]);

// console.log(document.querySelector(".icon user-profile"));
postCount.textContent = currentUser.posts.length;
// profileName.textContent = currentUser.userName;

// console.log(postImageType);

imageType.addEventListener("click", function (e) {
  console.log(e.target.value);
  galleryRender(currentUser.posts);
  let selectedImages = Array.from(
    document.querySelectorAll(`.gallery-image[alt="${e.target.value}"]`)
  );
  console.log(imageType.value);

  if (e.target.value === "") {
    galleryRender(currentUser.posts);
    return;
  }

  // if (!currentUser.value === "") galleryRender(currentUser.posts);

  let selectedPosts = [];
  // console.log(selectedImages);
  for (let post of selectedImages) {
    selectedPosts.push(post.closest("div").id);
    // console.log(post.closest("div"));
  }

  console.log(selectedPosts);

  let selectedPostsObj = [];

  for (let postID of selectedPosts) {
    selectedPostsObj.push(
      currentUser.posts.find((post) => post.postNo === postID)
    );
  }

  console.log(selectedPostsObj);
  // let selectedPostsObj = currentUser.posts.find(
  //   (post) => post.postNo === selectedPosts[2]
  // );

  // const selectedPosts = selectedImages.map((img) =>
  //   img.closest("gallery-item")
  // );
  // console.log(selectedImages);
  galleryRender(selectedPostsObj);
});

const newPostModal = () => {
  document.body.style.overflowY = "hidden";
  document.querySelector(
    ".extra"
  ).style.backgroundImage = `url('${currentUser.profileImageURL}')`;
  document.querySelector(".new-post-image-url").value = "";

  // document.querySelector(".post-image").src = "";
  newPostWindow.classList.toggle("hidden");
  overlayFilter.classList.toggle("hidden");
};

const postInfoModal = () => {
  const postInfoWindow = document.querySelector(".post-info");
  document.querySelector(".username").textContent = currentUser.userName;
  document.body.style.overflowY = "hidden";
  overlayFilter.classList.toggle("hidden");
  postInfoWindow.classList.toggle("hidden");
  document.body.style.overflowY = "hidden";
};

const changingBetweenPostModals = (postObj) => {
  const postInfoWindow = document.querySelector(".post-info");
  const postEditWindow = document.querySelector(".post-info-edit");
  postInfoWindow.classList.toggle("hidden");
  postEditWindow.classList.toggle("hidden");

  // postEditWindow.querySelector(".new-image-url").value = postObj.postImageURL;
  postEditWindow.querySelector(".new-description-text").value =
    postObj.description;
  postEditWindow.querySelector(".post-image").src = postObj.postImageURL;
  document.querySelector(".username").textContent = currentUser.userName;
};

const closingEditModal = () => {
  const postEditWindow = document.querySelector(".post-info-edit");
  console.log("h");
  document.body.style.overflowY = "visible";
  overlayFilter.classList.toggle("hidden");
  postEditWindow.classList.toggle("hidden");
};

const postLookUp = (id) => {
  return currentUser.posts.find((post) => post.postNo === id);
};

const galleryRender = (postsObj) => {
  postGallery.innerHTML = "";
  postsObj.map((post) =>
    postGallery.insertAdjacentHTML("beforeend", galleryPostMarkup(post))
  );
  // Array.from(postGallery.querySelectorAll(".gallery-item-info")).map((post) =>
  //   post.querySelector(".fa-close").classList.add("hidden")
  // );
};

// const newGalleryPostMarkup = (newPostObj) => {
//   return `
//                <div class="gallery-item" tabindex="${newPostObj.postNo}">
//                 <img
//                   src="${newPostObj.postImageUrl}"
//                   class="gallery-image"
//                   alt=""
//                 />
//                 <div class="gallery-item-info">
//               <ul>
//                 <li class="hover-edit-post">
//                   <span class="visually-hidden">Likes:</span
//                   ><i class="fa" aria-hidden="true"></i> View
//                 </li>
//               </ul>
//             </div>
//           </div>
//             `;
// };

// const newGalleryRender = (postsObj) => {
//   postGallery.innerHTML = "";
//   postsObj.map((post) =>
//     postGallery.insertAdjacentHTML("beforeend", galleryPostMarkup(post))
//   );
// };

const galleryPostMarkup = (newPostObj) => {
  return `
               <div class="gallery-item" id="${newPostObj.postNo}" data-user-id="${newPostObj.userId}">
                <img
                  src="${newPostObj.postImageURL}"
                  class="gallery-image"
                  alt="${newPostObj.type}"
                />
                <div class="gallery-item-info">
              <ul>
                <li class="hover-edit-post">
                  <span class="visually-hidden">Likes:</span
                  ><i class="fa" aria-hidden="true"></i> View
                </li>
                <li class="hover-delete-post">
                  
                  <i class="fa fa-close" aria-hidden="true"></i>
                  
                </li>
              </ul>
            </div>
          </div>
            `;
};

const viewPostMarkup = (postObj) => {
  return ` 
      <div class="modal post-info hidden">
      <div class="info">
        <div class="user">
          <div class="profile-pic">
            <div class="icon user-profile extra"></div>
          </div>
          <p class="username">janedoe_</p>
        </div>
        <div class="post-btns">
        <a
          ><img src="src/img/option.PNG" class="options edit-post" alt=""
        /></a>
        <a
        ><img
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png"
          class="options close-post"
          alt=""
      /></a>
      </div>
      </div>
      <img src="${postObj.postImageURL}" class="post-image" alt="" />
      <div class="post-content">
        <div class="reaction-wrapper">
          <img src="src/img/like.PNG" class="icon" alt="" />
          <img src="src/img/comment.PNG" class="icon" alt="" />
          <img src="src/img/send.PNG" class="icon" alt="" />
          <img src="src/img/save.PNG" class="save icon" alt="" />
        </div>
        <p class="likes">0 likes</p>
        <p class="description">
          <span>${currentUser.userName}</span> ${postObj.description}
        </p>
      </div>
    </div>
  `;
};

const editPostMarkup = () => {
  return `
    <div class="modal post-info-edit hidden">
    <div class="info">
      <div class="user">
        <div class="profile-pic">
          <div class="icon user-profile extra"></div>
        </div>
        <p class="username">janedoe_</p>
      </div>
      <a
        ><img
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png"
          class="options close-post"
          alt=""
      /></a>
    </div>
    <div class="post-specific-image">
      <img src="" class="post-image" alt="" />
    </div>
    <form>
      <div class="image-replace">
        <label for="new-image">Upload New Image</label>
        <input
          type="file"
          class="new-image-url"
          placeholder="Enter URL"
        />
      </div>
      <div class="image-filter">
        <label for="edited-post-image-type">Type: </label>
        <select name="post-image-type" class="edited-post-image-type">
          <option value="city">City</option>
          <option value="nature">Nature</option>
        </select>
      </div>
      <div class="post-content">
        <p class="description new-description">
          <label for="new-description">New description: </label>
          <input
            class="new-description-text"
            placeholder="New Description"
          />
        </p>
      </div>
      <div class="edited-post-submit-delete">
        <input
          class="edited-post-submission-btn"
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  </div>
  `;
};

addPostBtn.addEventListener("click", newPostModal);

newPostWindow.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-post")) {
    newPostModal();
  }

  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  if (e.target.classList.contains("new-post-submission-btn")) {
    e.preventDefault();
    const newPost = {
      postNo: makeid(4),
      postImageURL: fileUpload.result,
      type: postImageType.value,
      description: newPostDescription.value,
      id: makeid(2),
      userId: 15,
    };
    currentUser.posts.push(newPost);

    postGallery.insertAdjacentHTML("beforeend", galleryPostMarkup(newPost));
    newPostModal();
    console.log(currentUser.posts);
    document.body.style.overflowY = "visible";
    // console.log(document.querySelector(".post-image").src);
    postCount.textContent = currentUser.posts.length;
  }
});

// newPostWindow.addEventListener("input", async function (e) {
//   if (e.target.classList.contains("new-post-image-url")) {
//     document.querySelector(".post-image").src = await newPostImageURL.value;
//   }
// });

document
  .querySelector(".new-post-image-url")
  .addEventListener("change", function () {
    fileUpload = new FileReader();
    fileUpload.addEventListener("load", function () {
      // document.querySelector(".new-post-image-url").src = fileUpload.result;
      document.querySelector(".new-post-image").src = fileUpload.result;
    });

    fileUpload.readAsDataURL(
      document.querySelector(".new-post-image-url").files[0]
    );
  });

postGallery.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-close")) {
    // if (
    //   currentUser.posts[0].userId !==
    //   JSON.parse(localStorage.getItem("currentUser")).posts[0].userId
    // ) {
    //   // document
    //   //   .querySelector(".gallery-item:hover")
    //   //   .querySelector(".fa-close")
    //   //   .classList.add("hidden");

    //   console.log(
    //     currentUser.posts[0].userId ===
    //       JSON.parse(localStorage.getItem("currentUser")).posts[0].userId
    //   );
    //   return;
    // }
    const postID = e.target.closest(".gallery-item").id;
    console.log(postID);
    const postObj = postLookUp(postID);
    console.log(postObj);
    const postToChangeIndex = currentUser.posts.findIndex(
      (post) => post.postNo === postObj.postNo
    );

    currentUser.posts.splice(postToChangeIndex, 1);
    console.log(currentUser.posts);
    galleryRender(currentUser.posts);
    postCount.textContent = currentUser.posts.length;
  }

  if (e.target.classList.contains("hover-edit-post")) {
    // document
    //   .querySelector(".hover-delete-post")
    //   .addEventListener("click", function () {
    //     console.log("hello");
    //   });

    const postID = e.target.closest(".gallery-item").id;
    console.log(postID);
    const postObj = postLookUp(postID);
    console.log(postObj);

    modalWindowsDiv.insertAdjacentHTML("afterbegin", viewPostMarkup(postObj));
    postInfoModal();
    document.querySelector(
      ".extra"
    ).style.backgroundImage = `url('${currentUser.profileImageURL}')`;

    // if(currentUser.userName === )

    // console.log(JSON.parse(localStorage.getItem("currentUser")).posts);

    // if (JSON.parse(localStorage.getItem("currentUser")).posts.length !== 0) {
    if (
      currentUser.posts[0].userId !==
      JSON.parse(localStorage.getItem("currentUser")).id
    ) {
      document.querySelector(".edit-post").classList.add("hidden");
    }

    document
      .querySelector(".post-info")
      .addEventListener("click", function (e) {
        if (e.target.classList.contains("close-post")) {
          postInfoModal();
        }
        if (e.target.classList.contains("edit-post")) {
          modalWindowsDiv.insertAdjacentHTML("afterbegin", editPostMarkup());
          changingBetweenPostModals(postObj);

          document.querySelector(
            ".extra"
          ).style.backgroundImage = `url('${currentUser.profileImageURL}')`;

          document.querySelector(".edited-post-image-type").value =
            postObj.type;

          document
            .querySelector(".new-image-url")
            .addEventListener("change", function () {
              fileUpload.addEventListener("load", function () {
                document.querySelector(".post-image").src = fileUpload.result;
              });
              fileUpload.readAsDataURL(
                document.querySelector(".new-image-url").files[0]
              );
              // document.querySelector(".new-image-url").value = "";
            });

          document
            .querySelector(".close-post")
            .addEventListener("click", closingEditModal);

          document
            .querySelector(".edited-post-submission-btn")
            .addEventListener("click", function (e) {
              e.preventDefault();
              closingEditModal();
              const postToChangeIndex = currentUser.posts.findIndex(
                (post) => post.postNo === postObj.postNo
              );
              const postNo = currentUser.posts[postToChangeIndex].postNo;
              currentUser.posts.splice(postToChangeIndex, 1, {
                postNo: postNo,
                postImageURL: document.querySelector(".post-image").src,

                // fileUpload.result
                //   ? fileUpload.result
                //   : postObj.postImageURL,
                type: document.querySelector(".edited-post-image-type").value,
                description: document.querySelector(".new-description-text")
                  .value,
                userId: currentUser.id,
              });

              console.log(currentUser.posts);
              galleryRender(currentUser.posts);
            });

          // document
          //   .querySelector(".edited-post-delete-btn")
          //   .addEventListener("click", function (e) {
          //     e.preventDefault();
          //     closingEditModal();
          //     const postToChangeIndex = currentUser.posts.findIndex(
          //       (post) => post.postNo === postObj.postNo
          //     );

          //     currentUser.posts.splice(postToChangeIndex, 1);
          //     console.log(currentUser.posts);
          //     // console.log(
          //     //   currentUser.posts.indexOf(
          //     //     currentUser.posts.find(
          //     //       (post) => post.postNo === postObj.postNo
          //     //     )
          //     //   )
          //     // );
          //     galleryRender(currentUser.posts);
          //     postCount.textContent = currentUser.posts.length;
          //   });
        }
      });
    // postInfoWindow.classList.toggle("hidden");
  }
});

document.addEventListener("keydown", function (e) {
  // document.querySelector(".results-box").innerHTML = "";
  const postInfoWindow = document.querySelector(".post-info");
  if (e.key === "Escape" && !postInfoWindow.classList.contains("hidden"))
    postInfoModal();
});

searchBox.addEventListener("input", async function () {
  document.querySelector(".results-box").classList.remove("hidden");

  try {
    if (!searchBox.value) {
      document.querySelector(".results-box").classList.add("hidden");
    }

    let searchedUserApi = await fetch(
      `https://6567297f64fcff8d730fda23.mockapi.io/user?userName=${searchBox.value}`
    );

    let searchedUserObj = await searchedUserApi.json();
    console.log(searchedUserObj[0]);

    if (searchedUserObj[0].userName === currentUser.userName) {
      throw new Error();
    }
    document.querySelector(".profile-pic").querySelector("img").src =
      searchedUserObj[0].profileImageURL;

    document.querySelector(".profile-username").textContent =
      searchedUserObj[0].userName;
  } catch (err) {
    document.querySelector(".profile-username").innerHTML = "No Results Found";
    document.querySelector(".profile-pic").querySelector("img").src = "";
  }
});

document
  .querySelector(".results-box")
  .addEventListener("click", async function (e) {
    if (e.target.classList.contains("profile-card")) {
      // console.log(e.target.querySelector(".profile-username").textContent);
      let searchedUserApi = await fetch(
        `https://6567297f64fcff8d730fda23.mockapi.io/user?userName=${
          e.target.querySelector(".profile-username").textContent
        }`
      );

      let searchedUserObj = await searchedUserApi.json();

      searchBox.value = "";
      document.querySelector(".results-box").classList.add("hidden");

      document.querySelector(".profile-user-name").textContent =
        searchedUserObj[0].userName;
      document.querySelector(".profile-real-name").textContent =
        searchedUserObj[0].fullName;

      galleryRender(searchedUserObj[0].posts);
      document.querySelector(".profile-posts").textContent =
        searchedUserObj[0].posts.length;

      addPostBtn.classList.add("hidden");
      document.querySelector(".profile-image").querySelector("img").src =
        searchedUserObj[0].profileImageURL;
      Array.from(postGallery.querySelectorAll(".gallery-item-info")).map(
        (post) => post.querySelector(".fa-close").classList.add("hidden")
      );
      console.log(searchedUserObj[0]);
      currentUser = searchedUserObj[0];
    }
  });

document.querySelector(".home-btn").addEventListener("click", function () {
  window.location.assign("account.html");
});

console.log(currentUser);
console.log(currentUser.userName);
galleryRender(currentUser.posts);

// document.querySelector("body").addEventListener("click", function (e) {
//   const postInfoWindow = document.querySelector(".post-info");
//   console.log(postInfoWindow);
//   // if (e.target.classList.contains(".edit-post")) console.log("h");
// });
