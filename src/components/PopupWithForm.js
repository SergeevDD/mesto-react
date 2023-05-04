function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen} `} aria-label={props.name}>
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__close" type="button"></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={`popupForm${props.name}`} noValidate>
          {props.children}
          <button name="saveBtn" type="submit" className="popup__save">{props.btnText}</button>
        </form>
      </div>
    </section>);
}

export default PopupWithForm;
