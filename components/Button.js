const Button = ({ onClick = () => {}, children, className }) => {
  return (
    <button
      className={`rounded-sm text-sm bg-white border border-gray-300 focus:outline-none focus:ring focus:ring-blue ${className} focus:z-10`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
