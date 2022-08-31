import ImageGallery from "react-image-gallery";
import config from "../../../config/config";

const ProductPhotoSlider = (props) => {
  let images;
  if (props.photos.length) {
    images = props.photos.map((item) => {
      return {
        original: `${config.SERVER_URL}/public/storage/images/${item}`,
        thumbnail: `${config.SERVER_URL}/public/storage/images/${item}`,
      };
    });
  } else {
    images = props.name.split(" ").map((item) => {
      return {
        original: `https://via.placeholder.com/400x400.png/f2f2f2?text=${item}`,
        thumbnail: `https://via.placeholder.com/400x400.png/f2f2f2?text=${item}`,
      };
    });
  }
  // console.log(props.name.split(" "));

  return (
    <div className="flex flex-col space-y-2 min-w-[20rem] max-w-[20rem] 2xl:sticky 2xl:top-[5rem] mb-10">
      <ImageGallery items={images} />
    </div>
  );
};

export default ProductPhotoSlider;
