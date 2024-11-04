const url =
  "https://cors.noroff.dev/https://joakimfengaas.no/wp-json/wp/v2/posts/?_embed";

async function fetchBlog() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    displayBlogs(results);
  } catch (error) {
    const container = document.querySelector("#container");
    container.innerHTML =
      '<div class="error">An error occured fetching the blogs</div>';
  }
}

fetchBlog();

function displayBlogs(blogs) {
  const container = document.querySelector("#container");

  container.innerHTML = "";

  blogs.forEach(function (blog) {
    const blogItem = createBlog(blog);
    container.append(blogItem);
  });
}

function createBlog(blog) {
  const blogDiv = document.createElement("div");
  blogDiv.classList.add("blog");

  const h1Element = document.createElement("h1");
  h1Element.classList.add("blog-title");
  h1Element.textContent = blog.title.rendered;

  const linkElement = document.createElement("a");
  linkElement.classList.add("a-link");
  linkElement.href = `blog.html?id=${blog.id}`;

  if (
    blog._embedded &&
    blog._embedded["wp:featuredmedia"] &&
    blog._embedded["wp:featuredmedia"][0]
  ) {
    const imgElement = document.createElement("img");
    imgElement.classList.add("product-image");
    imgElement.src = blog._embedded["wp:featuredmedia"][0].source_url;
    imgElement.alt = blog.title.rendered;
    blogDiv.append(imgElement);
  } else {
    const placeholder = document.createElement("img");
    placeholder.src = "default-image.jpg";
    placeholder.alt = "Placeholder Image";
    blogDiv.append(placeholder);
  }

  linkElement.append(h1Element);
  blogDiv.append(linkElement);

  return blogDiv;
}
