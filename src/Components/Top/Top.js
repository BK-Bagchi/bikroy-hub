import React, { useState } from 'react';
import Navbar from './Navbar';
import './Top.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Top = () => {
    const history= useHistory()
    const [searchItem, setSearchItem]= useState('')

    const getSearchItem= (e) =>{
        setSearchItem(e.target.value)
    }
    const capitalizeFirstLetter= (text)=> {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      }
    const setSearch= (e)=>{
        e.preventDefault()
        const formattedText = capitalizeFirstLetter(searchItem) //capitalize the first letter only
        localStorage.setItem('searchItem', formattedText)
        history.push('/search')
    }
    return (
        <>
            <Navbar/>
            <section className="search-box">
                <div className="search-box-div d-flex justify-content-center pt-5 pb-5">
                    <form className="search-btn w-50 d-flex justify-content-center">
                        <input type="text" id="search" name="search" placeholder="Search by category" value= {searchItem} onChange={getSearchItem} />
                        <button type="submit" onClick={setSearch}>Search</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Top;