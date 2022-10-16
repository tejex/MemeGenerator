import React from 'react'

export default function Meme(){
    const [meme,setMeme] = React.useState({
      topText:"",
      bottomText:"",
      randomImage:"http://i.imgflip.com/1bij.jpg"
    })

    const [allMemeImages,setAllMemeImages] = React.useState([])

    React.useEffect(()=>{
      fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImages(data.data.memes))
    },[])

    function GetMemeImage(){
      const memeArray = allMemeImages;
      const randomNumber = Math.floor(Math.random()*memeArray.length-1)-1;
      const url = memeArray[randomNumber].url;
      setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: url
      }));
    }


    function makeMeme(event){
      const {name,value} = event.target

      setMeme(oldMeme => {
        return{
          ...oldMeme,
          [name]:value
        }
      })
    }

  return (
    <main >
      <div className="makeMeme">
        <input
         placeholder="Top Text"
         className="form--input"
         name="topText"
         value={meme.topText}
         onChange = {makeMeme}/>
        <input
        placeholder="Bottom Text"
        className="form--input"
        name="bottomText"
        value={meme.bottomText}
        onChange = {makeMeme}/>
        <button className="generator" onClick={GetMemeImage} type='button'>Get a new meme image  🖼</button>
      </div>
      <div className="meme">
      <img src ={meme.randomImage} className="meme--image"></img>
      <h2 className="meme--text top">{meme.topText}</h2>
      <h2 className="meme--text bottom">{meme.bottomText}</h2>
       </div>
    </main>
  )
}
