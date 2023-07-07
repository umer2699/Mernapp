import React from 'react'

export const Drop = () => {
  return (
    <div className="dropdown">
  <a className="btn btn-secondary NameclassNamedropdown-toggle" To="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    Select Month
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a className="dropdown-item" To="/">January</a></li>
    <li><a className="dropdown-item" To="/">February</a></li>
    <li><a className="dropdown-item" To="/">March</a></li>
    <li><a className="dropdown-item" To="/">April</a></li>
    <li><a className="dropdown-item" To="/">May</a></li>
    <li><a className="dropdown-item" To="/">June</a></li>
    <li><a className="dropdown-item" To="/">July</a></li>
    <li><a className="dropdown-item" To="/">August</a></li>
    <li><a className="dropdown-item" To="/">September</a></li>
    <li><a className="dropdown-item" To="/">Octomber</a></li>
    <li><a className="dropdown-item" To="/">Noember</a></li>
    <li><a className="dropdown-item" To="/">December</a></li>
    
  </ul>
</div>
  )
}
