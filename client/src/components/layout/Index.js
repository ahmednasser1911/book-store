import React from 'react'
import Search from '../books/Search'
import Books from '../books/Books'
const Index = props => {
    return (
        <div className='container'>
            <Search />
            <Books />
        </div>
    )
}

export default Index;
