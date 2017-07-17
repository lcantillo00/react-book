import React, { Component } from 'react';

import './App.css';
const DEFAULT_QUERY='redux';
const DEFAULT_PAGE=0;
const PATH_BASE='https://www.googleapis.com/books/v1';
const PATH_SEARCH='/volumes';
const PARAM_SEARCH='q=';
const PARAM_PAGE='maxResults=';
const DEFAULT_PAGES='5';
// https://www.googleapis.com/books/v1/volumes?q=food+allergies&maxResults=5

 const Search=({value,onChange,children,onSubmit})=>
     <form onSubmit={onSubmit}>
         <input type="text" value={value} onChange={onChange}/>
         <button type="submit">{children}</button>
     </form>

const Table = ({list, pattern}) =>
          <div>
              {list.map(item =>
          <div key={item.id} className="table-row">
            <span style={{width:'40%'}}>
              <a href={item.selfLink}>
                {item.title}
              </a>
            </span>
            <span style={{width:'30%'}}>
              {item.authors}
            </span>
        </div>
        )}
          </div>




class App extends Component {
    constructor(props){
        super(props)

        this.state={
            result:null,
            searchKey:'',
            searchTerm:DEFAULT_QUERY
        };
        // this.onSearchChange=this.onSearchChange.bind(this);
        // this.onSerachSubmit=this.onSerachSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.fetchSearchTopStories=this.fetchSearchTopStories.bind(this);
    }
    fetchSearchTopStories(searchTerm,page){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}${PARAM_PAGE}${DEFAULT_PAGES}`)
    .then(response=>response.json())
    .then(result=>this.setSearchTopStories(result))
    .catch(e=>e);
}
componentDidMount(){
    const{searchTerm}=this.state;
    this.setState({searchKey:searchTerm});
    this.fetchSearchTopStories(searchTerm,DEFAULT_PAGES);
}

  onDismiss(id) {
      const{searchKey,results}=this.state;
      const {hits,page}=results[searchKey];

      const isNotId=item=>item.objectID !==id;
      const updatedHits = hits.filter(isNotId);
        this.setState({
            results:{
                  ...results,
                [searchKey]:{hits:updatedHits,page}
            }


         });
  }
  render() {
      const{searchTerm,results,searchKey}=this.state;
      const page=(results && results[searchKey]&&results[searchKey].page)|| 0;
      const list=(results && results[searchKey]&&results[searchKey].hits)|| [];
    return (
      <div className="App">
          <div>
        <Search value={searchTerm} >Search</Search>
          </div>
         <Table list={list} onDismiss={this.onDismiss} />



      </div>
    );
  }
}

export default App;
