function currentTime(): string {
    let date = new Date();
    let hh: number | string = date.getHours();
    let mm: number | string = date.getMinutes();
    let ss: number | string = date.getSeconds();

    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;

    let time: string = hh + ":" + mm + ":" + ss;
    return time;
}

export default currentTime();
