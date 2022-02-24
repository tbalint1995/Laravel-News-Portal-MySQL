import Store from "../../Store"
import Details from '../Details'

export default function HomepageListbox(props) {
    return (
    <div className="col-sm-6 my-2">
    <div className="card">
      <div className="card-body">
                    <h5 className="card-title">{props.item.title}</h5>
                    
                    <div className="row mb-2" >
                        <div className="col-3 listimage">
                            <div style={{ backgroundImage: 'url(https://static3.depositphotos.com/1005951/212/i/600/depositphotos_2120235-stock-photo-husky-portrait.jpg)', backgroundSize:'cover', backgroundPosition: 'center', height: '70px' }}></div>
                        </div>
                        <div className="col-9">
                        <p className="card-text" dangerouslySetInnerHTML={{ __html: props.item.description.substr(0,300)+'...' }}/>
                        </div>
                    </div>
            <div className="text-end">
            <button onClick={() => addFav(props.item.id) }><i className="fa fa-heart text-success"></i></button>      
              <a href={"#article-"+props.item.id} className="btn btn-primary " onClick={() => {
                          Store.dispatch({
                            type: 'DETAILED',
                            page: <Details />,
                            id: props.item.id
                          })
                        }}>Részletek</a>
        </div>                            
      </div>
    </div>
  </div>
    )
}


function addFav(id) {

  let curr_favs = localStorage.getItem('favorites')=== null ? [] : JSON.parse(localStorage.getItem('favorites'));
 



  if (typeof found !== 'undefined' ) {
  try{
    curr_favs.splice(curr_favs[indexOf(id)], 1)
  }catch(e){}
  }

  curr_favs.push( id );
  
  var unique  = curr_favs.filter(function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  })
  

  localStorage.setItem('favorites', JSON.stringify(unique));
 
  Store.dispatch({
    type: 'ADDFAVORITE',
    data: curr_favs
  })

/*
  fetch('/api/addfav', {
    method: 'post',
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({
        id: id
    })
  }).then(res => res.json()).then(res => {

    console.log('------------------------')
    console.log(res)
    console.log('----------------------------')

    Store.dispatch({
      type: 'ADDFAVORITE',
      data: res
    })
  })
  */
}