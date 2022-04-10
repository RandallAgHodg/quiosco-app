import React, { useCallback, useEffect } from "react";
import { formatMoney } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

const total = () => {
  const { order, name, setName, placeOrder, total, newTotal } = useQuiosco();

  const checkOrder = useCallback(() => {
    return order.length === 0 || name === "" || name.length < 3;
  }, [order, name]);

  useEffect(() => {
    checkOrder();
  }, [order, checkOrder]);

  return (
    <Layout title="Total y confirmar pedido">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Confirma tu pedido</p>
      <form onSubmit={(e) => placeOrder(e)}>
        <div>
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 font-bold txt-xl"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
          />
        </div>
        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar{" "}
            <span className="font-bold">{formatMoney(total)}</span>
          </p>
        </div>
        <div className="mt-5">
          <input
            className={`${
              checkOrder()
                ? "bg-indigo-100"
                : "bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer"
            } w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
            type="submit"
            value="Confirmar pedido"
            disabled={checkOrder()}
          />
        </div>
      </form>
    </Layout>
  );
};

export default total;
