import { Link } from "react-router-dom";


export const CategoryTile = ({ categoryName, categoryIcon, categoryColor, categoryDescription }) => {
  const maxDescriptionLength = 55;
  if (categoryDescription.includes('<p>')) {
    categoryDescription = categoryDescription.replace('<p>', '');
  }
  if (categoryDescription.includes('</p>')) {
    categoryDescription = categoryDescription.replace('</p>', '');
  }
  if (categoryDescription.length > maxDescriptionLength) {
    categoryDescription = categoryDescription.substring(0, maxDescriptionLength)+"..."
  }
  
  return (
    <>
      <Link to={`/collection/All/1/${categoryName}`}>
        <button className="m-2 category-tile-btn" style={{ 
          border: `2px solid ${categoryColor.length > 0 ? categoryColor : '#F0F0F0'}`
        }}>
          <div className="d-flex flex-column justify-content-end align-items-center category-tile mt-1 px-2">
            <img className="category-icon" src={`/assets/${categoryIcon}`} alt="Icon" />
            <p className="category-name">{categoryName}</p>
            <p className="category-description">{categoryDescription}</p>
          </div>
        </button>
      </Link>
    </>
  );
};