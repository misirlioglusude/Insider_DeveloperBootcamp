var appendLocation = document.querySelector("#userContainer");
if (!appendLocation) {
  appendLocation = document.createElement("div");
  appendLocation.id = "userContainer";
  document.body.appendChild(appendLocation);
}

var STORAGE_KEY = "usersData";
var EXPIRE_DURATION = 3600000;

function fetchUsers() {
  return [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "E" },
  ];
}

function loadUsers() {
  var now = Date.now();
  var users, expire;
  var stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      var parsed = JSON.parse(stored);
      users = parsed.data;
      expire = parsed.expire;
      if (now > expire || !users.length) {
        console.log("Fetching new user data...");
        users = fetchUsers();
        expire = now + EXPIRE_DURATION;
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ data: users, expire: expire })
        );
      }
    } catch (e) {
      console.log("Error parsing storage, resetting data.");
      users = fetchUsers();
      expire = now + EXPIRE_DURATION;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data: users, expire: expire })
      );
    }
  } else {
    console.log("No stored data found, fetching new users.");
    users = fetchUsers();
    expire = now + EXPIRE_DURATION;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data: users, expire: expire })
    );
  }
  renderUsers(users);
}

function renderUsers(users) {
  appendLocation.innerHTML = "";
  if (users && users.length > 0) {
    users.forEach(function (user) {
      var userDiv = document.createElement("div");
      userDiv.className = "user";
      userDiv.dataset.userId = user.id;

      var nameSpan = document.createElement("span");
      nameSpan.textContent = user.name;

      var delButton = document.createElement("button");
      delButton.textContent = "Delete";
      delButton.addEventListener("click", function () {
        deleteUser(user.id);
      });

      userDiv.appendChild(nameSpan);
      userDiv.appendChild(delButton);
      appendLocation.appendChild(userDiv);
    });
  }
}

function deleteUser(userId) {
  console.log("Deleting user:", userId);
  var userElem = appendLocation.querySelector(
    '[data-user-id="' + userId + '"]'
  );
  if (userElem) {
    appendLocation.removeChild(userElem);
  }
  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      var parsed = JSON.parse(stored);
      var users = parsed.data;
      users = users.filter(function (user) {
        return user.id !== userId;
      });
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data: users, expire: parsed.expire })
      );
    } catch (e) {
      console.log("Error in deleteUser:", e);
    }
  }
}

var observer = new MutationObserver(function () {
  console.log("Mutation detected"); 
  var userDivs = appendLocation.querySelectorAll(".user");
  if (userDivs.length === 0) {
    console.log("No users left, showing reload button");
    if (!sessionStorage.getItem("reloadUsed")) {
      showReloadButton();
    }
  } else {
    var existingButton = document.getElementById("reloadButton");
    if (existingButton) {
      console.log("Removing reload button");
      existingButton.remove();
    }
  }
});
observer.observe(appendLocation, { childList: true, subtree: true });

function showReloadButton() {
  if (document.getElementById("reloadButton")) return;
  console.log("Adding reload button");
  var btn = document.createElement("button");
  btn.id = "reloadButton";
  btn.textContent = "Reload Users";
  btn.addEventListener("click", function () {
    sessionStorage.setItem("reloadUsed", "true");
    loadUsers();
    btn.remove();
  });
  appendLocation.appendChild(btn);
}

loadUsers();
