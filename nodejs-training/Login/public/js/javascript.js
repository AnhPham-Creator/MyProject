// var orders = [];
// function MakeOrder(product) {
//   let id = orders.length + 1;
//   let quantity;
//   let datacookie = document.cookie.indexOf('order=');
//   let found =  orders.find((order) => {
//     return order.name === product.name
//   });
//   if(found) {
//     orders[orders.length-1].quantity += 1;
//     if(datacookie) {
//       document.cookie = 'order=';
//     }
//     document.cookie = 'order='+JSON.stringify(orders);
//     load(orders);
//     return;
//   }

//   let productNew = {
//     id: id,
//     name: product.name,
//     price: product.price,
//     quantity: 1
//   };
//   orders.push(productNew);
//   // let data = sessionStorage.getItem('order');
//   // if(data){
//   //   sessionStorage.removeItem('order');
//   // }
//   // sessionStorage.setItem('order', JSON.stringify(orders));
//   if(datacookie) {
//     document.cookie = 'order=';
//   }
//   document.cookie = 'order='+JSON.stringify(orders);
//   load(orders);
// }

// function load(orders) {
//   var id = 0;
//   var idOrder = document.getElementById("cart-order");
//   var html = orders.map((order) => {
//     return "<tr> <td>"+order.id+"</td> <td>"+order.name+
//     "</td> <td>"+order.price+"</td> <td>"+order.quantity+"</td> </tr>";
//   })
//   idOrder.innerHTML = html.join('');
//   if(!orders.length) {
//     document.getElementById("text-cart").innerHTML = "Your shopping cart is empty."
//     return
//   }
//   document.getElementById("text-cart").innerHTML = ""
// }
// //load(orders);
 