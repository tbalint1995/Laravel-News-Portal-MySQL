import * as React from 'react'
import ReactDOM from 'react-dom';

export default function LeftBanner() {
    

    const [banners, setBanners] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    
    React.useEffect(() => {
      
      fetch('/api/banners/left').then(res => res.json()).then(res => {
        setBanners(res)
        setLoading(false)
      })
    
    
    }, [loading])


    return (<>
    
    {banners.length === 0 ? 'loading' : banners.map((item, index)=>{
      return <a href={item.url} target="_blank" title={item.title}  key ={index}><img src={item.file} style={ { width: '100%', margin: '10px 0px' } } alt={item.alt}/></a>
      }) }
    
    </>)

}

if (document.getElementById('left-banners'))
    ReactDOM.render(<LeftBanner />, document.getElementById('left-banners'))