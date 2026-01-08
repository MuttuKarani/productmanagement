import "../styles/Toast.css";

const Toast = ({ message, type = "success", onClose }) => {
  return (
    <div className={`toast-custom toast-${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
