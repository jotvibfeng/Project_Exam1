// import { url } from "./fetch.js";

async function fetchBlog() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(response);
    console.log(results);
    displayBlog(results);
  } catch (error) {
    const container = document.querySelector("#container");
    container.innerHTML = "";
  }
}

fetchBlog();

const blogLink = document.getElementById("blog-title");

if (blogLink) {
  blogLink.addEventListener("click", function (event) {
    event.preventDefault();

    window.location.href = "blog.html?id=${blogLink.id}";
  });
} else {
  console.error("Element with id 'blog-title' not found.");
}
