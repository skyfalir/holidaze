import React from 'react'

import { Helmet } from 'react-helmet'

import FeaturedCard from '../components/Featured-Card/Featured-Card'
import './landing-page.css'

export default function LandingPage() {
  return (
    <div className="home-container">
      <Helmet>
        <title>Holidaze | Home</title>
        <meta property="og:title" content="HolidazeApp" />
      </Helmet>
      <div className="home-top-container">
        <div className="home-hero">
          <div className="home-content-container">
            <h1 className="heading">Need a place?</h1>
            <h2 className="sub-heading">
              We've got it.
            </h2>
            <span className="header-text">High quality venues with versatile booking.</span>
          </div>
        </div>
      </div>
      <div className="home-summary"></div>
      <div id="main-section" className="home-main">
        <h1>
          <span>Our most popular venues</span>
          <br></br>
        </h1>
        <span className="home-recommended">Recommended</span>
        <div className="home-cards-container">
          <FeaturedCard
            city="London"
            image="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
            className="featured-card"
          ></FeaturedCard>
          <FeaturedCard
            city="Rome"
            image="https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
            className="featured-card"
          ></FeaturedCard>
          <FeaturedCard
            city="Cluj-Napoca"
            image="https://images.unsplash.com/photo-1513342791620-b106dc487c94?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
            className="featured-card"
          ></FeaturedCard>
        </div>
      </div>
      <h1>We&apos;ve got something for everyone.</h1>
      <div className="home-stats">
        <div className="home-stat">
          <svg viewBox="0 0 1152 1024" className="home-icon">
            <path d="M768 770.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
            <path d="M327.196 795.328c55.31-36.15 124.080-63.636 199.788-80.414-15.054-17.784-28.708-37.622-40.492-59.020-30.414-55.234-46.492-116.058-46.492-175.894 0-86.042 0-167.31 30.6-233.762 29.706-64.504 83.128-104.496 159.222-119.488-16.914-76.48-61.94-126.75-181.822-126.75-192 0-192 128.942-192 288 0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h279.006c14.518-12.91 30.596-25.172 48.19-36.672z"></path>
          </svg>
          <span className="stats-title">
            <span>Users</span>
            <br></br>
          </span>
          <span className="stats-text">
            Lorem ipsum dolor sit amet.
          </span>
          <h1 className="home-number">
            <span>50</span>
            </h1>
      </div>
        <div className="home-stat">
          <svg viewBox="0 0 1024 1024" className="home-icon">
            <path d="M598 512h234l-234-234v234zM640 214l256 256v426q0 34-26 60t-60 26h-470q-34 0-59-26t-25-60v-598q0-34 26-59t60-25h298zM682 42v86h-512v598h-84v-598q0-34 25-60t59-26h512z"></path>
          </svg>
          <span className="stats-title">Bookings</span>
          <span className="stats-text">
            Lorem ipsum dolor sit amet.
          </span>
          <h1 className="home-number">
            <span>300</span>
          </h1>
        </div>

      <div className="home-stat">
        <svg viewBox="0 0 1024 1024" className="home-icon">
          <path d="M810 640v-86h-84v86h84zM810 810v-84h-84v84h84zM554 298v-84h-84v84h84zM554 470v-86h-84v86h84zM554 640v-86h-84v86h84zM554 810v-84h-84v84h84zM298 470v-86h-84v86h84zM298 640v-86h-84v86h84zM298 810v-84h-84v84h84zM640 470h256v426h-768v-598h256v-84l128-128 128 128v256z"></path>
        </svg>
        <span className="stats-title">Venues</span>
        <span className="stats-text">
          Lorem ipsum dolor sit amet.
        </span>
        <h1 className="home-number">
          <span>20</span>
        </h1>
        
      </div>
    </div>
    </div>
    
  )
}