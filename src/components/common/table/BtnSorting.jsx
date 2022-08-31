import IconAesc from "../icons/IconAesc";
import IconDesc from "../icons/IconDesc";

const BtnSorting = (props) => {
  const { handler, sortedBy } = props;
  // console.log(sortedBy);
  return (
    <button
      onClick={handler}
      className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
    >
      {sortedBy === 1 ? <IconDesc /> : <IconAesc />}
    </button>
  );
};

export default BtnSorting;
