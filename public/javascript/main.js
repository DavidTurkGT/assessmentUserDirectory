function loadCard(card){
  document.querySelector(".index").classList.toggle("hidden");
  card.classList.toggle("hidden");

}

function hideCard(card){
  card.classList.toggle("hidden");
  document.querySelector(".index").classList.toggle("hidden");
}
