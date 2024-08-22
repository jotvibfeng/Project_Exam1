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

const url = "http://cmsca.local/wp-json/wp/v2/posts?_embed";

async function fetchAndCreateBlogs() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const posts = await response.json();

    const slidesContainer = document.querySelector("#slides");

    // Clear the container
    slidesContainer.innerHTML = "";

    // Create slides for each post
    posts.forEach((post, index) => {
      const slide = document.createElement("li");
      slide.classList.add("slide");
      if (index === 0) {
        slide.setAttribute("data-active", "true");
      }

      const imgElement = document.createElement("img");
      const imageUrl =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "default-image.jpg";
      imgElement.src = imageUrl;
      imgElement.alt = post.title.rendered;

      slide.appendChild(imgElement);
      slidesContainer.appendChild(slide);
    });

    // Initialize carousel buttons
    const buttons = document.querySelectorAll("[data-carousel-button]");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button
          .closest("[data-carousel]")
          .querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;

        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].setAttribute("data-active", "true");
        activeSlide.removeAttribute("data-active");
      });
    });
  } catch (error) {
    const resultsContainer = document.querySelector("#carousel-container");
    resultsContainer.innerHTML = `<div class="error">An error occurred when calling the blogs API.</div>`;
    console.error("Fetch error:", error); // Log the error to the console
  }
}

fetchAndCreateBlogs();

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSilde = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSilde) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSilde.dataset.active;
  });
});
