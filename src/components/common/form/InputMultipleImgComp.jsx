import { useState } from "react";
import { getBase64 } from "../../../helpers/getBase64";

const InputMultipleImgComp = (props) => {
  const { label, id, name, handler, errMsg } = props;
  const [photosString, setPhotosString] = useState([]);
  // let photos = [];
  const handleImage = async (e) => {
    let files = e.target.files;
    // console.log(files.length);
    let photos = [];

    for (let i = 0; i < files.length; i++) {
      await getBase64(files[i])
        .then((result) => {
          photos[i] = result;
          // photos.push(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // console.log(photos);
    // setPhotosString((photosString) => [...photosString, ...photos]);
    setPhotosString([...photosString, ...photos]);
    // console.log("new length " + photos.length);

    handler(name, photos);
    // console.log(photosString);
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Product Gallery
      </label>
      <label
        htmlFor={id}
        className="h-32 border-dashed border-2 rounded flex justify-center items-center text-xl font-medium"
      >
        {label}
      </label>

      <input
        onChange={handleImage}
        type="file"
        id={id}
        name={name}
        className="hidden"
        multiple
      />
      <div id="preview-image" className="flex flex-auto space-x-2 my-2">
        {photosString.map((item, indx) => {
          return <img key={indx} src={item} alt="" />;
        })}
      </div>
      {errMsg && <small className="text-red-500">{errMsg}</small>}
    </div>
  );
};

export default InputMultipleImgComp;
