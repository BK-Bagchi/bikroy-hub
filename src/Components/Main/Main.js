import React from 'react';
import About from '../About/About';
import Bottom from '../Bottom/Bottom';
import Categories from '../Categories/Categories';
import Top from '../Top/Top'

const Main = () => {
    return (
        <div>
            <Top/>
            <Categories/>
            <About/>
            <Bottom/>
        </div>
    );
};

export default Main;