document.addEventListener("DOMContentLoaded", async function () {
  const API_URL = "https://jsonplaceholder.typicode.com/users";
  const STORAGE_KEY = "usersData";
  const EXPIRY_TIME = 24 * 60 * 60 * 1000;
  const userContainer = document.getElementById("ins-api-users");

  function getStoredData() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const { data, timestamp } = JSON.parse(storedData);
      if (Date.now() - timestamp < EXPIRY_TIME) {
        return data;
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  }

  async function fetchUserData() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error while taking datas!");
      }
      const data = await response.json();
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data, timestamp: Date.now() })
      );
      return data;
    } catch (error) {
      userContainer.innerHTML = `<p class="error">${error.message}</p>`;
      return null;
    }
  }

  function displayUsers(users) {
    userContainer.innerHTML = "";
    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.innerHTML = `
                <strong>${user.name}</strong> <br>
                📧 ${user.email} <br>
                📍 ${user.address.street}, ${user.address.city}
                <br>
                <button class="delete-btn" data-id="${user.id}">Delete</button>
            `;
      userContainer.appendChild(userDiv);
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const userId = this.getAttribute("data-id");
        deleteUser(userId);
      });
    });
  }

  function deleteUser(userId) {
    let storedData = getStoredData();
    if (storedData) {
      storedData = storedData.filter((user) => user.id != userId);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data: storedData, timestamp: Date.now() })
      );
      displayUsers(storedData);
    }
  }

  const cachedData = getStoredData();
  if (cachedData) {
    displayUsers(cachedData);
  } else {
    const fetchedData = await fetchUserData();
    if (fetchedData) {
      displayUsers(fetchedData);
    }
  }
});
