import { useState } from "react";
import IconCross from "../icons/IconCross";
import InputComp from "./InputComp";

const InputProductsName = (props) => {
  const { handler, error, label, id, name, values } = props;
  const [products, setProducts] = useState([...values]);
  const [inputValue, setInputValue] = useState("");

  const remove = (name) => {
    const tempCat = products.filter((item) => {
      if (item === name) return false;
      else return true;
    });
    setProducts(tempCat);
  };
  const add = (name, value) => {
    const lastChar = value.charAt(value.length - 1);
    if (lastChar === ",") {
      if (!inputValue) {
        setInputValue("");
        return;
      }
      let tempProducts = [...products];
      tempProducts.push(inputValue);
      setProducts(tempProducts);
      handler(name, products);
      setInputValue("");
    } else {
      setInputValue(value);
    }
  };

  return (
    <>
      <InputComp
        handler={add}
        errMsg={error}
        label={label}
        id={id}
        name={name}
        value={inputValue}
        placeholder="Enter products separate by comma (,)"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {products.map((item, indx) => {
          return (
            <button
              key={indx}
              type="button"
              onClick={() => remove(item)}
              className="bg-gray-200 rounded flex justify-between items-center p-1 overflow-hidden hover:bg-gray-300 hover:text-red-500"
            >
              <h1 className="text-gray-900">{item}</h1> <IconCross />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default InputProductsName;
