 
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Formik} from 'formik';
 

 


async function sendData(data) {
  const result = await fetch('/api/contact', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return result;
}

 

function Contactpage() {
  const [success, setSuccess]=React.useState('')

  return (<>
    
    { success && <div className="alert alert-success">{ success }</div> } 
    
    <h2 className="text-center my-3 mt-2">
    Kapcsolat
  </h2>

 
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      }}

      
      
      validate={(values) => {
        const errors = {}

            if (!values.firstName) {
              errors.firstName = 'Kötelező!';
            } else if (values.firstName.length > 30) {
              errors.firstName = 'Maximum 30 karakter!';
            }

            if (!values.lastName) {
              errors.lastName = 'Kötelező!';
            } else if (values.lastName.length > 30) {
              errors.lastName = 'Maximum 30 karakter!';
            }

            if (!/^[a-z0-9._-]+@[a-z0-9]+\.[a-z]{2,3}$/i.test(values.email)) {
              errors.email = 'Érvénytelen formátum!';
            }

            if (!/^[0-9]{9,12}$/i.test(values.phone)) {
              errors.phone = 'Csak számokat tartalmazhat, minimum 8 maximum 12 karakter lehet!';
            }

            if (!values.message) {
              errors.message = 'Kötelező!';
            } else if (values.message.length > 600) {
              errors.message = 'Maximum 600 karakter!';
            }

            return errors;
    }}
  
      
      
      onSubmit={(values, { setSubmitting, resetForm }) => {
 
        
        sendData(values).then(res => res.json()).then(res => {
        
          if (typeof res.success !== 'undefined') {
   
            setSuccess(res.success.message)

            setSubmitting(false);
            resetForm({values: ''})

            }
  
        }
        );


      }}
    >

  {({
    errors,
    values,
    handleChange,
    handleSubmit,
    isSubmitting
   })=>(  

       
  <div className="row"><div class="col-12 col-md-9 col-lg-7 mx-auto">   
  <form  onSubmit={ handleSubmit }>
  <div className="row  my-1">  
      <div className="col-12 col-md-6">
        <label>Vezetéknév:</label>
                <input type="text" className="form-control" id="firstName" onChange={handleChange} value={values.firstName} disabled={isSubmitting} />
                
                { errors.firstName ?  errors.firstName : '' }
 
 
      </div>

      <div className="col-12 col-md-6">
        <label>Keresztnév:</label>
            <input type="text" className="form-control" id="lastName"   onChange={handleChange} value={values.lastName}  disabled={isSubmitting} />
            { errors.lastName ?  errors.lastName : '' }
 
      </div>
  </div>    
 
  <div className="row my-1">  
      <div className="col-12 col-md-6">
        <label>E-mail:</label>
            <input type="text" className="form-control" id="email"  onChange={handleChange} value={values.email}   disabled={isSubmitting} />
            { errors.email ?  errors.email : '' }
          
      </div>

      <div className="col-12 col-md-6">
        <label>Telefonszám:</label>
          <input type="text" className="form-control"  id="phone"   onChange={handleChange} value={values.phone}    disabled={isSubmitting}/>
          { errors.phone ?  errors.phone : '' }
      </div>
  </div>       


  <div className="row  my-1">  
      <div className="col-12 ">
        <label>Üzenete:</label>
            <textarea className="form-control" id="message"  onChange={handleChange} value={values.message}   disabled={isSubmitting} />
    
            { errors.message ?  errors.message : '' }
      </div>

    </div>
    
    <div className="row mt-4">  
      <div className="col-12 text-center">
          <button className="btn btn-success"  disabled={isSubmitting}>Küldés</button>
      </div>
        </div>
        
        </form>
  
    </div>
  
        </div>
        
        )} 

      </Formik>   

  </>);
}


 

export default Contactpage;

 

 