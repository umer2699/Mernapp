import React from 'react'

export default function Footer() {
  return (
    <div className='footer'>
        <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item disabled">
      <a className="page-link" To="/" tabindex="-1" aria-disabled="true">Previous</a>
    </li>
    <li className="page-item"><a className="page-link" To="/">1</a></li>
    <li className="page-item"><a className="page-link" To="/">2</a></li>
    <li className="page-item"><a className="page-link" To="/">3</a></li>
    <li className="page-item">
      <a className="page-link" To="/">Next</a>
    </li>
  </ul>
</nav>
        </div>
  )
}
