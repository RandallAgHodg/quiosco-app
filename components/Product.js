import React from "react";
import Image from "next/image";
import { formatMoney } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
const Product = ({ product }) => {
  const { name, image, price } = product;
  const { handleSetProduct, handleChangeModal } = useQuiosco();
  return (
    <div className="border p-3">
      <Image
        width={400}
        height={500}
        src={`/img/${image}.jpg`}
        alt={`Dish ${name}`}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatMoney(price)}
        </p>

        <button
          className="bg-indigo-600 text-white w-full mt-5 p-3 uppercase font-bold hover:bg-indigo-800"
          onClick={() => {
            handleSetProduct(product);
            handleChangeModal();
          }}
          type="button"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Product;
