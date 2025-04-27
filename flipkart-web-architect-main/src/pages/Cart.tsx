
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <main className="flipkart-container py-6">
      <h1 className="section-title">My Cart ({cartItems.length} items)</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png"
              alt="Empty Cart"
              className="w-56 h-56 object-contain"
            />
          </div>
          <h2 className="text-lg font-medium mb-4">Your cart is empty!</h2>
          <p className="text-gray-500 mb-6">Add items to it now.</p>
          <Link to="/">
            <Button>Shop Now</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-8/12">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm mb-4 p-4 flex flex-col sm:flex-row"
              >
                <div className="sm:w-32 sm:h-32 flex-shrink-0 mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow sm:pl-6">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-medium mb-1 hover:text-flipkart-blue">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">
                    Category: {item.category}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="font-medium">₹{item.price.toLocaleString()}</div>
                    {item.originalPrice && (
                      <>
                        <div className="text-gray-500 line-through text-sm">
                          ₹{item.originalPrice.toLocaleString()}
                        </div>
                        <div className="text-flipkart-green text-sm">
                          {item.discount}% off
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center border rounded w-max">
                      <button
                        className="px-3 py-1 border-r hover:bg-gray-100"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        −
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        className="px-3 py-1 border-l hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-flipkart-blue hover:text-flipkart-blue/80 text-sm font-medium"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow-sm p-4 flex justify-end">
              <Link to="/">
                <Button variant="outline" className="mr-4">Continue Shopping</Button>
              </Link>
              <Link to="/checkout">
                <Button className="bg-flipkart-yellow text-black hover:bg-flipkart-yellow/90">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:w-4/12">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-gray-500 font-medium pb-4 border-b">PRICE DETAILS</h2>
              <div className="py-4 space-y-3 border-b">
                <div className="flex justify-between">
                  <p>Price ({cartItems.length} items)</p>
                  <p>₹{cartTotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery Charges</p>
                  <p className="text-flipkart-green">FREE</p>
                </div>
              </div>
              <div className="py-4 border-b">
                <div className="flex justify-between font-medium">
                  <p>Total Amount</p>
                  <p>₹{cartTotal.toLocaleString()}</p>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-flipkart-green font-medium">
                  Your total savings on this order: ₹
                  {cartItems
                    .reduce((sum, item) => {
                      const savedPerItem =
                        ((item.originalPrice || item.price) - item.price) *
                        item.quantity;
                      return sum + savedPerItem;
                    }, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
              <h3 className="font-medium mb-3">Have A Coupon?</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="border rounded-l px-3 py-2 flex-grow"
                />
                <Button className="rounded-l-none">Apply</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
