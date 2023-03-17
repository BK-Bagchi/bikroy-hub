import React from 'react';
import Navbar from './Navbar';
import './Top.css'

const Top = () => {
    return (
        <>
            <Navbar/>
            <section className="search-box">
                <div className="search-box-div d-flex justify-content-center pt-5 pb-5">
                    <form>
                        <label>Search:</label>
                        <input type="text" id="search" name="search"/>
                        <button type="submit">Search</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Top;