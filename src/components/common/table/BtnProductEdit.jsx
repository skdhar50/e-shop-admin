import IconEdit from "../icons/IconEdit";

const BtnProductEdit = (props) => {
  return (
    <button
      onClick={props.onClickHandler}
      className="rounded-full bg-slate-200 p-1 text-indigo-700 hover:bg-slate-300"
    >
      <IconEdit />
    </button>
  );
};

export default BtnProductEdit;
