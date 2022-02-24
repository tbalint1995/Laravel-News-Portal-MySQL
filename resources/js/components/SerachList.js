import * as  React from 'react';
import Store from './Store';
import ReactDOM from 'react-dom';


export default function SearchList(props) {

        const [list, setList] = React.useState([]);
        const [load, setLoad] = React.useState(true);
        const [url, setUrl] = React.useState('/api/search/' + '?keyword=' + Store.getState().keyword);


        Store.subscribe(()=>{
                setUrl('/api/search/' + '?keyword=' + Store.getState().keyword)
        })


        React.useEffect(() => {
                fetch( url ).then(res => res.json()).then(res => {
                        console.log(res);
                        setList(res);
                        setLoad(false)
                         
                })

        }, [load, url,  props.id])


        return (<>{load ? 'Loading' : ( list.data.length === 0 ? 'Nincs adat' :  list.data.map((item, index) => {
                return (<>
                        <div className="col-12" key={index}>
                                <div className="row box-shadow shadow p-3 mb-5 bg-body rounded">
                                        <div className="col-4" >
                                                <img src={item.image} className="img-fluid float-start" />
                                        </div>

                                        <div className="col-8">
                                                <h4 className="text-truncate"></h4>
                                                <div className="card-text" style={{ height: 'auto' }} dangerouslySetInnerHTML={{ __html: item.description.substr(0, 300) + '...' }}></div>
                                                <div className="d-flex justify-content-between align-items-center  mt-4">
                                                        <small className="text-muted">keletkezett: {new Date(item.created_at).toLocaleString()}
                                                                <p>frissítve: {new Date(item.updated_at).toLocaleDateString()}</p>
                                                                <p>Látogatva volt: {item.visited} alkalomal</p>
                                                        </small>
                                                        <div className="btn-group">
                                                                <a role="button" href={'/articles/' + item.id} className="btn btn-sm btn-outline-info mybtn text-black">Tovább olvasom 	 </a>

                                                        </div>

                                                </div>
                                        </div>
                                </div>
                        </div>

                </>)

        }))}
                <p className="text-center">
                        {load === false && list.data.length> 0 && list.meta.links.map((item,index) => {
                                return (<>
                                        <button onClick={() => {
                                                setUrl(item.url)
                                        }} key={index} style={{  background: item.active ? '#0d6efd': '#fff', color:item.active ? '#fff' : '#0d6efd' }} className="btn btn-outline-primary m-2 mybtn" dangerouslySetInnerHTML={{ __html: item.label }}></button>
                                </>)
                        })}

                </p>
        </>)
}
