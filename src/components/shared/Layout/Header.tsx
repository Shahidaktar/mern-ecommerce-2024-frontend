import { Menu, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { User } from "../../../types/types";

interface PropsType {
  user: User | null;
}
const Header = ({ user }: PropsType) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    }
  };
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <header className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between ">
        <div className="text-white font-bold text-xl justify-center ">
          <Link to="/" className="flex justify-center items-center space-x-2">
            <img src="/logo.png" alt="logo" className="h-10 w-15" />
            <span className="hidden md:block">ShopZolo</span>
          </Link>
        </div>

        <div className="relative md:w-1/3 flex justify-center ">
          <input
            type="text"
            name="search"
            className="w-[200px] md:w-full py-2 px-4 pl-10 rounded-full border-none"
            placeholder="Search for products, brands and more..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSearch}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z"
            ></path>
          </svg>
        </div>
        <nav className="flex space-x-8 text-white">
          <Link
            to="/cart"
            className=" relative rounded-full hover:text-yellow-400 focus:outline-none"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">cart</span>
            <ShoppingCartIcon className="h-6 w-6 " aria-hidden="true" />
          </Link>

          {user?._id ? (
            <>
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full text-sm focus:outline-none text-white">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>

                    <UserCircleIcon
                      className="h-7 w-7 rounded-full "
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                    {user.role === "admin" && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/admin/dashboard"
                            className={
                              active
                                ? "bg-gray-100 flex items-center px-4 py-2 text-sm text-gray-700"
                                : "flex items-center px-4 py-2 text-sm text-gray-700"
                            }
                          >
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                    )}

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/orders"
                          className={
                            active
                              ? "bg-gray-100 flex items-center px-4 py-2 text-sm text-gray-700"
                              : "flex items-center px-4 py-2 text-sm text-gray-700"
                          }
                        >
                          All orders
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logoutHandler}
                          className={
                            active
                              ? "bg-gray-100 flex items-center px-4 py-2 text-sm text-gray-700"
                              : "flex items-center px-4 py-2 text-sm text-gray-700"
                          }
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          ) : (
            <Link to="/login" className="hover:text-yellow-400">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
