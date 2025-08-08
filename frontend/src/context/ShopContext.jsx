import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "₹";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    // ✅ Add to cart
    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error("Please select a size");
            return;
        }

        setCartItems(prevCart => {
            const cartData = structuredClone(prevCart);

            if (cartData[itemId]?.[size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId] = cartData[itemId] || {};
                cartData[itemId][size] = 1;
            }
            return cartData;
        });
    };

    // ✅ Get cart count
    const getCartCount = () => {
        let totalCount = 0;
        Object.values(cartItems).forEach(sizes => {
            Object.values(sizes).forEach(qty => {
                if (qty > 0) totalCount += qty;
            });
        });
        return totalCount;
    };

    // ✅ Update cart quantity
    const updateQuantity = (itemId, size, quantity) => {
        setCartItems(prevCart => {
            const cartData = structuredClone(prevCart);
            if (cartData[itemId]) {
                cartData[itemId][size] = quantity;
            }
            return cartData;
        });
    };

    // ✅ Get total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const productId in cartItems) {
            const itemInfo = products.find(p => p._id === productId);
            if (itemInfo) {
                for (const size in cartItems[productId]) {
                    const qty = cartItems[productId][size];
                    if (qty > 0) {
                        totalAmount += itemInfo.price * qty;
                    }
                }
            }
        }
        return totalAmount;
    };

    // ✅ Fetch products
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error("Failed to fetch products");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while fetching products");
        }
    };

    // ✅ Fetch products on mount
    useEffect(() => {
        getProductsData();
    }, []);

    // ✅ Restore token from localStorage only once
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) setToken(savedToken);
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
