import React, { useEffect, useState } from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import axios from 'axios'

const ViewOrders = () => {
    const userEmail= localStorage.getItem('email')
    const [orders, setOrders]= useState([])
    const [adsInfo, setAdsInfo] = useState([])

    const orderElementsDetails = orders.map(order => {
        const matchingItem = adsInfo.find(ad => ad._id === order.productId);
        return {
            orderId: order.orderId || 'qwerty12345',
            productId: order.productId || 'qwerty12345',
            matchingItems: matchingItem || 'qwerty12345',
          };
        
    });
    console.log(orderElementsDetails);


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

    const cancelOrder= (orderId)=>{
        // console.log(orderId)
        axios.post('http://localhost:4000/deleteOrder', { orderId }, {
            headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                console.log('Response:', response.data);
                window.location.reload();
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error:', error);
            });
    }

  return (
    <>
        <Navbar/>
        <section className="ads-home container">
            <p>Posted ads(click to cancel)</p>
            <div className="card-group">
                {
                    orderElementsDetails.map(orderElements =>{
                        const {orderId, matchingItems}= orderElements
                        const {itemName, description, price, imageURL, postingTime}= matchingItems
                        
                        return (
                            <div className='card' key={orderId} onClick={() =>cancelOrder(orderId)}>
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