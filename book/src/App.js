import React,{ Component} from 'react';
// import Parser from 'html-react-parser';
import './App.css';
const DEFAULT_QUERY='redux';
const DEFAULT_RESULT=13;

const PATH_BASE='https://www.googleapis.com/books/v1';
const PATH_SEARCH='/volumes';
const PARAM_SEARCH='q=';
const PARAM_RESULT='maxResults=';

const Search=({onChange,onSubmit,children,searchTerm})=>
    <form  onSubmit={onSubmit}>

            <input type="text" value={searchTerm} onChange={onChange}/>
            <button type="submit">{children}</button>


    </form>
class App extends Component{
    constructor(props){
        super(props);
        this.state={
            data:null,
            searchTerm:DEFAULT_QUERY
            }
        this.fetchBooks=this.fetchBooks.bind(this);
        this.setBooks=this.setBooks.bind(this);
        this.onSearchChange=this.onSearchChange.bind(this);
        this.onSearchSubmit=this.onSearchSubmit.bind(this);
    }
    setBooks(data){
        this.setState({data})
        }
fetchBooks(searchTerm){
        console.log(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_RESULT}${DEFAULT_RESULT}`);
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_RESULT}${DEFAULT_RESULT}`)
        .then( response => response.json())
        .then(result=>this.setBooks(result))
        .catch(e=>e);

    }

    componentDidMount(){
        const {searchTerm}=this.state;
        this.fetchBooks(searchTerm);

    }
    onSearchChange(e){
        this.setState({searchTerm:e.target.value})

    }
    onSearchSubmit(e){
        const {searchTerm}=this.state;
        this.fetchBooks(searchTerm);
        e.preventDefault();
    }
    render(){
        const {data}=this.state;

        if (!data){
            return null;
        }


        return(
                <div className="containter">

                        <div className="searchInput">
                          <h1>My Book Search!!</h1>
                            <Search
                                onChange={this.onSearchChange}
                                onSubmit={this.onSearchSubmit}
                                >
                                Search
                              </Search>
                        </div>
                    <div className="mymain">
                        <div className="mysecond">

                        {data.items.map(book=>
                            <div key={book.id} className="book">
                                <img src={book.volumeInfo.imageLinks.smallThumbnail} alt=""/>
                                <div className="overlay">

                                    <div className="text">
                                    <ul>
                                        {book.volumeInfo.authors.map(author=>
                                            <li key={author}>{author}</li>
                                        )}
                                    </ul>
                                  </div>
                                  {/* <p>{book.volumeInfo.title}</p>
                                  <p>{book.volumeInfo.subtitle}</p>
                                  <p>{book.accessInfo.pdf.isAvailable}</p> */}
                                </div>


                                {/* {book.searchInfo ? Parser(book.searchInfo.textSnippet):
                                 null} */}



                        </div>


                    )}
                    </div>
                </div>

                </div>

            );
    }


}


export default App;
