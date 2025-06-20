import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"; // Importing icons
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collection = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState([]); // State for selected genders
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected sub-filters (categories)
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const { products, search } = useShopContext(); // Assuming products are used for filtering later

  // Hardcoded filter options
  const genderFilters = [
    { id: "Men", label: "Men" },
    { id: "Women", label: "Women" },
    { id: "Kids", label: "Children" },
  ];

  const categoryFilters = [
    { id: "Topwear", label: "Topwear" },
    { id: "Bottomwear", label: "Bottomwear" },
    { id: "Winterwear", label: "Winterwear" },
  ];
  useEffect(() => {
    setFilterProducts(products);
  }, []);
  // Handler for gender checkbox changes
  const handleGenderChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGenders((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((gender) => gender !== value)
    );
  };

  // Handler for category checkbox changes
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((category) => category !== value)
    );
  };
  const applyFilter = () => {
    let productCopy = products.slice();
    if (search) {
      productCopy = productCopy.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategories.length > 0) {
      productCopy = productCopy.filter((product) =>
        selectedCategories.includes(product.subCategory)
      );
    }
    if (selectedGenders.length > 0) {
      productCopy = productCopy.filter((product) =>
        selectedGenders.includes(product.category)
      );
    }
    setFilterProducts(productCopy);
  };
  const SortProduct = () => {
    let filterProductCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(filterProductCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filterProductCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };
  useEffect(() => {
    SortProduct();
  }, [sortType]);

  useEffect(() => {
    applyFilter();
  }, [selectedCategories, selectedGenders, search]);
  // console.log(selectedCategories, selectedGenders);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilters(!showFilters)} // Toggle filters on mobile
        >
          FILTERS
          {showFilters ? ( // Conditional rendering of icons based on showFilters state
            <ChevronUpIcon className="h-5 w-5 sm:hidden" /> // Show up arrow on mobile when filters are open
          ) : (
            <ChevronDownIcon className="h-5 w-5 sm:hidden" /> // Show down arrow on mobile when filters are closed
          )}
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilters ? "block" : "hidden" // Hidden on mobile unless toggled
          } sm:block`} // Always block on larger screens
        >
          {/* Filters Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Filters</h3>
            {genderFilters.map((filter) => (
              <div key={filter.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={filter.id}
                  value={filter.id}
                  checked={selectedGenders.includes(filter.id)}
                  onChange={handleGenderChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={filter.id} className="text-gray-700">
                  {filter.label}
                </label>
              </div>
            ))}
          </div>

          {/* Sub Filters Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sub Filters</h3>
            {categoryFilters.map((filter) => (
              <div key={filter.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={filter.id}
                  value={filter.id}
                  checked={selectedCategories.includes(filter.id)}
                  onChange={handleCategoryChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={filter.id} className="text-gray-700">
                  {filter.label}
                </label>
              </div>
            ))}
            <p className="text-gray-600 text-sm">
              no of apparels {filterProducts.length}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 pl-2">
          <Title title={"ALL"} title2={"COLLECTIONS"} />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by :low to High</option>
            <option value="high-low">Sort by :High to Low</option>
          </select>
        </div>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
