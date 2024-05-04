const PropertyCard = ({ images, index, type, count }) => {
  return (
    <div className="pListItem">
      <img src={images[index]} alt={type} className="pListImg" />
      <div className="pListTitles">
        <h1>{type}</h1>
        <h2>
          {count} {type}
        </h2>
      </div>
    </div>
  );
};

export default PropertyCard;
