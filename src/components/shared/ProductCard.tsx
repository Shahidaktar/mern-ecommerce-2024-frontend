import { CartItemType } from "../../types/types";

interface ProductProps {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItemType) => string | undefined;
}

const ProductCard = ({
  photo,
  name,
  price,
  stock,
  productId,
  handler,
}: ProductProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <img src={photo} alt={name} className="w-full object-cover" />
      <div className="mt-4">
        <p className="text-yellow-400">★★★★☆</p>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">₹{price}</p>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() =>
            handler({
              photo,
              name,
              price,
              stock,
              productId,
              quantity: 1,
            })
          }
          className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
