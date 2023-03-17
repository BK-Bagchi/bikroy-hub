import React from 'react';
import About from '../About/About';
import AdsHome from '../AdsHome/AdsHome';
import Bottom from '../Bottom/Bottom';
import Categories from '../Categories/Categories';
import Top from '../Top/Top'

const Main = () => {
    return (
        <div>
            <Top/>
            <AdsHome/>
            <Categories/>
            <About/>
            <Bottom/>
        </div>
    );
};

export default Main;