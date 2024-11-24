import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputType from "../../components/shared/InputType";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import { useNewProductMutation } from "../../redux/api/productAPI";
import { RootState } from "../../redux/store";
import { responseToast } from "../../utils/features";

const AddProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || stock < 0 || !photo || !category) return;

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);

    const res = await newProduct({ id: user?._id!, formData });

    responseToast(res, navigate, "/admin/product");
  };
  return (
    <AdminLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="flex flex-col items-center lg:absolute lg:top-[29%]">
          {photoPrev && (
            <>
              <div className="relative space-y-6 mb-6">
                <span className="text-green-500 font-semibold">
                  {stock} Available
                </span>
              </div>
              <img src={photoPrev} className="object-cover object-center" />
              <p className="text-sm text-gray-700">{name}</p>
              <h2 className="text-xl font-bold text-gray-800">₹{price}</h2>
            </>
          )}
        </div>

        <div className="mt-5 min-h-full flex-1 flex-col justify-center px-6  lg:px-8 lg:absolute lg:top-16 lg:right-[20%]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="my-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              New Product
            </h2>
          </div>
          <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-2">
              <InputType
                id="name"
                name="name"
                placeholder="name"
                type="text"
                value={name}
                required
                autoComplete="autocomplete"
                label="name"
                labelFor="name"
                onChange={(e) => setName(e.target.value)}
              />
              <InputType
                id="price"
                name="price"
                placeholder="price"
                type="number"
                value={price}
                required
                autoComplete="autocomplete"
                label="price"
                labelFor="price"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <InputType
                id="stock"
                name="stock"
                placeholder="stock"
                type="number"
                value={stock}
                required
                autoComplete="autocomplete"
                label="stock"
                labelFor="stock"
                onChange={(e) => setStock(Number(e.target.value))}
              />

              <InputType
                id="catagory"
                name="catagory"
                placeholder="catagory"
                type="text"
                value={category}
                required
                autoComplete="autocomplete"
                label="catagory"
                labelFor="catagory"
                onChange={(e) => setCategory(e.target.value)}
              />
              <div className="col-span-full ">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <div className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none  hover:text-indigo-500">
                        <input
                          id="file"
                          required
                          type="file"
                          onChange={changeImgHandler}
                          className="bg-gray-100 "
                        />
                      </div>
                    </div>
                    <p className="text-xs leading-5 text-gray-600 p-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
