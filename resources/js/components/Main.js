import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import AddProduct from './AddProduct';
import MenuTest from './MenuTest';

/* An example React component */
class Main extends Component {
    constructor() {
        super();
        // Initialize the state in the constructor
        this.state = {
            products: [],
            currentProduct: null
        }
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /*componentDidMount() is a lifecycle method
    that gets called after the component is rendered
    */
    componentDidMount() {
        // fetch API in Action */
        fetch('api/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                // Fetch product is store in the state
                this.setState({ products });
            })
    }
    renderProducts() {
        return this.state.products.map(product => {
            return (
                /* When Using list you need to specify a key
                attribute that is unique for each list item
                */
                <li onClick={
                    () => this.handleClick(product)}
                    key={product.id} >
                    {product.title}
                </li>
            );
        })
    }

    handleClick(product) {
        //handle Click is used to set the sate
        this.setState({ currentProduct: product });
        //seems to show me the 'last' state, not what is set above??
     
    }

handleAddProduct(product) {
  
    product.price = Number(product.price);
    alert(product.price);
    /*Fetch API for post request */
    alert(product.title);
    fetch('api/products/',  {
        method: 'post',
        /*headers are important */
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
           
            body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
        .then(data => {
            //update the state of products and currentProduct
            this.setState((prevState) => ({
                products: prevState.products.concat(data),
                currentProduct: data
            }))
    })
}
    handleDelete() {

        const currentProduct = this.state.currentProduct;
        fetch('api/products/' + this.state.currentProduct.id,
            { method: 'delete' })
            .then(response => {
                /* Duplicate the array and filter out the item to be deleted */
                var array = this.state.products.filter(function (item) {
                    return item !== currentProduct
                });
                this.setState({ products: array, currentProduct: null });
            });
    }
    handleUpdate(product) {

        const currentProduct = this.state.currentProduct;
        fetch('api/products/' + currentProduct.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                /* Updating the state */
                var array = this.state.products.filter(function (item) {
                    return item !== currentProduct
                })
                this.setState((prevState) => ({
                    products: array.concat(product),
                    currentProduct: product
                }))
            })
    }

    render() {
        const mainDivStyle = {
            display: "flex",
            flexDirection: "row"
        }

        const divStyle = {

            justifyContent: "flex-start",
            padding: '10px',
            width: '35%',
            background: '#f0f0f0',
            padding: '20px 20px 20px 20px',
            margin: '30px 10px 10px 30px'

        }
        return (
            <div>
           
                <div style={mainDivStyle}>
                    <div style={divStyle}>
                        <h3>All Products</h3>
                        <ul>
                            {this.renderProducts()}
                        </ul>
                    </div>
                    <Product 
                    product={this.state.currentProduct} 
                    onDelete={this.handleDelete}
                     />
                </div>
               <AddProduct onAdd={this.handleAddProduct} />
            </div>
        );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}