const DOMAIN = 'localhost:3333';
const BASE_URL = `http://${DOMAIN}/v1`;

function getJWT() {
  return localStorage.getItem('jwt');
}

const Token = {
  create (params) {
    return fetch(
      `${BASE_URL}/tokens`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    )
      .then(res => res.json())
  }
}

const Auction = {
  all() {
    return fetch(`${BASE_URL}/auctions`, {
      headers: { 'Authorization': getJWT() }
    })
      .then(res => res.json());
  },
  one(id) {
    return fetch(`${BASE_URL}/auctions/${id}`, {
      headers: { 'Authorization': getJWT() }
    })
      .then(res => res.json());
  },
  create(params) {
    return fetch(`${BASE_URL}/auctions`, {
      headers: {
        'Authorization': getJWT(),
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(params)
    })
      .then(res => res.json())
  },
  update(params, id) {
    return fetch(`${BASE_URL}/auctions/${id}`, {
      headers: {
        'Authorization': getJWT(),
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(params)
    })
      .then(res => res.json())
  },
  delete(id) {
    return fetch(`${BASE_URL}/auctions/${id}`, {
      headers: { 'Authorization': getJWT() },
      method: 'DELETE'
    })
      .then(res => res.json())
  }
}
const Bid = {
  create(params, auction_id) {
    return fetch(`${BASE_URL}/auctions/${auction_id}/bids`, {
      headers: {
        'Authorization': getJWT(),
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(params)
    })
      .then(res => res.json())
  },
  delete(id) {
    return fetch(`${BASE_URL}/bids/${id}`, {
      headers: { 'Authorization': getJWT() },
      method: 'DELETE'
    })
      .then(res => res.json())
  }
}

export { Token, Auction, Bid };
