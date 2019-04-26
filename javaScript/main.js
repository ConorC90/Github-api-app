// Variables
var url = "https://api.github.com/users/";
var gitData;
var reposData;

//Fetch data from Git API
function callFetch() {
  var userValue = document.getElementById("inputBox").value;

  if (userValue.length == 0) {
    document.getElementById("errorBox").style.display = "flex";
    document.getElementById("errorBox").style.backgroundColor = "#f9faa7";
    document.getElementById("hideDiv").style.display = "none";
    document.getElementById("errorBox").innerHTML =
      "Please enter a search term";
  } else {
    startLoader();
    fetch(url + userValue)
      .then(response => response.json())
      .then(data => {
        gitData = data;
        if (gitData.message == "Not Found") {
          endLoader();
          document.getElementById("errorBox").style.display = "flex";
          document.getElementById("errorBox").style.backgroundColor = "#f9dede";
          document.getElementById("hideDiv").style.display = "none";
          document.getElementById("errorBox").innerHTML =
            "The user name " + userValue + " dose not exist";
        } else {
          document.getElementById("errorBox").style.display = "none";
          userInfo();
          repositoriesInfo();
        }
      })
      .catch(error => console.error(error));
  }
}

//Functions

//callFetchOnEnter() calls the fetch when the enter/return key is used
function callFetchOnEnter(e) {
  if (e.keyCode == 13) {
    callFetch();
  }
}

// userInfo() populates the profile page with the fetched information
function userInfo() {
  document.getElementById("bioName").innerHTML = "";
  document.getElementById("bioField").innerHTML = "";
  if (gitData.bio !== null) {
    document.getElementById("bioName").innerHTML = gitData.name + "'s bio:";
    document.getElementById("bioField").innerHTML = gitData.bio;
    document.getElementById("fullNameField").innerHTML = gitData.name;
    document.getElementById("userNameField").innerHTML = "@" + gitData.login;
    document.getElementById("avatarField").src = gitData.avatar_url;
  } else {
    document.getElementById("fullNameField").innerHTML = gitData.name;
    document.getElementById("userNameField").innerHTML = gitData.login;
    document.getElementById("avatarField").src = gitData.avatar_url;
  }
}

// repositoriesInfo() fetches information about the subjects repository
function repositoriesInfo() {
  var userValue = document.getElementById("inputBox").value;
  fetch(url + userValue + "/repos")
    .then(response => response.json())
    .then(data => {
      reposData = data;
      console.log(data);
      document.getElementById("reposName").innerHTML = "";
      repos();
    })
    .catch(error => console.error(error));
}

// populates the repositories names, sarts and forks
function repos() {
  document.getElementById("numberOfRepos").innerHTML = "";

  if (reposData.length == 0) {
    document.getElementById("numberOfRepos").innerHTML =
      gitData.login + " has no repositories";
    endLoader();
  }
  if (reposData.length > 0) {
    for (var i = 0; i < reposData.length; i++) {
      document.getElementById("numberOfRepos").innerHTML = "";
      document.getElementById("numberOfRepos").innerHTML =
        gitData.login + " has " + gitData.public_repos + " repositories";

      var containerDiv = document.createElement("div");

      var nameDiv = document.createElement("div");
      var a = document.createElement("a");
      a.setAttribute("href", reposData[i].svn_url);
      a.setAttribute("target", "_blank");
      a.innerHTML = reposData[i].name;

      nameDiv.appendChild(a);
      nameDiv.setAttribute("class", "repoName");

      var logoDiv = document.createElement("div");
      var node2 = document.createTextNode(reposData[i].stargazers_count);
      var img = document.createElement("img");
      img.setAttribute("class", "starPic");
      img.setAttribute("src", "../media/star2.png");
      logoDiv.appendChild(node2);
      logoDiv.appendChild(img);
      logoDiv.setAttribute("class", "repoIcons");

      var node3 = document.createTextNode(reposData[i].forks_count);
      var img = document.createElement("img");
      img.setAttribute("class", "forkPic");
      img.setAttribute("src", "../media/gitFork.svg");
      img.setAttribute("alt", "forkPic");
      logoDiv.appendChild(node3);
      logoDiv.appendChild(img);
      logoDiv.setAttribute("class", "repoIcons");

      containerDiv.appendChild(nameDiv);
      containerDiv.appendChild(logoDiv);
      document.getElementById("reposName").appendChild(containerDiv);
      containerDiv.setAttribute("class", "repo flex flexBetween");

      endLoader();
    }
  }
}

function startLoader() {
  document.getElementById("errorBox").style.display = "none";
  document.getElementById("hideDiv").style.display = "none";
  document.getElementById("loader").style.display = "block";
}

function endLoader() {
  document.getElementById("searchBoxDiv").style.marginBottom = "15px";
  document.getElementById("hideDiv").style.display = "block";
  document.getElementById("loader").style.display = "none";
}
