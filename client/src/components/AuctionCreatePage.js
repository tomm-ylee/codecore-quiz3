import React from 'react';
import { Auction } from '../lib/requests'

class AuctionCreatePage extends React.Component {
  constructor (props) {
    super(props);

    this.addAuction = this.addAuction.bind(this);
  }

  addAuction(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const auctionParams = {
      title: formData.get('title'),
      details: formData.get('details'),
      end_date: formData.get('end_date'),
      reserve_price: formData.get('reserve_price')
    }

    Auction.create(auctionParams).then(data => {
      if (data.errors) {

      } else {
        this.props.history.push(`/auctions/${data.id}`);
      }
    })
  }

  render () {
    return (
      <main
        className="AuctionCreatePage"
        style={{margin: '0 1rem'}}
      >
        <h2>AuctionCreate</h2>
        <form onSubmit={this.addAuction}>
          <div>
            <label htmlFor='title'>Title:</label> <br />
            <input type='title' id='title' name='title'/>
          </div>

          <div>
            <label htmlFor='details'>Details:</label> <br />
            <input type='details' id='details' name='details' />
          </div>

          <div>
            <label htmlFor='reserve_price'>Reserve Price ($):</label> <br />
            <input type='reserve_price' id='reserve_price' name='reserve_price' />
          </div>

          <div>
            <label htmlFor='end_date'>End Date (yyyy-mm-dd):</label> <br />
            <input type='end_date' id='end_date' name='end_date' />
          </div>

          <div>
            <input type='submit' value='Add to Auction'/>
          </div>
        </form>
      </main>
    )
  }
}

export default AuctionCreatePage;
