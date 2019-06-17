console.log('Carreguei o Main');

const apiUrl = "localhost:3000"
const optionsOne = $(".step-one .option");
const optionsTwo = $(".step-two .option");
if (optionsOne.lenght !== 0) optionsOne.click(selectOptionStart);

$(document).ready(function(){

    if ($("#tv").length !== 0) getPswrds();
});