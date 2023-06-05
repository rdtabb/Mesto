function handleLike(e) {
  e.target.classList.toggle("card__like_true");
}
function handleDelete(e) {
  e.target.closest("article").remove();
}
export { handleLike, handleDelete }