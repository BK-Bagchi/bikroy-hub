import React, { useEffect, useState } from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ViewOrders = () => {
    const history= useHistory()
  
    const userEmail= localStorage.getItem('email')
    const [orders, setOrders]= useState([])
    const [adsInfo, setAdsInfo] = useState([])

    const oderElementsDetails = orders.map(order => {
        const matchingItem = adsInfo.find(ad => ad._id === order.productId);
        return {
            orderId: order.orderId,
            productId: order.productId,
            matchingItems: matchingItem,
          };
        
    });
    console.log(oderElementsDetails);//make html map using this comnbinedArray


    useEffect(() => {
        axios.get(`http://localhost:4000/ordersByAnUser?userEmail=${userEmail}`)
          .then(response => {
            // console.log('Response:', response.data);
            setOrders(response.data.userOrders)
          })
          .catch(error => {
            // Handle errors here
            console.error('Error:', error.message);
          });
        
          axios.get("http://localhost:4000/getAdsInfo")
          .then(response => {
            // console.log('Response:', response.data);
            setAdsInfo(response.data)
          })
          .catch(error => {
            // Handle errors here
            console.error('Error:', error.message);
          });
      }, [userEmail]);
    //   console.log(orders, adsInfo)

  return (
    <>
        <Navbar/>
        <section className="ads-home container">
            <p>Posted ads(click to cancel)</p>
            <div className="card-group">
                {
                    oderElementsDetails.map(oderElements =>{
                        const {orderId, matchingItems}= oderElements
                        const {itemName, description, price, imageURL, postingTime}= matchingItems
                        
                        return (
                            <div className='card' key={orderId} data-toggle="modal" data-target="#exampleModal">
                                {/* Modal starts */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                           <p>Are you sure you want to cancel order??</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-danger">Cancel Now</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Modal ends */}
                                <img className="card-img-top" src={imageURL} alt="Card img cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{itemName}</h5>
                                    <p className="card-text">{description}</p>
                                    <span className="card-text price">Price: {price}</span>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Posted on {postingTime}</small>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
        <Bottom/>
    </>
  )
}

export default ViewOrders