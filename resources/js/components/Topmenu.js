 
import * as React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import Contactpage from './pages/Contactpage'
import Homepage from './pages/Homepage'
import Category from './pages/Category';

 

function Topmenu() {

  const [favnumber, setFavNumber] = React.useState(Store.getState().favnumber)
  const [keyword, setKeyword] = React.useState('')
  const [Categories, setCategories] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  let url = '/api/categories/';


 
  Store.subscribe(() => {
    setFavNumber( Store.getState().favnumber )
    })
  
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
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#"  onClick={() => Store.dispatch({
                        type: 'PAGELOAD',   
                        page: <Homepage /> 
          }) }>Kezdőoldal</a>
        </li>
    
        
          {loading===false && Categories.map((item,index)=>{
        if(item.parent_id==0){
        return(
        <li className="nav-item dropdown" key={index}>
          <a className="nav-link nav-link dropdown-toggle" aria-current="page" href="#"   data-bs-toggle="dropdown" aria-expanded="false">{item.name}</a>
 
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {item.subcategories.map((sub, subindex)=>{
                  return <li key={subindex}><a className="dropdown-item" href={ '#category-'+sub.id } onClick={() => Store.dispatch({
                    type: 'PAGELOAD',   
                    page: <Category />,
                    id: sub.id 
      })}>{sub.name}</a></li>
              })}
            </ul>

        </li>
        )}
      })} 
        
            
        
        
            {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#" onClick={() => Store.dispatch({
                type: 'PAGELOAD',
                page: <Category id="5"></Category>,
                id:  5
              })}>Tesztkategória</a></li>
            <li><a className="dropdown-item" href="#">Sub 2</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sub 3</a></li>
          </ul> 
        </li>*/}

      <li className="nav-item">
                    <a className="nav-link" href="#contact" onClick={() => Store.dispatch({
                        type: 'PAGELOAD',   
                        page: <Contactpage></Contactpage>
          }) }>Kapcsolat</a>
          </li>
          
          <li>
          <span className="fa-layers fa-fw">
            <a href="#"><i className="fa fa-heart text-success fa-2x"></i></a>
              <span  className="favcounter">{favnumber}</span>
          </span>
          </li>

 
        </ul>
        
      <form action="#" className="d-flex" onSubmit="return false;">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => {
            setKeyword(e.target.value)
        }} />
          <button className="btn btn-outline-success" type="submit" onClick={() => {
             Store.dispatch({
              type:'SEARCH',
              keyword: keyword
            })
        } }>Search</button>
      </form>
    </div>
  </div></>;
}


 

export default Topmenu;

if (document.getElementById('topmenu')) {
  ReactDOM.render(<Topmenu />, document.getElementById('topmenu'));
}