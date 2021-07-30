import React, { useState } from 'react';
import axios from 'axios'

function AddImage(props) {
    const [imageData, setImage] = useState({
      title: "",
      description: "",
      image: null
    });

    const { title, description } = imageData;

    const handleImageChange = e => {
      setImage({ ...imageData, image: e.target.files[0]
      })
    };

    const onInputChange = e => {
      setImage({ ...imageData,[e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
      e.preventDefault();    
      let form_data = new FormData();
    form_data.append('image',imageData.image);
    form_data.append('title', imageData.title);
    form_data.append('description', imageData.description);
      await axios.post("https://mi-linux.wlv.ac.uk/~2017765/galleryApi/api/add-image", form_data, {
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
                    name="title"
                    value={title}
                    onChange={e => onInputChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Enter Image Description"
                    name="description"
                    value={description}
                    onChange={e => onInputChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    name="image"
                    id="image"
                    onChange={e => handleImageChange(e)}
                    required
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
  
  export default AddImage;