import axios from "axios"

export const getBooks = (name) => {
  if(name){
    return axios
      .get(`http://localhost:9090/api/common/getBooks?name=${name}`, { withCredentials: true })
      .then((result) => {
        return result.data.map((book) => ({
          id: `${book.id}`,
          name: `${book.name}`,
          author: `${book.authors[0].name}`,
          image : `${book.image}`
        }));
      });
    }else{
      return axios
      .get(`http://localhost:9090/api/common/getBooks`, { withCredentials: true })
      .then((result) => {
        return result.data.map((book) => ({
          id: `${book.id}`,
          name: `${book.name}`,
          author: `${book.authors[0].name}`,
          image : `${book.image}`
        }));
      });
    }
  };

  export const getAuthors = (name) => {
    if(name){
      return axios.get(`http://localhost:9090/api/common/getAuthors?name=${name}`,{withCredentials:true}).then((result) => {
      return result.data.map((author) =>(author.books[0]) ?    
      (     
        {
        id : `${author.id}`,
        name: `${author.name}`,
        book : `${author.books.map(book => book.name).join(" , ")}`
      }) : ({
        id : `${author.id}`,
        name: `${author.name}`,
        book : "none"
      }));
    });
    }
    else{
      return axios.get("http://localhost:9090/api/common/getAuthors",{withCredentials:true}).then((result) => {
        return result.data.map((author) =>(author.books[0]) ?    
        (     
          {
          id : `${author.id}`,
          name: `${author.name}`,
          book : `${author.books.map(book => book.name).join(" , ")}`
        }) : ({
          id : `${author.id}`,
          name: `${author.name}`,
          book : "none"
        }));
      });
    }
    
  };

  export const getBook = (id) => {
    return axios.get(`http://localhost:9090/api/common/getBook?id=${id}`,{withCredentials:true}).then((result) => {
      return result.data;
    });

  }