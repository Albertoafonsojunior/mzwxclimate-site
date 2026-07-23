


/*
=============================================================
MZ WX & Climate
Astronomy Library

NOAA Solar Calculator
Calcula nascer e pôr do Sol para qualquer data.

Autor:
Alberto Afonso Júnior
=============================================================
*/

function dayOfYear(year, month, day){

    const d = new Date(year, month-1, day);

    const start = new Date(year,0,0);

    return Math.floor(
        (d-start)/86400000
    );

}



function equationOfTime(n){

    const gamma =
        2*Math.PI*(n-1)/365;

    return 229.18*(
        0.000075
        +0.001868*Math.cos(gamma)
        -0.032077*Math.sin(gamma)
        -0.014615*Math.cos(2*gamma)
        -0.040849*Math.sin(2*gamma)
    );

}



function solarDeclination(n){

    const gamma =
        2*Math.PI*(n-1)/365;

    return (
        0.006918
        -0.399912*Math.cos(gamma)
        +0.070257*Math.sin(gamma)
        -0.006758*Math.cos(2*gamma)
        +0.000907*Math.sin(2*gamma)
        -0.002697*Math.cos(3*gamma)
        +0.00148*Math.sin(3*gamma)
    );

}



function decimalToTime(decimalHours){

    decimalHours =
        (decimalHours+24)%24;

    let h =
        Math.floor(decimalHours);

    let m =
        Math.round(
            (decimalHours-h)*60
        );

    if(m==60){

        h++;

        m=0;

    }

    h=h%24;

    return (
        String(h).padStart(2,"0")
        +":"
        +
        String(m).padStart(2,"0")
    );

}



function calculateDayLength(sunrise,sunset){

    const s1 =
        sunrise.split(":");

    const s2 =
        sunset.split(":");

    const t1 =
        parseInt(s1[0])*60+
        parseInt(s1[1]);

    const t2 =
        parseInt(s2[0])*60+
        parseInt(s2[1]);

    let diff =
        t2-t1;

    if(diff<0){

        diff+=1440;

    }

    const h =
        Math.floor(diff/60);

    const m =
        diff%60;

    return (
        String(h).padStart(2,"0")
        +":"
        +
        String(m).padStart(2,"0")
    );

}



function calculateSunTimes(
    latitude,
    longitude,
    year,
    month,
    day
){

    const n =
        dayOfYear(
            year,
            month,
            day
        );

    const eqTime =
        equationOfTime(n);

    const decl =
        solarDeclination(n);

    const lat =
        latitude*Math.PI/180;

    const zenith =
        90.833*Math.PI/180;

    let cosH =

        (

            Math.cos(zenith)

            -

            Math.sin(lat)
            *
            Math.sin(decl)

        )

        /

        (

            Math.cos(lat)
            *
            Math.cos(decl)

        );


    cosH =
        Math.max(
            -1,
            Math.min(
                1,
                cosH
            )
        );


    const H =
        Math.acos(cosH)
        *180/Math.PI;


    const centralMeridian =
        30.0;


    const solarOffset =

        eqTime

        +

        4*(
            longitude
            -
            centralMeridian
        );


    const solarNoon =

        12

        -

        solarOffset/60;


    const sunrise =
        solarNoon
        -
        H/15;


    const sunset =
        solarNoon
        +
        H/15;


    return{

        sunrise:
            decimalToTime(
                sunrise
            ),

        sunset:
            decimalToTime(
                sunset
            ),

        day_length:
            calculateDayLength(
                decimalToTime(sunrise),
                decimalToTime(sunset)
            )

    };

}



