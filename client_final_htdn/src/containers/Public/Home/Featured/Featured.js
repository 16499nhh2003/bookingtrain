import React from "react"
import Heading from "../../Heading"
import "./Featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <Heading title='KHUYẾN MÃI' subtitle='Khuyến mãi' />
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured
