var Opening = {



	init : function(){
        'use strict';
        // Set up component 
		console.log("Initiation");
		var width = window.innerWidth;
		var height =  window.innerHeight;
		var size = [150,200];
		var image_size = height/3;
		var color = "rgb(63, 81, 105)";
        $('body').append('<div id="opendiv" class="main"></div>');
		$('#opendiv').css({position: "absolute" , width : width, height : height, backgroundColor: color });
		$('#opendiv').prepend('<img class="image" id = "main_image" src= "img/icons/logo.png" />'); 
    	$('#main_image').css({position: "absolute" , width : image_size, height :image_size, marginTop:height/2 - image_size/2, marginLeft : width/2 - image_size/2});
    	$('#opendiv').prepend('<paper-button id = "playbutton" on-click="handleClick" raised class="blue">READY</paper-button>');
        $('#playbutton').css({position: "absolute" , width : width/2, marginTop:height/2 - 50, marginLeft : width/4}).hide();
        $('#playbutton').attr('disabled','true');

        // Set score
        if (typeof(Storage) !== "undefined") {
            if(!localStorage.getItem("highscore"))
            {
            // Store
                localStorage.setItem("highscore", 0);
            }
            else
            {
                console.log("saved highscore " + localStorage.getItem("highscore"));

            }
        }
    		
    	 $('#main_image').on('click', function(e){
    		$('#main_image').animate({ marginTop: height/4 - image_size/2 }, 300, function(){
    			$('#playbutton').fadeIn(200);
                $('#playbutton').removeAttr('disabled');
    		});
    	});
    	$('#playbutton').one('tap',function(e){
            	 $( 'img' ).remove();
                 $('paper-button').off();
                 $('paper-button').remove();
             //	$('#opendiv').unbind();
             //   $('#opendiv').empty();
           		$('#opendiv').fadeOut(200).css({backgroundColor : color}).fadeIn(200 , function(){

           			Opening.start()

           		});
    	});

	},

	start : function(){
		Questions.loadData(Questions.init);
        console.log(Questions);
	}

};


$(document).ready(function() {
    Opening.init();
});


