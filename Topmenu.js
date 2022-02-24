 
import * as React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import Contactpage from './pages/Contactpage'
import Homepage from './pages/Homepage'
import Category from './pages/Category';

 

function Topmenu() {
  const [Categories, setCategories] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  let url = '/api/categories/';

  React.useEffect(() => {

    fetch(url).then(res => res.json()).then(res => {
      setCategories(res.data);
      setLoading(false)
    })


  }, [loading])
 
    return <> <div className="container-fluid">
    <a className="navbar-brand" href="#">React hírportál</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {loading===false && Categories.map((item,index)=>{
        if(item.parent_id==0){
        return(
        <li className="nav-item" key={index}>
          <a className="nav-link active" aria-current="page" href="#"  onClick={() => Store.dispatch({
                        type: 'PAGELOAD',   
                        page: <Homepage></Homepage>
          }) }>{item.name}</a>
        </li>
        )}
      })} 
      
        
   

 
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div></>;
}


 

export default Topmenu;

if (document.getElementById('topmenu')) {
  ReactDOM.render(<Topmenu />, document.getElementById('topmenu'));
}