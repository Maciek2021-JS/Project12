const Cash = (props) => {
  const value = (props.cash / props.ratio * props.price).toFixed(2)
  return (
    <div>{props.title} {props.cash <= 0 ? "" : value}</div>
  )
}

class ExchangeCounter extends React.Component {

  state = {
    amount: "",
    product: "electricity",
  }

  static defaultProps = {
    currencies: [
      {
        id: 1,
        name: "euro",
        ratio: 4.3,
        title: "Wartość w euro wynosi:",
      },
      {
        id: 2,
        name: "dollars",
        ratio: 3.5,
        title: "Wartość w dolarach wynosi:",
      },
      {
        id: 3,
        name: "pounds",
        ratio: 5.6,
        title: "Wartość w funtach wynosi:",
      },
    ],
    prices: {
      electricity: .57,
      gas: 3.67,
      oranges: 2.78,
    }
  }

  handleChange = e => {
    this.setState({
      amount: e.target.value
    })
  }

  handleSelect = (e) => {
    this.setState({
      product: e.target.value,
      amount: "",
    })
  }

  insertSuffix(select) {
    if (select === "electricity") return <em>kWh</em>
    else if (select === "gas") return <em>litrów</em>
    else if (select === "oranges") return <em>kilogramów</em>
    else return null
  }

  selectPrice(select) {
    const price = this.props.prices[select]
    return price
  }

  render() {

    const { amount, product } = this.state;
    const price = this.selectPrice(product)

    const Calculator = this.props.currencies.map(currency => <Cash key={currency.id} name={currency.name} ratio={currency.ratio} title={currency.title} cash={amount} price={price} />)

    return (
      <div className="app">
        <label >Wybierz produkt
          <select value={product} onChange={this.handleSelect}>
            <option value="electricity">prąd</option>
            <option value="gas">paliwo</option>
            <option value="oranges">pomarańcze</option>
          </select>
        </label>
        <br />
        <label>
          <input
            type="number"
            value={this.state.amount}
            onChange={this.handleChange}
          />
          {this.insertSuffix(product)}
        </label>
        {Calculator}
      </div>
    )

  }
}
ReactDOM.render(<ExchangeCounter />, document.getElementById('root'))