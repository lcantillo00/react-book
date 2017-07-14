import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const DEFAULT_QUERY='redux';
const DEFAULT_PAGE=0;
const PATH_BASE='https://www.googleapis.com/books/v1/';
const PARTH_SEARCH='/search';
const PARAM_SEARCH='query=';
const  PARAM_PAGE='page=';
const  PARAM_HPP='hitsPerPage=';
const DEFAULT_HPP='100';


 const Search=({value,onChange,children,onSubmit})=>
     <form onSubmit={onSubmit}>
         <input type="text" value={value} onChange={onChange}/>
         <button type="submit">{children}</button>
     </form>





class App extends Component {
    constructor(props){
        super(props)
        // this.onSearchChange=this.onSearchChange.bind(this);
        // this.onSerachSubmit=this.onSerachSubmit.bind(this);
        this.state={
            searchTerm:DEFAULT_QUERY
        }
    }
  render() {
      const{searchTerm}=this.state;
    return (
      <div className="App">
          <Search value={searchTerm} >Search</Search>


      </div>
    );
  }
}

export default App;
