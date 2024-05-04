import useFetch from "../../hooks/useFetch";
import PropertyCardSkeleton from "../propertyList/PropertyCardSkeleton";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { loading, data } = useFetch("/hotels?featured=true");

  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=",
  ];

  return (
    <>
      {loading ? (
        <div className="pList">
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
        </div>
      ) : (
        <div className="fp">
          {data?.hotels?.map((hotel, index) => (
            <div key={index} className="fpItem">
              <img src={images?.[index]} alt="" className="fpImg" />
              <span className="fpName">{hotel?.name}</span>
              <span className="fpCity">{hotel?.city}</span>
              <span className="fpPrice">
                Starting from ${hotel?.cheapesPrice}
              </span>
              {hotel?.rating && (
                <div className="fpRating">
                  <button>
                    {Number.isInteger(hotel?.rating)
                      ? `${hotel?.rating}.0`
                      : hotel?.rating}
                  </button>
                  <span>
                    {hotel?.rating >= 4
                      ? "Excellent"
                      : hotel?.rating >= 3
                      ? "Good"
                      : "Average"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FeaturedProperties;
