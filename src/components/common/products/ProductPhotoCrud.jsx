import axios from "axios";
import { useState } from "react";
import { useAlert } from "react-alert";
import config from "../../../config/config";
import { getBase64 } from "../../../helpers/getBase64";
import IconAdd from "../icons/IconAdd";
import IconCross from "../icons/IconCross";

const ProductPhotoCrud = (props) => {
  const { items, productId } = props;
  const [photos, setPhotos] = useState(items ? items : []);
  // console.log(photos);
  const alert = useAlert();

  const addPhoto = (data) => {
    axios
      .post(
        `${config.SERVER_URL}/api/admin/products/add-photos/${productId}`,
        {
          photos: [data],
        },
        config.headers
      )
      .then((res) => {
        // console.log(res.data);
        alert.success(`Success`);
        //  history("/products");
        setPhotos(res.data.data.photos);
      })
      .catch((error) => {
        alert.error(`Failed`);
        // console.log(error.response.data.errors);
      });
  };
  const removePhoto = (photoId) => {
    axios
      .delete(
        `${config.SERVER_URL}/api/admin/products/remove-photo/${productId}/${photoId}`,
        config.headers
      )
      .then((res) => {
        alert.success(`Success`);
        // console.log(res.data.data.product);
        setPhotos(
          photos.filter(function (ele) {
            return ele !== photoId;
          })
        );
      })
      .catch((error) => {
        alert.error(`Failed`);
        // console.log(error.response.data.errors);
      });
  };
  const handleImage = async (e) => {
    let files = e.target.files;
    // console.log(files.length);
    await getBase64(files[0])
      .then((result) => {
        // console.log(result);
        addPhoto(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1 className="block mb-2 text-sm font-medium text-gray-900">Photos</h1>
      <div className="grid grid-cols-4 gap-4">
        {photos.map((item, indx) => {
          return (
            <div key={indx} className="space-y-1">
              <img
                className="w-20 h-20"
                src={`${config.SERVER_URL}/public/storage/images/${item}`}
                alt=""
              />
              <button
                onClick={() => removePhoto(item)}
                className="bg-gray-200 rounded-sm flex justify-center items-center w-20 hover:bg-gray-300"
                type="button"
              >
                <IconCross />
              </button>
            </div>
          );
        })}
        <div className="w-20 h-20 bg-gray-300 flex items-center justify-center">
          <label htmlFor="product-img">
            <IconAdd />
          </label>
          <input
            onChange={handleImage}
            type="file"
            name="product-img"
            id="product-img"
            className="hidden"
          />
        </div>
      </div>
    </>
  );
};

export default ProductPhotoCrud;
