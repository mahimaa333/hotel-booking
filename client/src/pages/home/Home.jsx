import React from 'react';
import Featured from '../../Components/featured/Featured';
import Header from '../../Components/header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import PropertyList from '../../Components/propertyList/PropertyList';
import FeaturedProperties from '../../Components/featuredProperties/FeaturedProperties';

import './Home.css';
import MailList from '../../Components/mailList/MailList';
import Footer from '../../Components/footer/Footer';

const Home = () => {
  return (
    <div>
        <Navbar />
        <Header />
        <div className="home-container">
            <Featured/>
            <h1 className="home-title">Browse by Property Name</h1>
            <PropertyList/>
            <h1 className="home-title">Homes Guests Love</h1>
            <FeaturedProperties/>
        </div>
        <MailList/>
        <Footer/>
    </div>
  )
}

export default Home