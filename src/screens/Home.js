import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Table from '../components/Table'
import { Drop } from '../components/Drop'
import Search from '../components/Search'
import Card from '../components/Card'





export default function Home() {
  return (
    <div>
        <div><Navbar/></div>
        <div><Search/></div>
        <div><Drop/></div>
       
         <div><Table/></div>

         


          
          <div><Footer/></div>       

         

      

    </div>
  )
}
