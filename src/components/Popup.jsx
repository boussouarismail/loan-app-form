import './popup.css';

export default function Popup({
  showPopup,
  setShowPopup,
  informations,
  setInformations,
  infos,
}) {
  const handleClose = () => {
    setShowPopup(false);
    setInformations(infos);
  };

  const handleShake = () => {
    const popupContent = document.querySelector('.popup-content');
    if (popupContent) {
      popupContent.classList.add('shake');
      setTimeout(() => {
        popupContent.classList.remove('shake');
      }, 300); // Match the animation duration
    }
  };

  if (!showPopup) return null; // Do not render if showPopup is false

  return (
    <div className="popup" onClick={handleShake}>
      <div className="popup-content">
        <h2>Loan Request Submitted</h2>
        <p>Name: {informations.name}</p>
        <p>Phone: {informations.phone}</p>
        <p>Age: {informations.age}</p>
        <p>Employee: {informations.employee ? 'Yes' : 'No'}</p>
        <p>Salary: {informations.salary}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}
