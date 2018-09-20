import React, { Component } from 'react';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        // Initialize state
        this.state = {
            newProduct: {
                title: '',
                description: '',
                price: 0,
                availability: 0
            }
       
        }


        // Boilerplate code for binding methods with 'this'
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    

    } // end constructor

    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {
        /* Duplicating and updating the state */

      
        if (key == 'price') {
            const re = /^[0-9\b]+$/;
            e.target.value = e.target.value.replace(e.target.value,re);
            var temp = e.target.value;
            e.target.value = temp.substring(0, temp.length - 1);
        
       }
        
        var state = Object.assign({}, this.state.newProduct);
        state[key] = e.target.value;
        this.setState({ newProduct: state })
    }

    /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
        //prevent default prevents page reload
        e.preventDefault();
        /* A call back to the onAdd props
        The current state is passed as a parameter
        */
       this.props.onAdd(this.state.newProduct); 
       
    }


    render() {

        const divStyle = {
            position: 'absolute',
            left: '35%',
            top: '60%',
            flexDirection: 'space-between',

            marginLeft: '30px'
        }

        const inputStyle = {
            margin: '0px 10px 0px 10px'
        }


/*        when Submit button is pressed, the control is passed to
            * handleSubmit method 
*/

        return (
            <div>
                <h2> Add new product </h2>
                <div style={divStyle}>
                      <form onSubmit={this.handleSubmit}>
                        <label> Title:
                         { /*On every keystroke, the handeInput method is invoked */}
                           <input type="text" onChange={(e) => this.handleInput('title', e)} />
                        </label>
                        <br />
                        <label> Description:
                          <input type="text" onChange={(e) => this.handleInput('description', e)} />
                        </label>
                        <br />
                        <label> Price:
                          <input type="text" pattern="[0-9]*" onChange={(e) => this.handleInput('price', e)} />
                        </label>

                        
                        { /* Input fields for Price and availability omitted for brevity */}

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>)
    }
}
export default AddProduct;
