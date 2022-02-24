 
import * as React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store'; 

  


function Main() {
  const [Page, setPage] = React.useState(Store.getState().page) 
 
  React.useEffect(() => {
    ;
 
    Store.dispatch({
      type: 'ADDFAVORITE',
      data: localStorage.getItem('favorites') !== null ? JSON.parse(localStorage.getItem('favorites')):[]
    })
    }, [])


    Store.subscribe(() => {
      setPage(Store.getState().page)
  })  
    
  return <>
    
    {Page}</>;
}


 

export default Main;

if (document.getElementById('main')) {
  ReactDOM.render(<Main />, document.getElementById('main'));
}