import React from 'react'

export default function Search() {
  return (
    <div className='search'>
    <div class="input-group">
    <input type="search" class="form-control rounded" placeholder="Transaction" aria-label="Search" aria-describedby="search-addon" />
    <button type="button" class="btn btn-outline-primary">search</button>
  </div>
  </div>
  )
}
