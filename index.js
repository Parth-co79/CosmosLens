const API_KEY = "zJtxz4a7eODb50Nhu7mWTqBgDQM9Py1vg8ts1W7l";
const elements = {
  btn: document.getElementById("loadBtn"),
  downloadBtn: document.getElementById("downloadBtn"),
  dateInput: document.getElementById("datePicker"),
  title: document.getElementById("title"),
  image: document.getElementById("image"),
  info: document.getElementById("info"),
  loading: document.getElementById("loading"),
};
let hdImageUrl = "";
elements.btn.addEventListener("click", () => {
  fetchAPOD(elements.dateInput.value);
});
elements.downloadBtn.addEventListener("click", () => {
  if (!hdImageUrl) {
    alert("No HD image available");
    return;
  }
  const link = document.createElement("a");
  link.href = hdImageUrl;
  link.setAttribute("download", "nasa-apod-hd.jpg");
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
async function fetchAPOD(date) {
  try {
    toggleLoading(true);

    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
    );
    const data = await res.json();
    if (data.media_type !== "image") {
      updateUI([
        { el: elements.title, value: "No Image" },
        { el: elements.info, value: "There is no image on this date." }
      ]);
      elements.image.style.display = "none";
      hdImageUrl = "";
      return;
    }
    elements.image.style.display = "block";
    updateUI([
      { el: elements.title, value: data.title },
      { el: elements.info, value: data.explanation }
    ]);
    elements.image.src = data.url;
    hdImageUrl = data.hdurl || data.url;
  } catch (err) {
    console.error(err);
    alert("Error fetching data");
  } finally {
    toggleLoading(false);
  }
}
function updateUI(updates) {
  updates.forEach(({ el, value }) => {
    el.innerText = value;
  });
}
function toggleLoading(show) {
  elements.loading.style.display = show ? "block" : "none";
}