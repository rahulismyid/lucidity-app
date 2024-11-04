import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  getInventoryData,
} from "../../store/reducers/inventorySlice";

const Status = lazy(() => import("../../components/Status"));
const ProductList = lazy(() => import("../../components/ProductList"));

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, statsTiles } = useSelector((state) => state.inventory);
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    setStatusList(statsTiles);
  }, [products, statsTiles]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (products?.length) {
      dispatch(getInventoryData());
    }
  }, [dispatch, products?.length]);

  return (
    <>
      <div className="pt-4 px-4">
        <h1 className="text-5xl text-white">Inventory Stats</h1>
        {products && products?.length ? (
          <div className=" w-full">
            <div className="flex gap-4 justify-center mt-6">
              {statusList?.map((item, index) => (
                <Status key={index} {...item} />
              ))}
            </div>
            <div className="mt-5">
              <ProductList />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
