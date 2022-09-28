const Number = ({ value, onClick, className }) => {
  /** TODO: What happens when a user clicks a number, what do we want to pass to our parent? */
  return (
    <div
      className = {className}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Number;
