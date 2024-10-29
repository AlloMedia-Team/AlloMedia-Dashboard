import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { LogIn, LogOut, Menu, User, UserPlus } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Restaurant name is required")
    .min(2, "Restaurant name must be at least 2 characters")
    .matches(
      /^[A-Za-z\s]+$/,
      "Restaurant name must contain only letters and spaces"
    ),
  city: Yup.string()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  categoryIds: Yup.array().min(1, "At least one category is required"),
});

const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [createRestaurantModal, setCreateRestaurantModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const toggleCreateRestaurantModal = () => {
    setCreateRestaurantModal(!createRestaurantModal);
  };

  useEffect(() => {
    console.log("Modal state changed:", createRestaurantModal);
  }, [createRestaurantModal]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/categories");
      const data = await response.json();
      console.log("API Response:", data);

      if (data.categories && Array.isArray(data.categories)) {
        const formattedData = data.categories.map((category) => ({
          label: category.name,
          value: category._id,
        }));
        setCategories(formattedData);
      } else {
        console.error("Expected 'categories' array but got:", data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
    console.log(user);
  }, []);
  const handleLogout = async () => {
    await dispatch(logout());
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      city: "",
      address: "",
      categoryIds: [],
      managerId: user?._id,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      // Show success toast
      toast.success("Restaurant added successfully!");
    },
  });

  return (
    <>
      <nav className="bg-black shadow-md border border-b-gray-300 dark:bg-black dark:border-b-white/25">
        <div className="max-w-7xl  mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl text-red-500">
                AMG
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                {user && token ? (
                  <>
                    <Button
                      onClick={toggleCreateRestaurantModal}
                      className="text-red-600 hover:text-white border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm  text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      variant="ghost"
                    >
                      Become Manager
                    </Button>
                    <Button
                      className="text-white hover:text-white border border-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                      variant="ghost"
                    >
                      Become Delivery man
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <User className="mr-2 h-6 w-6 text-white" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={"/profile"}>
                          <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onSelect={handleLogout}
                          className="cursor-pointer"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Link to={"/card"} className="cursor-pointer">
                      <span>
                        <svg
                          width="25px"
                          height="25px"
                          viewBox="0 0 64 64"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          role="img"
                          class="iconify iconify--emojione"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g fill="#b2c1c0">
                            <path d="M53.1 38.6h-7.5v3.8h7.5c1 0 1.9.8 1.9 1.9s-.8 1.9-1.9 1.9H6.3c-1 0-1.9.8-1.9 1.9c0 1 .8 1.9 1.9 1.9h46.9c3.1 0 5.6-2.5 5.6-5.6c0-3.3-2.6-5.8-5.7-5.8"></path>

                            <path d="M54.5 25.7l-3.7-.3c0-.1 2.3-13.8 2.8-16.6c.3-1.6.9-6.1 6.6-6.1v3.8c-2.3 0-2.6.9-2.8 2.6c-.6 2.8-2.9 16.4-2.9 16.6"></path>
                          </g>

                          <path
                            d="M54.7 12.3H4c-1.9 0-2.2 1.8-1.9 2.8l5.7 25.4c.3 1 1.3 1.8 2.4 1.8H50c1 0 2-.8 2.2-1.9l4.2-26.3c.1-.9-.7-1.8-1.7-1.8M6.9 20.8l-1-3.8c-.1-.5.2-.9.7-.9h7.1c.5 0 1 .4 1 .9l.4 3.8c.1.5-.3.9-.8.9H8c-.5 0-1-.4-1.1-.9m3.2 9.3c-.5 0-1-.4-1.2-.9l-.7-2.9c-.1-.5.2-.9.7-.9h5.7c.5 0 1 .4 1 .9l.3 2.8c.1.5-.3.9-.8.9c.1.1-5 .1-5 .1m6 8.5h-3.9c-.5 0-1-.4-1.2-.9l-.7-2.9c-.1-.5.2-.9.7-.9h4.5c.5 0 1 .4 1 .9l.3 2.8c.2.5-.2 1-.7 1m11.5-1c0 .5-.4.9-.9.9h-4.9c-.5 0-1-.4-1-.9l-.3-2.8c-.1-.5.3-.9.8-.9h5.4c.5 0 .9.4.9.9v2.8m0-8.4c0 .5-.4.9-.9.9h-5.8c-.5 0-1-.4-1-.9l-.3-2.8c-.1-.5.3-.9.8-.9h6.3c.5 0 .9.4.9.9v2.8m0-8.4c0 .5-.4.9-.9.9H20c-.5 0-1-.4-1-.9l-.5-3.8c-.1-.5.3-.9.8-.9h7.3c.5 0 .9.4.9.9c.1 0 .1 3.8.1 3.8m10.2 16.8c-.1.5-.5.9-1 .9h-4.4c-.5 0-.9-.4-.9-.9v-2.8c0-.5.4-.9.9-.9h4.9c.5 0 .9.4.8.9l-.3 2.8m.9-8.4c-.1.5-.5.9-1 .9h-5.3c-.5 0-.9-.4-.9-.9v-2.8c0-.5.4-.9.9-.9h5.8c.5 0 .9.4.8.9l-.3 2.8m.9-8.4c-.1.5-.5.9-1 .9h-6.2c-.5 0-.9-.4-.9-.9V17c0-.5.4-.9.9-.9h6.8c.5 0 .9.4.8.9l-.4 3.8m8.7 16.8c-.1.5-.6.9-1.1.9h-4.8c-.5 0-.9-.4-.8-.9l.3-2.8c.1-.5.5-.9 1-.9H48c.5 0 .9.4.8.9l-.5 2.8m1.3-8.4c-.1.5-.6.9-1.1.9h-5.3c-.5 0-.9-.4-.8-.9l.3-2.8c.1-.5.5-.9 1-.9h5.5c.5 0 .9.4.8.9l-.4 2.8m1.3-8.4c-.1.5-.6.9-1.1.9h-5.7c-.5 0-.9-.4-.8-.9l.4-3.8c.1-.5.5-.9 1-.9h5.9c.5 0 .9.4.8.9l-.5 3.8"
                            fill="#f15744"
                          ></path>

                          <circle
                            cx="12.3"
                            cy="56.4"
                            r="5.6"
                            fill="#62727a"
                          ></circle>

                          <circle
                            cx="12.3"
                            cy="56.4"
                            r="2.8"
                            fill="#ffffff"
                          ></circle>

                          <circle
                            cx="46.1"
                            cy="56.4"
                            r="5.6"
                            fill="#62727a"
                          ></circle>

                          <path
                            d="M48.9 56.4c0 1.6-1.3 2.8-2.8 2.8c-1.6 0-2.8-1.3-2.8-2.8c0-1.6 1.3-2.8 2.8-2.8c1.5 0 2.8 1.2 2.8 2.8"
                            fill="#ffffff"
                          ></path>

                          <path
                            d="M61.1 2h-2.8v5.6h2.8c.5 0 .9-.4.9-.9V2.9c0-.5-.4-.9-.9-.9"
                            fill="#62727a"
                          ></path>

                          <g fill="#f15744">
                            <path d="M12.3 48.9c-4.1 0-7.5 3.4-7.5 7.5h15c0-4.2-3.3-7.5-7.5-7.5"></path>

                            <path d="M46.1 48.9c-4.1 0-7.5 3.4-7.5 7.5h15c0-4.2-3.4-7.5-7.5-7.5"></path>
                          </g>

                          <path d="M42.3 38.4" fill="#75a843"></path>
                        </svg>
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={"/login"} className="cursor-pointer">
                      <Button
                        variant="ghost"
                        className="text-red-500 hover:bg-red-600 hover:text-red-50"
                      >
                        <LogIn className="mr-2 h-4 w-4 " />
                        <span> Log in</span>
                      </Button>
                    </Link>
                    <Link to={"/signup"} className="cursor-pointer">
                      <Button className="bg-red-600 text-red-50 hover:bg-red-50 hover:text-red-500">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </Button>
                    </Link>
                    <Link to={"/card"} className="cursor-pointer">
                      <span>
                        <svg
                          width="25px"
                          height="25px"
                          viewBox="0 0 64 64"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          role="img"
                          class="iconify iconify--emojione"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g fill="#b2c1c0">
                            <path d="M53.1 38.6h-7.5v3.8h7.5c1 0 1.9.8 1.9 1.9s-.8 1.9-1.9 1.9H6.3c-1 0-1.9.8-1.9 1.9c0 1 .8 1.9 1.9 1.9h46.9c3.1 0 5.6-2.5 5.6-5.6c0-3.3-2.6-5.8-5.7-5.8"></path>

                            <path d="M54.5 25.7l-3.7-.3c0-.1 2.3-13.8 2.8-16.6c.3-1.6.9-6.1 6.6-6.1v3.8c-2.3 0-2.6.9-2.8 2.6c-.6 2.8-2.9 16.4-2.9 16.6"></path>
                          </g>

                          <path
                            d="M54.7 12.3H4c-1.9 0-2.2 1.8-1.9 2.8l5.7 25.4c.3 1 1.3 1.8 2.4 1.8H50c1 0 2-.8 2.2-1.9l4.2-26.3c.1-.9-.7-1.8-1.7-1.8M6.9 20.8l-1-3.8c-.1-.5.2-.9.7-.9h7.1c.5 0 1 .4 1 .9l.4 3.8c.1.5-.3.9-.8.9H8c-.5 0-1-.4-1.1-.9m3.2 9.3c-.5 0-1-.4-1.2-.9l-.7-2.9c-.1-.5.2-.9.7-.9h5.7c.5 0 1 .4 1 .9l.3 2.8c.1.5-.3.9-.8.9c.1.1-5 .1-5 .1m6 8.5h-3.9c-.5 0-1-.4-1.2-.9l-.7-2.9c-.1-.5.2-.9.7-.9h4.5c.5 0 1 .4 1 .9l.3 2.8c.2.5-.2 1-.7 1m11.5-1c0 .5-.4.9-.9.9h-4.9c-.5 0-1-.4-1-.9l-.3-2.8c-.1-.5.3-.9.8-.9h5.4c.5 0 .9.4.9.9v2.8m0-8.4c0 .5-.4.9-.9.9h-5.8c-.5 0-1-.4-1-.9l-.3-2.8c-.1-.5.3-.9.8-.9h6.3c.5 0 .9.4.9.9v2.8m0-8.4c0 .5-.4.9-.9.9H20c-.5 0-1-.4-1-.9l-.5-3.8c-.1-.5.3-.9.8-.9h7.3c.5 0 .9.4.9.9c.1 0 .1 3.8.1 3.8m10.2 16.8c-.1.5-.5.9-1 .9h-4.4c-.5 0-.9-.4-.9-.9v-2.8c0-.5.4-.9.9-.9h4.9c.5 0 .9.4.8.9l-.3 2.8m.9-8.4c-.1.5-.5.9-1 .9h-5.3c-.5 0-.9-.4-.9-.9v-2.8c0-.5.4-.9.9-.9h5.8c.5 0 .9.4.8.9l-.3 2.8m.9-8.4c-.1.5-.5.9-1 .9h-6.2c-.5 0-.9-.4-.9-.9V17c0-.5.4-.9.9-.9h6.8c.5 0 .9.4.8.9l-.4 3.8m8.7 16.8c-.1.5-.6.9-1.1.9h-4.8c-.5 0-.9-.4-.8-.9l.3-2.8c.1-.5.5-.9 1-.9H48c.5 0 .9.4.8.9l-.5 2.8m1.3-8.4c-.1.5-.6.9-1.1.9h-5.3c-.5 0-.9-.4-.8-.9l.3-2.8c.1-.5.5-.9 1-.9h5.5c.5 0 .9.4.8.9l-.4 2.8m1.3-8.4c-.1.5-.6.9-1.1.9h-5.7c-.5 0-.9-.4-.8-.9l.4-3.8c.1-.5.5-.9 1-.9h5.9c.5 0 .9.4.8.9l-.5 3.8"
                            fill="#f15744"
                          ></path>

                          <circle
                            cx="12.3"
                            cy="56.4"
                            r="5.6"
                            fill="#62727a"
                          ></circle>

                          <circle
                            cx="12.3"
                            cy="56.4"
                            r="2.8"
                            fill="#ffffff"
                          ></circle>

                          <circle
                            cx="46.1"
                            cy="56.4"
                            r="5.6"
                            fill="#62727a"
                          ></circle>

                          <path
                            d="M48.9 56.4c0 1.6-1.3 2.8-2.8 2.8c-1.6 0-2.8-1.3-2.8-2.8c0-1.6 1.3-2.8 2.8-2.8c1.5 0 2.8 1.2 2.8 2.8"
                            fill="#ffffff"
                          ></path>

                          <path
                            d="M61.1 2h-2.8v5.6h2.8c.5 0 .9-.4.9-.9V2.9c0-.5-.4-.9-.9-.9"
                            fill="#62727a"
                          ></path>

                          <g fill="#f15744">
                            <path d="M12.3 48.9c-4.1 0-7.5 3.4-7.5 7.5h15c0-4.2-3.3-7.5-7.5-7.5"></path>

                            <path d="M46.1 48.9c-4.1 0-7.5 3.4-7.5 7.5h15c0-4.2-3.4-7.5-7.5-7.5"></path>
                          </g>

                          <path d="M42.3 38.4" fill="#75a843"></path>
                        </svg>
                      </span>
                    </Link>
                  </>
                )}
              </div>
              <div className="flex items-center sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Open menu</span>
                      <Menu className="h-6 w-6" aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user && token ? (
                      <>
                        <Link to={"/profile"}>
                          <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onSelect={handleLogout}
                          className="cursor-pointer"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <Link to={"/login"}>
                          <DropdownMenuItem className="cursor-pointer">
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link to={"/signup"}>
                          <DropdownMenuItem className="cursor-pointer">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Sign Up
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* create restaurant modal */}
      {createRestaurantModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleCreateRestaurantModal();
          }}
          className="flex flex-row overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add your restaurant
                </h3>
                <button
                  type="button"
                  onClick={toggleCreateRestaurantModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <input type="hidden" name="managerId" value={user._id} />
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 ${
                        formik.touched.name && formik.errors.name
                          ? "border-red-600"
                          : ""
                      }`}
                      placeholder="Type restaurant name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      required
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-600 text-sm">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Restaurant Foods Category
                    </label>
                    <MultiSelect
                      options={categories}
                      value={selected}
                      onChange={(value) => {
                        setSelected(value);
                        formik.setFieldValue(
                          "categoryIds",
                          value.map((item) => item.value)
                        );
                      }}
                      labelledBy="Select"
                    />
                    {formik.touched.categoryIds &&
                      formik.errors.categoryIds && (
                        <p className="text-red-600 text-sm">
                          {formik.errors.categoryIds}
                        </p>
                      )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 ${
                        formik.touched.city && formik.errors.city
                          ? "border-red-600"
                          : ""
                      }`}
                      placeholder="Type restaurant city"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                      required
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="text-red-600 text-sm">
                        {formik.errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 ${
                        formik.touched.address && formik.errors.address
                          ? "border-red-600"
                          : ""
                      }`}
                      placeholder="Your restaurant full address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                    ></textarea>
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-600 text-sm">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add Restaurant
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default NavBar;
