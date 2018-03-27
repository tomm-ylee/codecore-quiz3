import React from 'react';
import { Link } from 'react-router-dom'
import { Auction } from '../lib/requests'

class AuctionIndexPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      auctions:[],
      loading: true
    }

  }
  componentDidMount() {
    Auction.all().then(auctions => {
      this.setState({ auctions: auctions, loading: false })
    })
  }

  render () {
    const { auctions, loading } = this.state

    if (loading) {
      return (
        <main
          className="AuctionIndexPage"
          style={{margin: '0 1rem'}}
        >
          <p>Loading...⥁</p>
        </main>
      )
    } else {
      return (
        <main
          className="AuctionIndexPage"
          style={{margin: '0 1rem'}}
        >
          <h2>Items for Auctions</h2>
          <ul className="auctionList">
            {auctions.map( auction => (
              <div key={auction.id}>
                <Link to={`/auctions/${auction.id}`}>
                  {auction.title}
                </Link>
              </div>
            ))}
          </ul>
        </main>
      )
    }
  }
}

export default AuctionIndexPage;
