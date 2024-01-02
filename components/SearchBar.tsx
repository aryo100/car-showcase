'use client';

import React, { useState } from 'react'
import { SearchManufacture } from '.'

export default function SearchBar() {
  const [manufacturer, setManufacturer] = useState('')

  const handleSearch = () => {
  }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchManufacture 
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
      </div>
    </form>
  )
}
