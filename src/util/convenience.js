import moment from "moment";


function bytesToSize(bytes) {
    if (bytes === 0)
        return '0 B';
    let k = 1024;
    const sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    let num = bytes / Math.pow(k, i);
    return num.toPrecision(3) + ' ' + sizes[i];
}

function formatSongDuration(duration) {
    let moments = moment.duration(duration);
    let result = "";
    if(moments.minutes()<10){
        result += "0" + moments.minutes();
    }
    else {
        result += moments.minutes()
    }
    if(moments.seconds() < 10){
        result += ":0" + moments.seconds()
    }
    else
        result += ":"+moments.seconds();

    return result;
}


function calcSecond(time) {
    let array = time.split(":");
    let minute = parseInt(array[0]);
    let second = parseInt(array[1]);
    return minute * 60 + second;
}
function createPicURL(src,x,y) {
    return `${src}?param=${x}y${y}`;
}
export {
    bytesToSize,
    formatSongDuration,
    calcSecond,
}
