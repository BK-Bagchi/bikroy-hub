import React from 'react';
import './Categories.css'

const Categories = () => {
    return (
        <section className="container categories">
            <p className="text-center mt-2 mb-2 font-weight-bold">Search items by Categories</p>
            <div className="row">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Mobile</h5>
                            <p className="card-text">Item amount</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Electronics</h5>
                            <p className="card-text">Item amount</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Vehicle</h5>
                            <p className="card-text">Item amount</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Laptop</h5>
                            <p className="card-text">Item amount</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;