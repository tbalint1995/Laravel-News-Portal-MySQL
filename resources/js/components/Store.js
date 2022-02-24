import { createStore } from "redux";
import Contactpage from "./pages/Contactpage";
import Homepage from "./pages/Homepage";
import Category from './pages/Category';
import SearchList from "./SerachList";
import Details from './pages/Details'


function reducer(state, action) {
    switch (action.type) {
        
        case 'PAGELOAD':
                return { ...state, page: action.page, id: action.id  }
            break;
        
        case 'ADDFAVORITE':
              
                return { ...state, favnumber:  typeof action.data !== 'undefined'  ?action.data.length : 0  }
            break;
        

        case 'SEARCH':
            return { ...state, keyword: action.keyword, page: <SearchList /> }
            break;        
        
        case 'DETAILED':
            return { ...state,   page: action.page, id:  action.id  }
            break;
        
        default:
                return state;
            break;
    }
}

 
function assocPage(url) {
    url = url.replace('#', '')
 
    switch (true) {
        case url == 'contact':
                return [<Contactpage />, 0]
            break;
       
            case  /^category-([0-9])$/i.test( url ):          
                    return [<Category />, url.split('-')[1]  ]
            break;

            case  /^article-([0-9])$/i.test( url ):          
                    return [<Details />, url.split('-')[1]  ]
            break;        

        
            default:
                return [<Homepage />, 0]
            break;
    }
}

const page = assocPage(window.location.hash);

const Store = createStore(reducer, { keyword: '', page: page[0] , id: page[1], favnumber: 0 });

Store.subscribe(() => {
    console.log(Store.getState())
})



export default Store;