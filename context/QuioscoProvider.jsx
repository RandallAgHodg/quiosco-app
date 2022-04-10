import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const getCategories = async () => {
    const { data } = await axios("/api/categories");
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCurrentCategory(categories[0]);
  }, [categories]);

  useEffect(() => {
    const newTotal = order.reduce(
      (total, product) => product.price * product.ammount + total,
      0
    );
    setTotal(newTotal);
  }, [order]);

  const handleClickCategory = (categoryId) => {
    const category = categories.filter(
      (category) => category.id === categoryId
    );
    setCurrentCategory(category[0]);
    router.push("/");
  };

  const handleSetProduct = (product) => setProduct(product);

  const handleChangeModal = () => setModal(!modal);

  const handleAddOrder = ({ categoryId, ...product }) => {
    if (order.some((productState) => productState.id === product.id)) {
      const updatedProduct = order.map((productOrder) => {
        return productOrder.id === product.id ? product : productOrder;
      });
      setOrder(updatedProduct);
      toast.success("Guardado correctamente");
    } else {
      setOrder([...order, product]);
      toast.success("Agregado al pedido");
    }

    setModal(false);
  };

  const handleUpdateAmmount = (id) => {
    const productUpdate = order.filter((product) => product.id === id);
    setProduct(productUpdate[0]);
    setModal(!modal);
  };

  const handleProductDelete = (id) => {
    const productUpdate = order.filter((product) => product.id !== id);
    setOrder(productUpdate);
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/orders", {
        order,
        name,
        total,
        date: Date.now().toString(),
      });
      setCurrentCategory(categories[0]);
      setOrder([]);
      setName("");
      setTotal(0);

      toast.success("Pedido realizado correctamente");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        categories,
        handleClickCategory,
        currentCategory,
        handleSetProduct,
        product,
        handleChangeModal,
        modal,
        order,
        handleAddOrder,
        handleUpdateAmmount,
        handleProductDelete,
        name,
        setName,
        placeOrder,
        total,
        placeOrder,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
