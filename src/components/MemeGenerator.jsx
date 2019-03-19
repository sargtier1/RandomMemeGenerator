import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick .bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(res => {
        const { memes } = res.data;
        this.setState({
          allMemeImgs: memes
        });
      });
  }

  handleOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleOnClick(event) {
    event.preventDefault()
    const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randomMeme = this.state.allMemeImgs[randomNum].url
    this.setState({
        randomImg: randomMeme
    })
  }

  render() {
    return (
      <div>
        <form className="meme-form" onClick={this.handleOnClick}>
          <input
            placeholder="Enter Top Text Here"
            type="text"
            value={this.state.topText}
            name="topText"
            onChange={this.handleOnChange}
          />
          <input
            placeholder="Enter Bottom Text Here"
            type="text"
            value={this.state.bottomText}
            name="bottomText"
            onChange={this.handleOnChange}
          />
          <button>Create</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h5 className="top">{this.state.topText}</h5>
          <h5 className="bottom">{this.state.bottomText}</h5>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
