import React, {useContext, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBed, faPlane, faCar, faDharmachakra, faCalendarDays, faPerson} from '@fortawesome/free-solid-svg-icons'
import './Header.css'
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import {format} from "date-fns"
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'


const Header = ( {type} ) => {

  const [destination, setDestination] = useState("")
  const [dates, setDate] = useState([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
  }])

  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      room: 1
  })
  const [openOptions, setOpenOptions] = useState(false)

  const handleOption = (name, btn) => {
    setOptions((prev) => {
        return{
            ...prev, 
            [name]: btn === 'i' ? options[name]+1 : options[name]-1
        }
    })
  }
  const { user } = useContext(AuthContext);
  const {dispatch} = useContext(SearchContext)

  const navigate = useNavigate()

  const handleSearch = () => {
      dispatch({type: "NEW_SEARCH", payload:{destination,dates, options}})
      navigate("/hotels", {state: {destination,dates,options}})
  }

  return (
    <div className="header">
        <div className="header-container">
            <div className="header-list">
                <div className="header-item active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="header-item">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="header-item">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car Rentals</span>
                </div>
                <div className="header-item">
                    <FontAwesomeIcon icon={faDharmachakra} />
                    <span>Attractions</span>
                </div>
                <div className="header-item">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Airpot Taxis</span>
                </div>
            </div>
            { type !== "hotels" &&
                <><div className="header-text">
                <h1 className="header-title">
                    A lifetime of discounts? It's genius. 
                </h1>
                <p className="header-desc">
                    Get rewarded for travels
                </p>
                {!user && <button className="header-btn">Sign in / Register</button>}
            </div>
            <div className="header-search">
                <div className="header-search-item">
                    <FontAwesomeIcon icon={faBed} className="header-icon"/>
                    <input onChange={(e) => setDestination(e.target.value)} type="text" name="" id="" placeholder='Where are you going' className="header-search-input" />
                </div>
                <div className="header-search-item">
                    <FontAwesomeIcon icon={faCalendarDays} className="header-icon"/>
                    <span onClick={() => setOpenDate(!openDate)} className="header-search-text">{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                    {openDate && <DateRange editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates} className='date'/>}
                </div>
                <div className="header-search-item">
                    <FontAwesomeIcon icon={faPerson} className="header-icon"/>
                    <span onClick={() => setOpenOptions(!openOptions)} className="header-search-text">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                    {openOptions && <div className="options">
                        <div className="option-item">
                            <span className="option-text">Adult</span>
                            <div className="option-cont">
                                <button className='option-counter-btn' onClick={() => handleOption("adult","d")} disabled={options.adult <=1}>-</button>
                                <span className="option-counter-number">{options.adult}</span>
                                <button className='option-counter-btn' onClick={() => handleOption("adult","i")}>+</button>
                            </div>
                        </div>
                        <div className="option-item">
                            <span className="option-text">Children</span>
                            <div className="option-cont">
                                <button className='option-counter-btn' onClick={() => handleOption("children","d")} disabled={options.children <=0}>-</button>
                                <span className="option-counter-number">{options.children}</span>
                                <button className='option-counter-btn' onClick={() => handleOption("children","i")}>+</button>
                            </div>
                        </div>
                        <div className="option-item">
                            <span className="option-text">Room</span>
                            <div className="option-cont">
                                <button className='option-counter-btn' onClick={() => handleOption("room","d")} disabled={options.room <=1}>-</button>
                                <span className="option-counter-number">{options.room}</span>
                                <button className='option-counter-btn' onClick={() => handleOption("room","i")}>+</button>
                            </div>
                        </div>
                    </div> }
                </div>
                <div className="header-search-item">
                    <button className="header-search-btn" onClick={handleSearch}>Search</button>
                </div>
            </div></>}
        </div>
    </div>
  )
}

export default Header