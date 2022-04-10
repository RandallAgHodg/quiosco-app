import React from "react";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
const Category = ({ category }) => {
  const { name, icon, id } = category;
  const { currentCategory, handleClickCategory } = useQuiosco();
  return (
    <div
      className={`${
        currentCategory?.id === id && "bg-amber-400"
      } flex items-center gap-4 w-ful border p-5 hover:bg-amber-400`}
      onClick={() => handleClickCategory(id)}
    >
      <Image width={100} height={100} src={`/img/icono_${icon}.svg`} />
      <button type="button" className="text-2xl font-bold hover:cursor-pointer">
        {name}
      </button>
    </div>
  );
};

export default Category;
