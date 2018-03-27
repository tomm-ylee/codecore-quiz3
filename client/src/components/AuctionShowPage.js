import React from 'react';
import { Auction, Bid } from '../lib/requests'
import moment from 'moment'

class AuctionShowPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      auction: [],
      loading: true
    }

    this.addBid = this.addBid.bind(this);
  }

  componentDidMount() {
    const auctionId = this.props.match.params.id;

    Auction.one(auctionId).then(auction => {
      this.setState({ auction: auction, loading: false });
    })
  }

  addBid(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const auctionId = this.state.auction.id
    const bidParams = {
      bid_price: formData.get('bid_price')
    }

    Bid.create(bidParams, auctionId).then(auction => {
      this.setState({ auction: auction })
    })
  }

  render () {
    const { auction, loading } = this.state

    if (loading) {
      return (
        <main
          className="AuctionShowPage"
          style={{margin: '0 1rem'}}
        >
          <p>Loading...⥁</p>
        </main>
      )
    } else {
      const max_bid = Math.max(0, ...auction.bids.map(bid => bid.bid_price))

      return (
        <main
          className="AuctionShowPage"
          style={{margin: '0 1rem'}}
        >
          <div className="AuctionDetails">
            <h2>Bid for:</h2>
            <h2>{auction.title}</h2>
            <p>{auction.details}</p>
            <p>Auction ends on {moment(auction.end_date).format("MMM Do YYYY")}</p>
            <p>By {auction.seller_username}</p>

            <h3>
              Current Max Bid: ${max_bid}
            </h3>
            <p>Reserve Price is {(max_bid > auction.reserve_price) ? "met" : "not met"} (${auction.reserve_price})</p>
          </div>

          <div className="BidList">
            Current Bids
            <ul className="BidList">
              {
                auction.bids.map((bid, i) => (
                  <li key={i}>
                    <strong>${bid.bid_price}</strong> on {moment(bid.created_at).format("MMM Do YYYY")}
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="BidForm">
            <form onSubmit={this.addBid}>
              <div>
                <label htmlFor='bid_price'>Bid:</label> <br />
                <input type='bid_price' id='bid_price' name='bid_price'/>
              </div>
              <div>
                <input type='submit' value='Confirm Bid'/>
              </div>
            </form>
          </div>
        </main>
      )
    }
  }
}

export default AuctionShowPage;
