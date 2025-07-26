window.onload = function () {
  fetch("content.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading JSON");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("me-container").style.display = "flex";
      loadingContent(data.content);
    })
    .catch((error) => console.error(error));
};

function loadingContent(content) {
  const nItems = content.length;
  let delay = 2000; //initial delay for typing animation
  content.forEach((item, index) => {
    setTimeout(loading, delay, item, index, nItems);
    delay += 500; //delay for every item
  });
}

function loading(item, index, nItems) {
  const bar = (document.getElementById("terminal-progress-bar").style.display =
    "flex");
  const terminalProgressBar = document.getElementById("terminal-progress-bar");
  terminalProgressBar.scrollIntoView({ behavior: "smooth" });

  loadingItem(item);
  updateLoadingBar(index + 1, nItems);
}

function loadingItem(item) {
  const content = document.getElementById("content");
  content.append(document.createElement("br"));

  const itemContainer = document.createElement("div");
  itemContainer.setAttribute("class", "item-container");

  const flagContainer = document.createElement("div");
  flagContainer.setAttribute("class", "flag-container");

  const h2 = document.createElement("h2");
  h2.textContent = item.flag;
  flagContainer.appendChild(h2);
  itemContainer.appendChild(flagContainer);

  const elem = document.createElement(item.type);
  elem.innerHTML = item.text;
  if (item.url != null) {
    elem.setAttribute("href", item.url);
    elem.setAttribute("alt", item.text);
  }
  if (item.list != null) {
    item.list.forEach((listItem) => {
      const li = document.createElement("li");
      li.textContent = listItem;
      elem.appendChild(li);
    });
  }

  itemContainer.appendChild(elem);
  content.appendChild(itemContainer);
}

function updateLoadingBar(count, nItems) {
  let bar = document.getElementById("bar");
  let percentage = document.getElementById("percentage");
  const total = 30;
  const progress = (total / nItems) * count;
  let done = "█".repeat(progress);
  let todo = "░".repeat(total - progress);

  bar.innerText = `${done}${todo}`;
  percentage.innerText = `${Math.round((progress / total) * 100)}%`;
  count++;
}
