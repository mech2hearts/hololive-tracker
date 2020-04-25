import React, { Component } from 'react';
import axios from 'axios';
import './upcoming.css';

class Upcoming extends Component {

    constructor(props){
        super(props)
        this.state = {
            videos: []
        }
    }

    componentDidMount(){
        axios.get('/upcoming')
        .then(res => {
            this.setState({
                videos: res.data
            })
        })
    }

    

    render(){
    var gettem = this.state.videos.map(id => 
        <div key={id.videoId} className="grid-item">
            
            <a href={"https://youtube.com/watch?v="+id.videoId} target="_blank">
                <img className="img" src={id.thumbnail} alt={id.videoId} />
            </a>
            <p>{id.title}</p>
        </div>
        )
        return(
            <div className="container">
            <h3>Upcoming Hololive Streams</h3>
            <div className="grid-container">
                {gettem}
            </div>
            
            <button onClick={()=>{console.log(this.state.videos)}}>Click</button>
            
        </div>
        )
    }
}

export default Upcoming;