import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import Layout from "../components/shared/Layout/Layout";
import ProductCard from "../components/shared/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItemType } from "../types/types";
import { RootState } from "../redux/store";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItemType) => {
    if (!user) {
      toast.error("Please Login First");
      return;
    }
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };
  if (isError) toast.error("Cannot Fetch the Products");
  return (
    <Layout>
      <div className="relative mt-2">
        <Link to="/products">
          <div className="carousel w-full">
            <div className="carousel-item w-full">
              <img src="/img2.png" alt="hero" className="w-full" />
            </div>
          </div>
        </Link>
      </div>
      <section className="mt-8 container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Shop by Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <Link to="products">
            <div className="category-card text-center">
              <img
                src="/cat6.png"
                alt="Electronics"
                className="mx-auto mb-4 w-32 h-32 object-cover"
              />
              <p className="font-medium">Accessories</p>
            </div>
          </Link>
          <Link to="products">
            <div className="category-card text-center">
              <img
                src="/cat2.PNG"
                alt="Fashion"
                className="mx-auto mb-4 w-32 h-32 object-cover"
              />
              <p className="font-medium">Camera & Photo</p>
            </div>
          </Link>
          <Link to="products">
            <div className="category-card text-center">
              <img
                src="/cat3.PNG"
                alt="Home Goods"
                className="mx-auto mb-4 object-cover"
              />
              <p className="font-medium">Headphones</p>
            </div>
          </Link>
          <Link to="products">
            <div className="category-card text-center">
              <img
                src="/cat5.png"
                alt="Books"
                className="mx-auto mb-4 w-32 h-32 object-cover"
              />
              <p className="font-medium">SmartPhone</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="container mx-auto p-6 mt-8 flex flex-col md:flex-row space-y-6 md:space-y-0 space-x-4">
        <div className="md:w-1/4 w-full justify-center hidden md:block">
          <div>
            <img src="/img3.png" alt="Banner" className="w-full h-auto" />
          </div>
        </div>

        <div className="md:w-3/4 w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>

            <Link
              to="products"
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>See All</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="ml-2"
                viewBox="0 0 16 16"
              >
                <path d="M12.293 8.293a1 1 0 0 0 0-1.414L8.707 3.707a1 1 0 0 0-1.414 1.414L10.586 7H4a1 1 0 1 0 0 2h6.586l-3.293 3.293a1 1 0 0 0 1.414 1.414l4-4z" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <Skeleton />
            ) : data?.data && data?.data.length > 0 ? (
              data?.data.map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  photo={i.photo}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                />
              ))
            ) : (
              <h1 className="overflow-hidden rounded-md text-gray-700 text-xl md:text-2xl">
                No products found
              </h1>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
