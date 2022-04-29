const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //Sounds

    const sounds = document.querySelectorAll(".sound-picker button");
    //Time Display
    const TimeDisplay = document.querySelector(".time-display");
    //Get the length of the outline
    const outLineLength = outline.getTotalLength();
    console.log(outLineLength);
    //Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outLineLength;
    outline.style.strokeDashoffset = outLineLength;

    //play sound
    play.addEventListener("click", ()=>{
        checkPlaying(song);
    })
    
    //create a function to stop/play

const checkPlaying = song => {
    if(song.paused){
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
    }else{
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
    }
}

// to animate circle
song.ontimeupdate = ()=> {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // To Animate the bar
    let progress = outLineLength - (currentTime / fakeDuration) * outLineLength;
    outline.style.strokeDashoffset = progress
    //animate the text
    TimeDisplay.textContent = `${minutes}:${seconds}`;
}
}

app();
