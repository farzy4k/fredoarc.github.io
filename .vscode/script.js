function toggleSidebar(){
  document.getElementById("sidebar").classList.toggle("hide");
}

/* SEARCH VIDEO */
function searchVideo(){
  let query = document.getElementById("search").value;
  if(query === "") return;

  let content = document.getElementById("content");

  content.innerHTML = `
  <div class="video-card">
  <iframe src="https://www.youtube.com/embed?listType=search&list=${query}" allowfullscreen></iframe>
  <h3>Hasil: ${query}</h3>
  <p>YouTube Search</p>
  </div>
  `;
}
