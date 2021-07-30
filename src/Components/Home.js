import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { getUser, removeUserSession } from '../Utils/Common';

function Home(props) {
  const [loadimage, setImage] = useState([]);
  const [keyword, setKeyword] = useState("");
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  useEffect(() => {
    loadImages();
  }, []);



  const loadImages = async () => {
    const result = await axios.get("https://mi-linux.wlv.ac.uk/~2017765/galleryApi/api/image-list");
    setImage(result.data.reverse());
  };

  const deleteImage = id => {
    if (window.confirm("Are you sure want to delete?")) {
      axios.get('https://mi-linux.wlv.ac.uk/~2017765/galleryApi/api/image-delete/' + id, {
        method: 'GET'
      }).then(response => {
        if (response.status === 200) {
          alert("Image deleted successfully");
          axios.get('https://mi-linux.wlv.ac.uk/~2017765/galleryApi/api/image-list')
            .then(res => {
              setImage(res.data.reverse());
            });
        }
      });
    }
  }
  return (
    <div className="wrapper">
      <div className="header-sec">
        <div className="title">
          <h1>Welcome {user.first_name + ' ' + user.last_name}</h1>
        </div>
        <div className="btn">
          <a href="#" onClick={handleLogout} className="delete-btn">Logout </a>
        </div>
        <div className="search-sec">
          <input type="text" className="search-input" id="search" placeholder="Image Search Keyword" onChange={(e) => { setKeyword(e.target.value) }} />
        </div>
      </div>
      <hr />
      <div className="body-sec">
        <h1 className="title">Image Gallery</h1>
        <div className="masonry bordered">
          {loadimage.filter((val) => {
            if (keyword == "") {
              return val;
            } else if (val.title.toLowerCase().includes(keyword.toLowerCase())) {
              return val;
            }
          }).map((item) => (
            <div className="brick">
              <img src={"https://mi-linux.wlv.ac.uk/~2017765/galleryApi/uploads/images/" + item.image} alt={item.title} title={item.title} /><br />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link to={`/edit-image/${item.id}`} className="edit-btn">Edit</Link>
              <a href="#" onClick={e => deleteImage(item.id)} className="delete-btn">Delete</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;