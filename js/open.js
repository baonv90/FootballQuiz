var width = window.innerWidth,
    height = window.innerHeight;
var size = 150 , size_clicked = 200;
var reponsecell_width = width/3,
    reponsecell_height = 60;
var image_size = height/3 ;
var csv_data = [];
var response_button = [] ;


function OpenDiv(id, width, height, backgroundColor)
{
    this.id = id;
    this.width = width;
    this.height = height ;
    this.backgroundColor = backgroundColor ;

    this.getId = function(){
       return $('#'+this.id);
    }
    this.init = function()
    {
        this.getId().css({backgroundColor : this.backgroundColor , width : this.width, height : this.height});
    }

    this.addElement = function(s){
        this.getId().prepend(s);
    }

}
function img_element(id, src , width, height, marginTop, marginLeft)
{
    this.id = id;
    this.src = src ;
    this.width = width;
    this.height = height ;
    this.marginTop = marginTop;
    this.marginLeft = marginLeft;

    this.style_img = function(){
        this.getId().css({position: "absolute" , width : this.width, height : this.height, marginTop: this.marginTop, marginLeft : this.marginLeft});
    }
    this.getId = function(){
       return $('#'+this.id);
    }
    this.getHtmlString = function(){
        return '<img class="image" ' +'id = "'+ this.id + '" src="' + this.src +'" />';
    }
    this.fadeIn = function(time){
        this.getId().fadeIn(time);
    }
    this.animate = function(new_position, time, callback){
        this.getId().animate(new_position, time, callback);
    }
} 

function response(id, text)
{
    this.id = id;
    this.text = text

    this.style_response = function( width, height, marginTop, marginLeft){
        this.getId().css({ width : width, height : height, marginTop: marginTop, marginLeft : marginLeft});
    }
    this.getId = function(){
       return $('#'+this.id);
    }
    this.getHtmlString = function(){
        return '<paper-button id = "'+ this.id + '" toggles raised class="custom green">' + this.text + '</paper-button>';
    }
} 






function Opening(callback) 
{

    opendiv = new OpenDiv('opendiv', width , height, '#2B7BE3'); 
    opendiv.init();

    var main_image = new img_element('main_image', "img/play.png", image_size, image_size, height/2 - image_size/2, width/2 - image_size/2);
    opendiv.addElement(main_image.getHtmlString());
    opendiv.addElement('<img class="image" id = "playbutton" src= "img/play.png" />');
    main_image.style_img();

    var play_button = new img_element('playbutton', "img/play.png", size, size, height/2 - size/2, width/2 - size/2);
    play_button.style_img();

    main_image.getId().on("click", function(){
        main_image.animate({marginTop:height/4 - image_size/2} , 600 , play_button.fadeIn(500)); 

    });
    play_button.getId().on("click", function(e){
        play_button.getId().animate({width:size_clicked , height: size_clicked, marginTop:height/2 - size_clicked/2, marginLeft : width/2 - size_clicked/2}).fadeOut(700, function(){
              $( ".image" ).remove();
              opendiv.getId().fadeOut(200).css({backgroundColor : '#2B7BE3'}).fadeIn(500, function(){
                callback();
              });
             

        });
    });

}
function Questions()
{
 var count = 0 ;
 var Reponses = [csv_data[count].Reponse1 ,csv_data[count].Reponse2 ,csv_data[count].Reponse3 ,csv_data[count].Reponse4 , csv_data[count].Answer ];    
 opendiv.addElement(
    '<paper-toolbar>' +
    '<paper-icon-button icon="menu"></paper-icon-button>'+
    '<h1 class="title">LEVEL 1</h1>'+
    '<paper-icon-button id = "show_card" icon="help"></paper-icon-button>'+
    '</paper-toolbar>'
    );
  
    // $('#opendiv').prepend('<span id = "question_text">' + csv_data[count].Text); 
    // var text_width = $('#question_text').width();
    // $('#question_text').css({position: "absolute" , marginTop:height/3 + image_size/2 + 10, marginLeft : width/2 - text_width/2});   
  
    for (i = 0; i <= 3 ; i++)
    {

        response_button[i] = new response("Result" + i, Reponses[i]); 
        opendiv.addElement(response_button[i].getHtmlString());
        response_button[i].style_response(reponsecell_width, reponsecell_height - 10, function(){
            return i%2 == 0 ? (2*height/3) : (2*height/3 + reponsecell_height) ;
        }(), function(){
            return i<2 ? (width/8) : (13*width/24);
        }());       

        response_button[i].getId().on("click", function(e){
            console.log(e.target.id);
        })
    }

    $('#opendiv').prepend(
    '<paper-card id="help_card">' +
        '<div class="card-actions">'+
             '<paper-button>50/50</paper-button>'+
             '<paper-button>Change Question</paper-button>'+
             '<paper-button>Ask Audience</paper-button>'+
        '</div>'+
    '</paper-card>'
    );
    $('#help_card').css({ width : 400 ,marginTop:height , marginLeft : width/2 - 200});
    var card_showed = false;
    $('#show_card').on("click", function(){
        if(!card_showed)
        {
            $('#help_card').animate({ marginTop:height - 60} , 500);
            card_showed = true;
        }
        else
        {
            $('#help_card').animate({ marginTop:height} , 500); 
            card_showed = false;  
        }
    }) 
  //  UpdateDisplay(0);


}

// $(document).ready(function() {
//     csv_parser();
//     Opening(Questions);


// });


function csv_parser() 
{ 
   
    d3.csv("data/data.csv", function(data)
    {
        csv_data = data ;
        console.log(data);
        
    })
}



