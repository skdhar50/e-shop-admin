import { getBase64 } from "../../../helpers/getBase64";

const InputImgComp = (props) => {
  const { label, id, name, handler, errMsg } = props;

  const handleImage = async (e) => {
    let files = e.target.files;
    // console.log(files.length);
    await getBase64(files[0])
      .then((result) => {
        handler(name, result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type="file"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-2.5"
        name={name}
        // value={value}
        onChange={handleImage}
        multiple
      />
      {errMsg && <small className="text-red-500">{errMsg}</small>}
    </div>
  );
};

export default InputImgComp;
