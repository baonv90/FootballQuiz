var GameOver = {

  

	init : function(text){
      'use strict';

      var width = window.innerWidth;
      var height = window.innerHeight;



        if(!$('#over_dialog').length)
        {
    		$('body').append(
            '<paper-dialog id="over_dialog" heading = "Game Over" transition="paper-dialog-transition-bottom" modal>' +
            '<p class="main">'+ text +'</p>' + 
            '<p class="content"> Score <span class="score">'+ Questions.count + '</span></p>' +
            '<p class="content"> Best <span class="score">' + localStorage.getItem("highscore") + '</span></p>' +
            '<img id="replay" style="width : 80px ; margin: 20px 0px 0px 0px" src="img/icons/replay.png"></img>'+
            '<img id="back" style="width : 80px; margin: 20px 0px 0px 0px" src="img/icons/menu.png"></img>'+
            '</paper-dialog>'
            );
        }
        $('#over_dialog').css({position:"absolute", width: (3*width)/4, height : height/2 , marginTop : -height, marginLeft : width/8});
        $('#over_dialog').animate({marginTop:(height/6)}, 200).show();
        $('paper-button').attr('disabled','true');
        $('paper-button').off();
        $('#replay').click(function(e){
            $('#over_dialog').animate({marginTop:-height}, 200, function(){
                 $('img').removeData().off();
                 $('#over_dialog').removeData().remove();  
            //     $('*').unbind();                                       
                 Questions.reset();
                 Questions.replay();

            });
           
        });
        $('#back').click(function(e){
            $('#over_dialog').animate({marginTop:-height}, 200, function(){
            	 $('#over_dialog').removeData().remove();
                 $('#opendiv').removeData().empty();
                 $('*').off();
                 Questions.csv_data = null ;        

                 Questions.reset();
                 Opening.init();
              });
           
        });
	}

};



