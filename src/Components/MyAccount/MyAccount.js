import { useHistory } from 'react-router-dom';
import Bottom from '../Bottom/Bottom';
import Navbar from '../Top/Navbar';
import './MyAccount.css'
import useAuth from '../../Hooks/JWTDecode';

const MyAccount = () => {
    const history= useHistory();
    const { logout } = useAuth();
    return (
        <>
            <Navbar/>
            <section className="myAccount container d-flex align-items-center justify-content-around">
                <div className="profile-postadd d-flex justify-content-around flex-wrap">
                    <button className="my-2 profile-btn" onClick={()=>{
                        history.push('/myProfile');
                    }}><i class="bi bi-person-fill"></i> View Profile</button>
                    <button className="my-2 post-add-btn" onClick={()=>{
                        history.push('/viewPostedAds');
                    }}><i class="bi bi-file-post"></i> View Posted Ads</button>
                    <button className="my-2 post-add-btn" onClick={()=>{
                        history.push('/viewMyOrders');
                    }}><i class="bi bi-border-width"></i> View My Orders</button>
                    <button className="my-2 post-add-btn" onClick={()=>{
                        history.push('/viewGotOrders');
                    }}><i class="bi bi-list-ul"></i> View Got Orders</button>
                    <button className="my-2 post-add-btn" onClick={()=>{
                        history.push('/postAds');
                    }}><i class="bi bi-file-earmark-post"></i> Post Your Add Now</button>
                    <button className="my-2 post-add-btn" onClick={()=>{
                        logout();
                        history.push('/');
                    }}><i class="bi bi-box-arrow-right"></i> Logout</button>
                </div>
            </section>
            <Bottom/>
        </>
    );

};

export default MyAccount;