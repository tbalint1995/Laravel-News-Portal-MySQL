import * as React from 'react'
import ReactDOM from 'react-dom';

export default function TopBanner() {
    

    const [banners, setBanners] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    
    React.useEffect(() => {
      
      fetch('/api/banners/top').then(res => res.json()).then(res => {
        setBanners(res)
        setLoading(false)
      })
    
    
    }, [loading])


    return (<div className="row px-1">
    
    {banners.length === 0 ? 'loading' : banners.map((item, index)=>{
      return <div className="col-4 my-1" style={{ border: '2px solid #ffffff50', boxSizing: 'border-box', display: 'flex',
      alignItems: 'center' }} key ={index}><a href={item.url} target="_blank" title={item.title}><img src={item.file} style={ { width: '100%', margin: '10px 0px' } } alt={item.alt}/></a></div>
      }) }
    
    </div>)

}

if (document.getElementById('top-banners'))
    ReactDOM.render(<TopBanner />, document.getElementById('top-banners'))