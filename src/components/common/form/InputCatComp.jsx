import { useState } from "react";
import IconCross from "../icons/IconCross";
import SelectComp from "./SelectComp";

const InputCatComp = (props) => {
  const { handler, error, categories, values, errMsg } = props;
  const [selectedCat, setSelectedCat] = useState([...values]);

  const remove = (id) => {
    const tempCat = selectedCat.filter((item) => {
      if (item._id === id) return false;
      else return true;
    });
    setSelectedCat(tempCat);
  };
  const add = (name, value) => {
    if (value === "...Select...") return 0;
    let tempCat = [...selectedCat];
    tempCat.push(categories.find((c) => c._id === value));
    setSelectedCat(tempCat);
    handler("category", tempCat);
  };
  const getUnselectedCat = () => {
    const selectedCatId = selectedCat.map((item) => {
      return item._id;
    });
    const unselectedCat = categories.filter((item) => {
      if (selectedCatId.includes(item._id)) return false;
      return true;
    });
    return unselectedCat;
  };

  return (
    <>
      <div>
        <SelectComp
          handler={add}
          errMsg={error}
          label="Category"
          id="category"
          name="category"
          options={getUnselectedCat().map((item) => {
            return { value: item._id, name: item.name };
          })}
        />
        {errMsg && <small className="text-red-500">{errMsg}</small>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {selectedCat.map((item, indx) => {
          return (
            <button
              key={indx}
              type="button"
              onClick={() => remove(item._id)}
              className="bg-gray-200 rounded flex justify-between items-center p-1"
            >
              {item.name} <IconCross />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default InputCatComp;
