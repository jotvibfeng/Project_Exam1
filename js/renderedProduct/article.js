const baseUrl = "http://cmsca.local/wp-json/wp/v2/posts";

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function fetchSingleBlog() {
  const articleId = getQueryParam("id");

  if (!articleId) {
    document.querySelector("#container").innerHTML =
      '<div class="error">No article ID provided</div>';
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/${articleId}?_embed`);
    const blog = await response.json();
    console.log(blog);
    displaySingleBlog(blog);
  } catch (error) {
    const container = document.querySelector("#container");
    container.innerHTML =
      '<div class="error">An error occurred fetching the blog</div>';
  }
}

fetchSingleBlog();

function displaySingleBlog(blog) {
  const container = document.querySelector("#container");
  container.innerHTML = "";

  if (blog) {
    const blogItem = createBlog(blog);
    container.append(blogItem);
  } else {
    container.innerHTML = '<div class="error">Blog post not found</div>';
  }
}

function createBlog(blog) {
  const blogDiv = document.createElement("div");
  blogDiv.classList.add("content-blog");

  const h1Element = document.createElement("h1");
  h1Element.textContent = blog.title.rendered;
  h1Element.classList.add("article-title");

  blogDiv.append(h1Element);

  const contentParagraph = document.createElement("p");
  contentParagraph.innerHTML = blog.content.rendered;
  blogDiv.append(contentParagraph);

  return blogDiv;
}

// var modal = document.getElementById("myModal");

// // Get the image and insert it inside the modal - use its "alt" text as a caption
// var img = document.getElementById("myImage");
// var modalImg = document.getElementById("modalImage");

// img.onclick = function ("") {
//   modal.style.display = "block";
//   modalImg.src = this.src;
// };

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// // Close modal when clicking anywhere outside the image
// modal.onclick = function (event) {
//   if (event.target === modal) {
//     modal.style.display = "none";
//   }
// };
