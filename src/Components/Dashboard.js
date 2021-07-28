import React, { useState } from 'react';
import axios from 'axios'
import { getUser, removeUserSession } from '../Utils/Common';

function Dashboard(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

    const [imageData, setUser] = useState({
      image_title: "",
      image_description: "",
      image: null
    });

    const { image_title, image_description } = imageData;

    const handleImageChange = e => {
      setUser({ ...imageData, image: e.target.files[0]
      })
    };

    const onInputChange = e => {
      setUser({ ...imageData,[e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
      e.preventDefault();    
      let form_data = new FormData();
    form_data.append('image',imageData.image);
    form_data.append('image_title', imageData.image_title);
    form_data.append('image_description', imageData.image_description);
    console.log('kaskas',form_data);
      await axios.post("http://localhost:8080/UK/imageApp/api/add-image", form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res.data);
        props.history.push('/');
      })
      .catch(err => console.log(err));
      // alert('Data Inserted');
      // history.push("/");
    };
  
    return (
      <div className="wrapper">
      <h1 className="title">Welcome {user.first_name+' '+user.last_name}</h1>
        <a href="#" onClick={handleLogout}>Logout </a>
        <div className="container bg-light">
          <div class="row">
            <div className="col-sm-4 mx-auto shadow p-5">
              <h2 className="text-center mb-4">Add Image</h2>
              <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Image Title"
                    name="image_title"
                    value={image_title}
                    onChange={e => onInputChange(e)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Enter Image Description"
                    name="image_description"
                    value={image_description}
                    onChange={e => onInputChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    name="image"
                    id="image"
                    onChange={e => handleImageChange(e)}
                  />
                </div>
                <input type="submit" className="btn btn-primary btn-block" value='Add Image' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;