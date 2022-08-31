import { Link } from "react-router-dom";
import IconPlus from "../icons/IconPlus";

const BtnCreate = (props) => {
  const { title, to } = props;
  return (
    <>
      <Link
        to={to}
        className="flex items-center space-x-1 bg-indigo-700 text-slate-100 h-8 px-1.5 rounded hover:bg-indigo-600"
      >
        <IconPlus />
        <span>{title}</span>
      </Link>
    </>
  );
};

export default BtnCreate;
