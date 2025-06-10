import React from 'react'

const checkout = {
    _id:"1234",
    createdAt:new Date(),
    checkoutItems:[
    {
      productId: "1",
      size:"M",
      color:"Black",
      name: "Stylish Jacket",
      price: 100,
      quantity:1,
      images:  'https://picsum.photos/500/500?random=1' ,
    },
    {
      productId: "2",
      size:"L",
      color:"Red",
      name: "Casual Jacket",
      price: 100,
      quantity:1,
      images:'https://picsum.photos/500/500?random=2' ,
    },
    {
      productId: "3",
      size:"M",
      color:"Black",
      name: "Stylish Jacket",
      price: 100,
      quantity:1,
      images: 'https://picsum.photos/500/500?random=3',
    },
    {
      productId: "4",
      size:"L",
      color:"Red",
      name: "Casual Jacket",
      price: 100,
      quantity:1,
      images: 'https://picsum.photos/500/500?random=4' ,
    },
    ],
    shippingAddress:{
        address :"123 Fashion street",
        city:"New York",
        country:"USA"
    }
} 

const OderConfirmationPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
       Thank You for Your Order!
        </h1>

        {checkout && (
            <div>
                <h2 className='mb-2'>Order ID: {checkout._id}</h2>
                <p>Order Date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
            </div>
        )}
    </div>
    
  )
}

export default OderConfirmationPage