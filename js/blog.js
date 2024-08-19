const url = "http://cmsca.local/wp-json/wp/v2/posts";

async function getBlogs() {
  try {
    const response = await fetch(url);
    const blogs = await response.json();

    const resultsContainer = document.querySelector("#carouselcontainer");

    resultsContainer.innerHTML = ""; // Clear the container

    if (Array.isArray(blogs)) {
      blogs.forEach(function (blog) {
        // Assuming blog has the properties you're trying to access
        const blogTitle = blog.title?.rendered || "No title"; // Safe access
        const blogImageUrl =
          blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "default.jpg"; // Safe access

        resultsContainer.innerHTML += `
          <section aria-label="Newest Blog">
            <div class="carousel" data-carousel>
              <button class="carousel-button prev" data-carousel-button="prev">&#8617</button>
              <button class="carousel-button next" data-carousel-button="next">&#8618</button>
              <ul data-slides>
                <li class="slide" data-active>
                  <img src="${blogImageUrl}" alt="Blog Images">
                </li>
              </ul>
            </div>
          </section>`;
      });
    } else {
      console.error("Expected an array but got something else.");
    }
  } catch (error) {
    const resultsContainer = document.querySelector("#carouselcontainer");
    resultsContainer.innerHTML = `<div class="error">An error occurred when calling the blogs API.</div>`;
  }
}

getBlogs();

// import { url } from "./fetch.js";

// async function fetchBlog() {
//   try {
//     const response = await fetch(url);
//     const results = await response.json();
//     console.log(response);
//     console.log(results);
//     displayBlog(results);
//   } catch (error) {
//     const container = document.querySelector("#container");
//     container.innerHTML =
//       '<div class="error">An error occured fetching the blog</div>';
//   }
// }

// fetchBlog();

// function displayBlog(blogs) {
//   container.innerHTML = "";
//   blogs.forEach(function (blog) {
//     const blogItem = createBlog(blog);
//     container.append(blogItem);
//   });
// }

// function createBlog(blog) {
//   const blogDiv = document.createElement("div");
//   blogDiv.classList.add("blog");

//   const linkElement = document.createElement("a");
//   linkElement.href = "blog.html";

//   const h1Element = document.createElement("h1");
//   h1Element.textContent = blog.title.rendered;

//   linkElement.appendChild(h1Element);

//   // Add up to four images
//   for (let i = 0; i < 4; i++) {
//     if (
//       blog._embedded &&
//       blog._embedded["wp:featuredmedia"] &&
//       blog._embedded["wp:featuredmedia"][i]
//     ) {
//       const imgElement = document.createElement("img");
//       imgElement.src = blog._embedded["wp:featuredmedia"][i].source_url;
//       imgElement.alt = blog.title.rendered;
//       linkElement.appendChild(imgElement);
//     }
//   }

//   blogDiv.appendChild(linkElement);

//   return blogDiv;
// }

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
