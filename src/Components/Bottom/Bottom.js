import React from 'react';
import './Bottom.css'

const Bottom = () => {
    // const date= Date.getFullYear(); 
    return (
        <>
            <p className="line"></p>
            <section className="bottom container">
                <div className="row">
                    <div className="col-sm-4">
                        <p>Download Our App</p>
                        <p>Connect With</p>
                        <p>Other Countries</p>
                        <img className="logo-big" src={require(`../../Resources/images/logo-big.jpg`)} alt="" />
                    </div>
                    <div className="col-sm-2">
                        <p>More from Bikroy</p>
                        <ul>
                            <li>Sell fast</li>
                            <li>Membership</li>
                            <li>Banner Ads</li>
                            <li>Ad promotions</li>
                            <li>Staff solutions</li>
                            <li>Bikes Guide</li>
                        </ul>
                    </div>
                    <div className="col-sm-2">
                        <p>Help & Support</p>
                        <ul>
                            <li>FAQ</li>
                            <li>Stay safe</li>
                            <li>Contact us</li>
                        </ul>
                    </div>
                    <div className="col-sm-2">
                        <p>Follow Bikroy</p>
                        <ul>
                            <li>Blog</li>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Youtube</li>
                        </ul>
                    </div>
                    <div className="col-sm-2">
                        <p>About Bikroy</p>
                        <ul>
                            <li>Contact us</li>
                            <li>Career</li>
                            <li>Terms and conditions</li>
                            <li>Privacy policy</li>
                            <li>Sitemaps</li>
                        </ul>
                    </div>
                </div>
            </section>
            <footer>
                Copyright &copy; bkbagchi.dipto {new Date().getFullYear()}
            </footer>
        </>
    );
};

export default Bottom;