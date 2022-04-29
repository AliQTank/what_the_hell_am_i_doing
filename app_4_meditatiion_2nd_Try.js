const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //Sounds

    const sounds = document.querySelectorAll(".sound-picker button");
    //Time Display
    const TimeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
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


    //Select sound
    timeSelect.forEach(Option =>{
        Option.addEventListener("click", function()  {
            fakeDuration = this.getAttribute("data-time");
            TimeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        })
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
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // To Animate the bar
    let progress = outLineLength - (currentTime / fakeDuration) * outLineLength;
    outline.style.strokeDashoffset = progress
    //animate the text
    TimeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= fakeDuration){
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
    }
}
}

app();
