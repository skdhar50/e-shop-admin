import { Navigate, Route, Routes } from "react-router-dom";
import AdminList from "../pages/AdminList";
import BannerList from "../pages/BannerList";
import BrandList from "../pages/BrandList";
import CategoryList from "../pages/CategoryList";
import CreateProduct from "../pages/CreateProduct";
import CRM from "../pages/CRM";
import CustomerList from "../pages/CustomerList";
import Dashboard from "../pages/Dashboard";
import DealerList from "../pages/DealerList";
import DealList from "../pages/DealList";
import EmployeeList from "../pages/EmployeeList";
import Home from "../pages/Home";
import OfferDetails from "../pages/OfferDetails";
import OfferList from "../pages/OfferList";
import OrderDetails from "../pages/OrderDetails";
import OrderList from "../pages/OrderList";
import ProductDetails from "../pages/ProductDetails";
import ProductList from "../pages/ProductList";
import ProductUpdate from "../pages/ProductUpdate";
import SliderList from "../pages/Slider";
import UserProfile from "../pages/UserProfile";
import VoucherDetails from "../pages/VoucherDetails";
import VoucherList from "../pages/VoucherList";
const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/customers" element={<CustomerList />} />
        <Route exact path="/customers/:id" element={<UserProfile />} />
        <Route exact path="/admins" element={<AdminList />} />
        <Route exact path="/products" element={<ProductList />} />
        <Route exact path="/products/create" element={<CreateProduct />} />
        <Route exact path="/products/:id" element={<ProductDetails />} />
        <Route exact path="/products/:id/update" element={<ProductUpdate />} />
        <Route exact path="/categories" element={<CategoryList />} />
        <Route exact path="/brands" element={<BrandList />} />
        <Route exact path="/orders" element={<OrderList />} />
        <Route exact path="/orders/:id" element={<OrderDetails />} />
        <Route exact path="/crm" element={<CRM />} />
        <Route exact path="/offers" element={<OfferList />} />
        <Route exact path="/offers/:id" element={<OfferDetails />} />
        <Route exact path="/vouchers" element={<VoucherList />} />
        <Route exact path="/vouchers/:id" element={<VoucherDetails />} />
        <Route exact path="/sliders" element={<SliderList />} />
        <Route exact path="/banners" element={<BannerList />} />
        <Route exact path="/deals" element={<DealList />} />
        <Route exact path="/dealers" element={<DealerList />} />
        <Route exact path="/employees" element={<EmployeeList />} />
        <Route exact path="/messages" element={<h1>Messages</h1>} />
        <Route exact path="/invoices" element={<h1>Invoices</h1>} />
        <Route exact path="/settings" element={<h1>Settings</h1>} />
        <Route exact path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
