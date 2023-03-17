import React from 'react';
import './AdsHome.css'


const AdsHome = () => {
    return (
        <section className="ads-home container">
            <p>Posted adds</p>
            <div className="card-group">
                <div className="card">
                    <img className="card-img-top" src={require(`../../Resources/ads/Mobile.jpg`)} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Phone</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Posted 1 days ago</small>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top" src={require(`../../Resources/ads/Motorcycle.jpg`)} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Motorcycle</h5>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Posted 3 days ago</small>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top" src={require(`../../Resources/ads/Laptop.jpg`)} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Laptop</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Posted 2 days ago</small>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdsHome;