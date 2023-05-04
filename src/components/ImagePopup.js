function ImagePopup(props) {

  return (
    <section
      className={`popup popup_type_preview ${props.card ? "popup_opened" : ""}`}
      aria-label="preview"
    >
      <figure className="popup__container popup__container_type_preview">
        <button onClick={props.onClose} className="popup__close" type="button"></button>
        <img alt="" src={props.card} className="popup__image" />
        <figcaption className="popup__subtitle">Описание</figcaption>
      </figure>
    </section>);
}

export default ImagePopup;
