import * as React from 'react';
import ReactDOM from 'react-dom';
import Store from '../Store';
import { Formik } from 'formik';
import * as Yup from 'yup'


const ErrorMsg = (props) => {
  
  return (
    <>
      {
        props.type === 'error' &&   props.text.length > 0  ? <span className="text-danger text-italic">{props.text}</span> : ''
        }
    </>
 ) 
}

function Details() {
  const [article, setArticle] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [commented, setCommented]=React.useState(false)
  const [url, setUrl] = React.useState('/api/articles/' + Store.getState().id );

  

  

  React.useEffect(() => {

    fetch(url).then(res => res.json()).then(res => {
      setArticle(res.data);
      setLoading(false)
   
    })


  }, [loading, commented, url])



  return (<> {loading ? 'loading' : (

    <>
      <h2 className="mb-4">{article.title}   </h2>

      <img src={article.lead_image} style={{ width: '30%', margin: '0px 10px 10px 0px', float: 'left' }} />

      <p dangerouslySetInnerHTML={{ __html: article.description }} />

      <p className="mt-4 text-secondary">Látogatva: {article.visited} alkalommal</p>


      <div className="container">
        <div className="be-comment-block">
          <h1 className="comments-title">Kommentek </h1>


          <div className="be-comment">

            {article.comments.data.map((comment, index) => {
              return (
                <div className="be-comment-content" key={index} >

                  <span className="be-comment-name">
                    <a href={'mailto:' + comment.guest_email}>
                      {comment.guest_name}
                    </a>
                  </span>
                  <span className="be-comment-time">
                    <i className="fa fa-clock-o"></i>
                    {new Date(comment.created_at).toLocaleString()}
                  </span>

                  <p className="be-comment-text">
                    {comment.content}
                  </p>
                </div>
              )
            })}


          </div>
          <p className="text-center">  
          {article.comments.links.map((link, index) => {
            
            return <button dangerouslySetInnerHTML={{ __html: link.label }} onClick={() => {
              setUrl(link.url)
            }} style={{  background: link.active ? '#0d6efd': '#fff', color:link.active ? '#fff' : '#0d6efd' }} className="btn btn-outline-primary m-2 mybtn" key={index}/>

          })}
          </p>


          <h4 className="jumbotron-heading mt-5">Szólj hozzá Te is!</h4>

          {commented && <div class="alert alert-success">
            Sikeres kommentelés!
          </div>}

          <Formik initialValues={
            {
              guest_name: '',
              guest_email: '',
              content: ''
            }
          }
            /*
            validate={(values) => {
              const errors = {};

              if (!values.guest_name){
                errors.guest_name = 'A mező kitöltése kötelező!';
              }
              else if (values.guest_name.length < 10) {
                errors.guest_name = 'Kérem ellenőrízze a név bevitelét!';
              }

              if (!/^[a-z0-9._-]+@[a-z0-9]+\.[a-z]{2,3}$/i.test(values.guest_email)) {
                errors.guest_email = 'Kérem ellenőrízze az email bevitelét!';
              }

              if (values.content.length < 10) {
                errors.content = 'Kérem ellenőrízze a komment  bevitelét!';
              }
              
              return errors;
            
          }}
          */
            validationSchema={

              Yup.object({
                guest_name: Yup.string().min(2, 'minimum 2 karakter')
                  .max(30, 'Maximum 30 karakter')
                  .required('Kötelező!'),
                guest_email: Yup.string()
                  .email('Nem valid e-mail formátum')
                  .required('Kötelező!'),
                content: Yup.string()
                  .required('Kötelező!')
                  .min(10, 'minimum 10 karakter')
              })
            }
            
            onSubmit={(values, { resetForm, setSubmitting }) => {
              
              //küldés
              postData({ ...values, article_id: Store.getState().id }).then(res => res.json()).then(res => {
                
                setSubmitting(false);
                resetForm({ values: '' });
                setCommented(true)
                
                setTimeout(() => {
                  setCommented(false)
                },2000)

              });


          }}
          >

            {({
              errors,
              values,
              handleSubmit,
              handleChange,
              isSubmitting,
              getFieldProps

            })=>(
          <form onSubmit={handleSubmit}>   
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="form-group fl_icon">
                <div className="icon"><i className="fa fa-user"></i></div>

                      <input className="form-input" type="text" maxLength="30" min="3" placeholder="Neved"  id="guest_name" {...getFieldProps('guest_name')} disabled={isSubmitting} />

                      {errors.guest_name ? errors.guest_name : ''}

  

              </div>
            </div>
            <div className="col-xs-12 col-sm-6 fl_icon">
              <div className="form-group fl_icon">
                <div className="icon"><i className="fa fa-envelope-o"></i></div>
                      <input className="form-input" id="guest_email" type="email" placeholder="E-mail címed" {...getFieldProps('guest_email')} disabled={isSubmitting}  />
                      
                      {errors.guest_email ? errors.guest_email : ''}
             

              </div>
            </div>
            <div className="col-12 pl-3">
              <div className="form-group">
                <textarea className="form-input" id="content"
                  placeholder="Írd ide a hozzászólásod szövegét, maximum 300 karaker hosszúságban!" maxLength="300" {...getFieldProps('content')} disabled={isSubmitting} /> 
    {errors.content ? errors.content : ''}

              </div>

              <button disabled={isSubmitting}  className="btn btn-success text-white float-right" type="submit" >Beküldés <i
                className="fa fa-paper-plane"></i></button>
            </div>

          </div>
          </form>
        )}
          </Formik>


        </div>

      </div>


            
    </>

  )}

  </>);
}



async function postData(data) {
  const response = await fetch('/api/articles/comments/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response;
}


export default Details;