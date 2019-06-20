import React from "react";

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(
                (response) => response.json() 
            )
            .then(
                (response) => {
                    const {memes} = response.data
                    this.setState({
                        allMemeImgs: memes
                    })
                }
            )
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randInd = Math.floor(Math.random() * Math.floor(this.state.allMemeImgs.length));
        const randUrl = this.state.allMemeImgs[randInd].url
        this.setState({
            randImage: randUrl
        })
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="topText" value={this.state.topText} onChange={this.handleChange} placeholder="Top Text here"/>
                    <br/>
                    <input type="text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange} placeholder="Bottom Text here"/>
                    <br/>
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randImage} height="500"  alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;