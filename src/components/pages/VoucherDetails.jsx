import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config/config";
import BtnCreate from "../common/form/BtnCreate";
import Loader from "../common/Loader";
import OfferedProducts from "../common/OfferedProducts";
import PageHeader from "../common/PageHeader";
import UserTableForVoucher from "../common/UserTableForVoucher";
import VoucherInfo from "../common/VoucherInfo";
import VoucherTabNav from "../common/VoucherTabNav";

const VoucherDetails = () => {
  const offerId = useParams().id;
  const [data, setData] = useState([]);

  const [tab, setTab] = useState("products");

  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/coupons/${offerId}`, config.headers)
      .then((res) => {
        isLoaded && setData(res.data.data.coupon);
        console.log(res.data.data.coupon);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [offerId]);

  document.title = `Voucher ${data ? data.code : ""} | PUCShop`;

  return Object.keys(data).length > 0 ? (
    <div className="flex flex-col grow px-3 md:px-6 py-3 space-y-4  transition-all duration-200">
      <PageHeader
        title="voucher DETAILS"
        render={
          <>
            <BtnCreate title="Create Product" to="./create" />
          </>
        }
      />

      <div className="w-full">
        <div className="flex flex-col lg:flex-row lg:space-x-4  text-gray-700">
          {/* <OfferInfo data={[]} /> */}

          <VoucherInfo data={data} />
          <div className="grow flex flex-col rounded shadow overflow-hidden bg-white">
            <VoucherTabNav tab={tab} setTab={setTab} />
            {tab === "products" && (
              <OfferedProducts
                products={data.products}
                offerId={offerId}
                section={"coupons"}
              />
            )}
            {tab === "users" && (
              <UserTableForVoucher
                users={data.users}
                offerId={offerId}
                section={"users"}
              />
            )}
            {tab === "appliers" && (
              <UserTableForVoucher
                users={data.appliers}
                offerId={offerId}
                section={"appliers"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default VoucherDetails;
