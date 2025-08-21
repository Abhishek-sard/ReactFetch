let dayOfWeek = new Date().getDay();
let message;

switch(dayOfWeek){
    case 0:
        message = "Sunday";
        break;
    case 1:
        message = "Monday";
        break;
    case 2:
        message = "Tuesday";
        break;
    case 3:
        message = "Wednesday";
        break;
    case 4:
        message = "Thursday";
        break;
    case 5:
        message = "Friday";
        break;
    case 6:
        message = "Saturday";
        break;
    default:
        message = "Unknown";
}
console.log(`Today is: ${message}`);