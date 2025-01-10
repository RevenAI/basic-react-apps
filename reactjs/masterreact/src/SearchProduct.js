import React from 'react'

const SearchProduct = ({search, setSearch }) => {
  return (
    <form className='searchForm' onSubmit={ (e) => e.preventDefault() }>  
    <label htmlFor='search'>Search Product</label>
    <input
    type='text'
    id='search'
    role='searchbox'
    placeholder='Search Product'
    value={ search }
    onChange={ (e) => setSearch(e.target.value) }
    />
    </form>
  )
}

export default SearchProduct

