import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import axios from "axios";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   async function pingProtected() {
  //     try {
  //       const res = await fetchWithAuth("http://localhost:3000/api/ping");
  //       console.log("Token is valid:", res.data);
  //     } catch (err) {
  //       console.error("Token check failed", err);
  //     }
  //   }

  //   pingProtected();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("https://foodapp-backend-65ev.onrender.com/api/foodData");
        // setData(res.data);
        console.log("thi is respone from foodData", res.data);
        setFoodItem(res.data[0]);
        setFoodCat(res.data[1]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <Carousel search={search} setSearch={setSearch} />
      </div>
      <div>
        {foodCat.length > 0
          ? foodCat.map((data, idx) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem.length > 0
  ? foodItem
      .filter(
        (item) =>
          item.CategoryName === data.CategoryName &&
          item.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((filterItem) => (
        <div key={filterItem._id} className="col-12 col-md-6 col-lg-3">
          <Card
            foodItems={filterItem}
            options={filterItem.options}
          />
        </div>
      ))
  : "No Data Found"}

                </div>
              );
            })
          : ""}
        {/* <Card /> */}
      </div>
      <div>
        {" "}
        <Footer />
      </div>
    </div>
  );
}
