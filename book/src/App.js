import React,{ Component} from 'react';
import data from './data.json';


class App extends Component{
    constructor(props){
        super(props);
        this.state={
            data

        }
    }
    render(){
        const {data}=this.state
        return(
                <div>
                    <h1>My Book Search!!</h1>
                    {data.items.map(book=>
                        <div key={book.id}>
                            <img src={book.volumeInfo.imageLinks.smallThumbnail} alt=""/>
                            <h3>{book.volumeInfo.title}</h3>
                            <span>{book.volumeInfo.subtitle}</span>
                            <p>{book.accessInfo.pdf.isAvailable}</p>
                            <ul>
                                {book.volumeInfo.authors.map(author=>
                                    <li key={author}>{author}</li>
                                )}
                            </ul>
                            {book.searchInfo ? book.searchInfo.textSnippet:
                             null}

                    </div>

                    )}

                </div>
            );
    }


}


export default App;
