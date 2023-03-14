import React from 'react';
import './Categories.css'

const Categories = () => {
    return (
        <section className="categories">
            <p className="text-center mt-2 mb-2 font-weight-bold">Search items by Categories</p>
            <div className="categories-card container">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Item name</h5>
                                <p class="card-text">Item amount</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Item name</h5>
                                <p class="card-text">Item amount</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Item name</h5>
                                <p class="card-text">Item amount</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Item name</h5>
                                <p class="card-text">Item amount</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;