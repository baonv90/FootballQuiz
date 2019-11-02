function QuizList(data) {
   
   var dat = [];
   var length = data.length ;
   
   console.log(data);
   for(var i = 0 ; i < length - 1 ; i++)
   {
        var rand = randomNum(length - i - 1);
        var id = data[rand];
        data.splice(rand,1);
        var sub_id = randomArray(data);
        var quiz = new Quiz(id, sub_id, randomNum(2));
        dat.push(quiz);
        quiz = null ;
   }
   return dat;
};

var Quiz = function(id, sub_id, pos){
    this.id = id ;
    this.sub_id = sub_id ;
    this.pos = pos ;
}
    Quiz.prototype.getId = function(){
        return this.id ;
    }
    Quiz.prototype.getSubId = function(){
        return this.sub_id ;
    }
    Quiz.prototype.getPos = function(){
        return this.pos;
    }
    Quiz.prototype.setUp = function(){

        var ID = this.getId().replace("_", " ");
        var SubID = this.getSubId().replace("_", " ");
        if(this.getPos()==0)
        {
            return [ID,SubID];
        }
        else
        {
            return [SubID,ID];
        }
    }   


// var reponse = function(data){
//     var sub_id = [];
//     var dat_temp = data; 
//     for(var i = 0 ; i <=2 ; i++)
//     {
//         sub_id[i] = $.rand(dat_temp.length);
//         dat_temp = dat_temp.splice(sub_id[i] , 1);
//     }
//     return sub_id;
// }

function randomNum(length){
    return Math.floor((Math.random() * length));
}
function randomArray(array){
    var rand = randomNum(array.length);
    return array[rand];
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
//    console.log(array);
    return array;
}
