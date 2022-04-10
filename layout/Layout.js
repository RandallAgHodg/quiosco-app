import Head from "next/head";
import ReactModal from "react-modal";
import { ToastContainer } from "react-toastify";
import ProductModal from "../components/ProductModal";
import Sidebar from "../components/Sidebar";
import useQuiosco from "../hooks/useQuiosco";
import "react-toastify/dist/ReactToastify.css";
import Steps from "../components/steps";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#__next");

export default function Layout({ children, title }) {
  const { modal } = useQuiosco();
  return (
    <>
      <Head>
        <title>cofee - {title}</title>
        <meta name="description" content="Cofee shop" />
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
          <Sidebar />
        </aside>
        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">
            <Steps />
            {children}
          </div>
        </main>
      </div>
      {modal && (
        <ReactModal isOpen={modal} style={customStyles}>
          <ProductModal />
        </ReactModal>
      )}
      <ToastContainer />
    </>
  );
}
