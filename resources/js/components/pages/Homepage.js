 
import * as React from 'react';
import ReactDOM from 'react-dom';
import HomepageListbox from '../pages/template_parts/HomepageListbox'
 

 

function Homepage() {
 
  const [state, setState]=React.useState({list: [], loading: true})

  React.useEffect(() => { 
    fetch('/api/articles').then(res => res.json()).then(res=> {
      setState({...state, loading: false, list: res.data})
    })
  }, [state.loading])
  
  return (<><div className="row  mb-4">
  
    { state.loading === false && state.list.map((item, index) => {
      return <HomepageListbox item={item} key={index} />
    }) }
 
</div>
  </>       );
}


 

export default Homepage;

 