import React from 'react'
import useFetch from '../../hooks/useFetch'
import './FeaturedProperties.css'

const FeaturedProperties = () => {

  const {data, loading, error, reFetch} = useFetch("/hotels?featured=true&limit=4")


  return (
    <div className="featured-properties">
        {loading ? (
        "Loading"
      ) : (
        <>
        {data.map((item,key) => (
        <div className="featured-properties-item" key={key}>
        <img
          src={item.images[0]}
          alt=""
          className="featured-properties-image"
        />
        <span className="featured-properties-name">{item.name}</span>
        <span className="featured-properties-city">{item.city}</span>
        <span className="featured-properties-price">Starting from ${item.cheapestPrice}</span>
        {item.rating &&
        <div className="featured-properties-rating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>
        }
      </div>
      ))}
      </>)}
    </div>
  )
}

export default FeaturedProperties