const Operation = ({ value, onClick, className }) => {
  /** TODO: What happens when a user clicks an Operation, what do we want to pass to our parent? */
  return (
    <div
      className = {className}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Operation;
