const BtnNextPrev = (props) => {
  const { title, handler } = props;
  return (
    <button
      onClick={handler}
      type="button"
      className="focus:outline-none transition duration-150 ease-in-out hover:bg-slate-200 border-2 border-indigo-700 rounded text-indigo-700 px-8 py-1.5 text-sm font-medium"
    >
      {title}
    </button>
  );
};

export default BtnNextPrev;
