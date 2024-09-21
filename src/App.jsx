import { useState } from "react";
import Table from "react-bootstrap/Table";

import Textbox from "./components/textbox/textbox";
import Dropdown from "./components/dropdown/dropdown";
import CustomButton from "./components/button/button";

import "./App.css";

function App() {
  let subTotal = 0;
  const [cartItems, setCartItems] = useState([]);
  const [txtName, setTxtName] = useState("");
  const [textPrice, setTextPrice] = useState("");
  const [textQuantity, setTextQuantity] = useState("");
  const[shipping, setShippingFee] = useState(0);
  const towns = ["Tubigon" , "Calape"] ;
  const fee = {
    Tubigon : 30,
    Calape : 50,
  }

  function onChange(e) {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "txtName") setTxtName(value);
    if (id === "txtPrice") setTextPrice(value);
    if (id === "txtQuantity") setTextQuantity(value);
    if(towns.includes(value)) {
      setShippingFee(fee[value]);
    }
  }

  function addToChart() {
    if ((txtName, textPrice, textQuantity)) {
      const item = {
        name: txtName,
        price: textPrice,
        quantity: textQuantity,
      };
      const newItems = [...cartItems, item];
      setCartItems(newItems);
      setTxtName("");
      setTextPrice("");
      setTextQuantity("");
    }
  }
  function clearCart() {
    setCartItems([]);
  }

  function deleteItem(itemIndex) {
    console.log(itemIndex);
    const cartNewItems=[...cartItems].toSpliced(itemIndex,1);
    setCartItems(cartNewItems);
    // const newItems = cartItems.filter((item,index) => index !== itemIndex);
    // setCartItems(newItems);
    // TODO: remove an item in the cartItems state with the given itemIndex
  }
  function editItem(itemIndex) {
  }
  function formatCurrency(num) {
    const formatter = new Intl.NumberFormat("en-US",{
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      });
      return formatter.format(num);
  }

  return (
    <div>
      <div className="main-container">
        <div className="sub-container">
          <Textbox
            id="txtName"
            type="text"
            label="item name"
            value={txtName}
            containerClass="p-3"
            onTextChange={onChange}
          />
          <Textbox
            id="txtPrice"
            type="number"
            label="item price"
            value={textPrice}
            containerClass="p-3"
            onTextChange={onChange}
          />
          <Textbox
            id="txtQuantity"
            type="number"
            label="quantity"
            value={textQuantity}
            containerClass="p-3"
            onTextChange={onChange}
          />
          <div className="d-flex justify-content-center py-2">
            <CustomButton
              label="add to cart"
              onClick={addToChart}
              variant="primary"
            />
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="item-container my-5">
            <h3 className="text-center py-3">CART ITEMS</h3>
            <div className="d-flex justify-content-end">
            <CustomButton 
                onClick= {clearCart}
                label="clear"
                variant="dark"
                innerClass="m-1"
                />
                </div>
            <Table striped bordered>
              <thead>
                <tr className="text-capitalize">
                  <th>item#</th>
                  <th>item name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                  <td>actions</td>
                </tr>
              </thead>
              <tbody>

                {cartItems.map((item, index) => {
                  const total = item.price * item.quantity;
                  subTotal += total;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(total)}</td>
                      <td className="text-center" width={200}>
                        <CustomButton
                          label="edit"
                          variant="success"
                          innerClass="m-1"
                          onClick={() => editItem(item)}
                        />
                        <CustomButton
                          label="delete"
                          variant="danger"
                          innerClass="m-1"
                          onClick={() => deleteItem(index)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center"> 
            <Dropdown
            id="drpTown"
            label="town"
            options={towns}
            containerClass="p-3"
            onSelectChange={onChange}
          />
          <Dropdown
            name="drpPayment"
            label="payment method"
            options={["gcash", "creditcard"]}
            containerClass="p-3"
            onSelectChange={onChange}
          />
          </div>
          <div className="text-p-3">
            <h3>Subtotal:{formatCurrency(subTotal)}</h3>
            <h3>Shipping Fee:{formatCurrency(shipping)}</h3>
            <h3>GrandTotal:{formatCurrency(subTotal + shipping)}</h3>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
