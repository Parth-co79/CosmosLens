const API_KEY = "zJtxz4a7eODb50Nhu7mWTqBgDQM9Py1vg8ts1W7l";

const btn = document.getElementById("loadBtn");
const dateInput = document.getElementById("datePicker");

const title = document.getElementById("title");
const image = document.getElementById("image");
const info = document.getElementById("info");
const loading = document.getElementById("loading");

btn.addEventListener("click", () => {
  const date = dateInput.value;
  fetchAPOD(date);
});

async function fetchAPOD(date) {
  try {
    loading.style.display = "block";

    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
    );

    const data = await res.json();

    if (data.media_type !== "image") {
      title.innerText = "No Image";
      info.innerText = "There is no image on this date.";
      image.style.display = "none";
      return;
    }

    image.style.display = "block";
    title.innerText = data.title;
    image.src = data.url;
    info.innerText = data.explanation;

  } 
  catch (err) {
    console.error(err);
    alert("Error fetching data");
  } 
  finally {
    loading.style.display = "none";
  }
}