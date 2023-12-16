import React, { useEffect, useState } from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const OrderDetails = () => {
    const history= useHistory()

    const userEmail= localStorage.getItem('email')
    const [orders, setOrders]= useState([])
    const [adsInfo, setAdsInfo] = useState([])

    const orderElementsDetails = orders.map(order => {
        const matchingItem = adsInfo.find(ad => ad._id === order.productId);
        return {
            orderId: order.orderId || 'qwerty12345',
            productId: order.productId || 'qwerty12345',
            customerCredentials: order.customerCredentials,
            matchingItems: matchingItem || 'qwerty12345',
          };   
    }).filter(item => item.matchingItems !== 'qwerty12345');
    // console.log(orderElementsDetails);

    useEffect(() => {
        axios.get(`http://localhost:4000/adsByAnUser?userEmail=${userEmail}`)
          .then(response => {
            // console.log('Response:', response.data);
            setAdsInfo(response.data.userAds)
          })
          .catch(error => {
            // Handle errors here
            console.error('Error:', error.message);
          });
        
        axios.get("http://localhost:4000/getOrdersInfo")
          .then(response => {
            // console.log('Response:', response.data);
            setOrders(response.data)
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
        history.push('/viewGotOrders')
    }

  return (
    <>
        <Navbar/>
        {
            orderElementsDetails.map((orderElement) => {
                const {customerCredentials, matchingItems, orderId} = orderElement
                const {cus_name, cus_phone, ship_add1, total_amount}= customerCredentials
                const {_id, brand, category, description, imageURL, itemName, price}= matchingItems
                return(
                    <section className="show-ad container p-2" key={_id}>
                        <p className='ad-name m-2'>{itemName}</p>
                        <button className='accept-order' onClick={()=>history.push('/viewGotOrders')}>Accept Order</button>
                        <button className='decline-order' onClick={() =>cancelOrder(orderId)}>Decline Order</button>
                        <div className="ad-picture w-100 d-flex align-items-center justify-content-center">
                            <img className="picture w-25" src={imageURL} alt="Product pic" />
                        </div>
                        <div className='description d-flex flex-column align-items-center justify-content-center my-3'>
                            <div className="product-price">
                                <p className="price">Tk. {price}</p>
                            </div>
                            <div className="details d-flex flex-wrap">
                                <div>
                                    <h6>Brand Name</h6>
                                    <p>{brand}</p>
                                </div>
                                <div>
                                    <h6>Model</h6>
                                    <p>{itemName}</p>
                                </div>
                                <div>
                                    <h6>Category</h6>
                                    <p>{category}</p>
                                </div>
                                <div>
                                    <h6>Customer Name</h6>
                                    <p>{cus_name}</p>
                                </div>
                                <div>
                                    <h6>Customer Phone</h6>
                                    <p>{cus_phone}</p>
                                </div>
                                <div>
                                    <h6>Shipping Address</h6>
                                    <p>{ship_add1}</p>
                                </div>
                                <div>
                                    <h6>Total paid amount</h6>
                                    <p>Tk. {total_amount}</p>
                                </div>
                            </div>
                            <div className="description">
                                <p>{description}</p>
                            </div>
                        </div>
                    </section>
                )
            })
        }
        <Bottom/>
    </>
  )
}

export default OrderDetails