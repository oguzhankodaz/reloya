/** @format */

type ButtonProps = {
  children: React.ReactNode;
  disabled: boolean;
};

const Button = ({ disabled, children }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      {children}
    </button>
  );
};

export default Button;
