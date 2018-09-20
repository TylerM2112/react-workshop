////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - Save the state of the form and restore it when the page first loads, in
//   case the user accidentally closes the tab before the form is submitted
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class CheckoutForm extends React.Component {
  constructor() {
    super();
    const formState = window.localStorage.formState;
  if(formState) { 
    this.state = JSON.stringify(formState);
  } else { 
  this.state = {
      billName: '',
      billState: '',
      shippingName: '',
      shippingState: '',
      isChecked: false
    }
  }

  }

  
  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const values = serializeForm(form, { hash: true });
    console.log(values);
  }

  setSameAsBilling = (e) => {
    this.setState({
      isChecked: e.target.checked
    })
    console.log('hey')
  }



  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      window.localStorage.formState = JSON.stringify(this.state);
    });
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name: <input type="text" name="billName" defaultValue='' onChange={e => this.setState({ billName: e.target.value })} />
              </label>
            </p>
            <p>
              <label>
                Billing State: <input type="text" size="2" name='billState' defaultValue='' onChange={e => this.setState({ billState: e.target.value })} />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input type="checkbox" defaultChecked={this.state.isChecked} onChange={(e) => this.setSameAsBilling(e)} /> Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name: <input type="text" name='shippingName' defaultValue={this.state.isChecked ? this.state.billName : this.state.shippingName} />
              </label>
            </p>
            <p>
              <label>
                Shipping State: <input type="text" size="2" name='shippingState' defaultValue={this.state.isChecked ? this.state.billState : this.state.shippingState} />
              </label>
            </p>
          </fieldset>

          <p>
            <button >Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
