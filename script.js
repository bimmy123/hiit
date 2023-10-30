let highDuration;
let set;
let lowDuration;
let warmDuration;
let totalTime;
let totalTimeMinutes;
let elapasedDuration = 0;
let current = 1;
let finalTime;



function createFunction () {

document.getElementById("header").style.display = "none";
document.getElementById("footer").style.display = "grid";
    createTimer();


   

}



function createTimer() {

    highDuration = document.getElementById("duration").value;
    set = document.getElementById("Sets").value;
    lowDuration = document.getElementById("duration1").value;
    warmDuration1 = document.getElementById("duration2").value;

    totalTime  = (set * highDuration) + ((set * lowDuration) - lowDuration) + (warmDuration1 * 2)

    elapasedDuration = 0;
    current = 1;
    set = (set * 2) + 1;
    document.getElementById('remaining').innerHTML = totalTime;
    document.getElementById('elapased').innerHTML = elapasedDuration;
    document.getElementById('round').innerHTML = current + "/" + set;
    document.getElementById('time').innerHTML = warmDuration1;


    warmDuration = warmDuration1;
   remainingTime = totalTime;
   finalTime = totalTime;


}

function updateTimerRemaining () {


    
    remainingTime--;
    document.getElementById('remaining').innerHTML = remainingTime;
    
    if (remainingTime <= 0) {
        clearInterval(intervalIdRemaining);
        // Add any actions you want to perform when the timer finishes here.
    }



    


}
function updateTimerTime() {
    if (current == 1) {
        // Initial warm-up time
        warmDuration--;
        document.getElementById('time').innerHTML = warmDuration;
        
        if (warmDuration <= 0) {
            clearInterval(intervalIdTime);
            current++;
            document.getElementById('round').innerHTML = current + "/" + set;
            highDuration = document.getElementById("duration").value;
            intervalIdTime = setInterval(updateTimerTime, 1000);
        }
    } else if (current <= set * 2 && current != set) {
        if (current % 2 == 0) {
            // Low intensity
            warmDuration = warmDuration1;
            lowDuration--;
            document.getElementById('time').innerHTML = lowDuration;
            
            if (lowDuration <= 0) {
                clearInterval(intervalIdTime);
                current++;
                document.getElementById('round').innerHTML = current + "/" + set;
                // Start the next interval (high duration) if the current round is not the final round
                if (current <= set * 2) {
                    highDuration = document.getElementById("duration").value;
                    intervalIdTime = setInterval(updateTimerTime, 1000);
                }
            }
        } else {
            // High intensity
            highDuration--;
            document.getElementById('time').innerHTML = highDuration;
            
            if (highDuration <= 0) {
                clearInterval(intervalIdTime);
                current++;
                document.getElementById('round').innerHTML = current + "/" + set;
                // Start the next interval (low duration) if the current round is not the final round
                if (current <= set * 2) {
                    lowDuration = document.getElementById("duration1").value;
                    intervalIdTime = setInterval(updateTimerTime, 1000);
                }
            }
        }
    } else {
        // Final warm-up time
        warmDuration--;

        
        document.getElementById('time').innerHTML = warmDuration;
        if (warmDuration <= 0) {
            clearInterval(intervalIdTime);
            restartFunction();
        }
    }
}


function updateTimerElasped () {
    

    
    elapasedDuration++;
    document.getElementById('elapased').innerHTML = elapasedDuration;
    if (elapasedDuration >= finalTime) {
        clearInterval(intervalIdElapased);
        
            
            
        restartFunction();
        
        // Add any actions you want to perform when the timer finishes here.
    }



    


}




function startFunction() {
    document.getElementById("Start").style.display = "none";
    document.getElementById("Pause").style.display = "inline";
    intervalIdRemaining = setInterval(updateTimerRemaining, 1000);
    intervalIdTime = setInterval(updateTimerTime, 1000);
    intervalIdElapased = setInterval(updateTimerElasped, 1000);
}


let x =0;
function pauseFunction() {

    if (x == 0) {
        clearInterval(intervalIdElapased);
        clearInterval(intervalIdTime);
        clearInterval(intervalIdRemaining);
        x = 1;
        document.getElementById("Pause").value = "Unpause";
    } else {
        intervalIdRemaining = setInterval(updateTimerRemaining, 1000);
        intervalIdTime = setInterval(updateTimerTime, 1000);
        intervalIdElapased = setInterval(updateTimerElasped, 1000);
        document.getElementById("Pause").value = "Pause";
        x = 0;
    }
}


function restartFunction() {

    location.reload();
    pauseFunction();
    createTimer();

}

