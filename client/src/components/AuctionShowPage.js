import React from 'react';
import { Auction } from '../lib/requests'

// import AuctionDetails from './AuctionDetails';
// import BidList from './BidList';
// import BidCreate from './BidCreate';

class AuctionShowPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      auction: []
    }
  }

  componentDidMount() {
    const auctionId = this.props.match.params.id;

    Auction.one(auctionId).then(auction => {
      console.log(auction);
      this.setState({ auction: auction })
    })
  }

  render () {
    const { auction } = this.state

    return (
      <main
        className="AuctionShowPage"
        style={{margin: '0 1rem'}}
      >
        <h2>Bid for:</h2>
        <h2>{auction.title}</h2>
        <p>{auction.details}</p>
        <p>{auction.end_date}</p>

        Current Bid
        
      </main>
    )
  }
}

export default AuctionShowPage;
