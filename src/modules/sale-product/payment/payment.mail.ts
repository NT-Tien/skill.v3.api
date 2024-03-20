// import * as nodemailer from 'nodemailer';
// import * as fs from 'fs';
// import * as dotenv from 'dotenv';
// dotenv.config();

// // Tạo một transporter với thông tin đăng nhập của bạn
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'skillceterabot@gmail.com',
//         pass: process.env.MAIL_KEY
//     }
// });

// var testPayload = {
//     total: '10000',
//     products: [
//         {
//             id: '861fb988-f356-4980-9d2b-ab7e013fa74a',
//             name: 'opt 1',
//             product_name: 'product 1',
//             price: 2000,
//             material: 'wood',
//             quantity: 5,
//         }
//     ],
//     ussername: 'tienntse',
//     address: 'thu duc12312312',
//     phone: '0356410582',
//     email: 'tienntse161099@fpt.edu.vn',
// }

// // send mail for user paid
// export async function sendMailForUserPaid(payload: any) {
//     if (!payload) {
//         payload = testPayload;
//     }
//     // read file html 
//     var htmlContent = fs.readFileSync('./src/modules/payment/mail/index.html', 'utf8');
//     // replace content
//     var addOrderNumberContent = htmlContent.replace('#247816', `#***${Math.floor(Math.random() * 1000)}`);
//     var addUserNameContent = addOrderNumberContent.replace('#{username}#', payload.ussername);
//     var addPhoneContent = addUserNameContent.replace('#{phone}#', payload.phone);
//     var addAddressContent = addPhoneContent.replace('#{address}#', payload.address);
//     var addProductsContent = addAddressContent.replace('#{products}#', payload.products.map((item: any) => {
//         return `
//         <tr>
//               <td class="order-list__product-description-cell"
//                 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; width: 100%;">
//                 <span class="order-list__item-title"
//                   style="font-size: 16px; font-weight: 600; line-height: 1.4; color: #555;">${item.product_name}&nbsp;×&nbsp;${item.quantity}</span><br>
//                 <span class="order-list__item-variant"
//                   style="font-size: 14px; color: #999;">${item.name}</span>
//               </td>
//               <td class="order-list__price-cell"
//                 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; white-space: nowrap;">

//                 <p class="order-list__item-price"
//                   style="color: #555; line-height: 150%; font-size: 16px; font-weight: 600; margin: 4px 0 0 15px;"
//                   align="right">${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫</p>
//               </td>
//          </tr>`
//     }))
//     var addTotalContent1 = addProductsContent.replace('#{total}#', payload.total.replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
//     var addTotalContent2 = addTotalContent1.replace('#{total}#', payload.total.replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
//     const mailOptions = {
//         from: 'skillceterabot@gmail.com',
//         to: payload.email,
//         subject: 'Thanh toán thành công',
//         html: addTotalContent2
//     }

//     transporter.sendMail(mailOptions, function (error: any, info: any) {
//         if (error) {
//             console.error(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }

