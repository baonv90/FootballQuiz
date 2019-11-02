var Questions = {
    count : 0,
    speed : 150,
    csv_data : [],
    animating : true,
    sound : true,
    myVal : null,

    loadData : function(callback){
        'use strict';

            $.get('img/players/players.txt', function(data) {
            var lines = data.split('\n');
            var list = [];
            for(var i=0;i<lines.length;i++) {              
                list.push(lines[i]);
            }
            Questions.csv_data = QuizList(list);
            list = null ;
            callback();
   
        });    
        

    },
	init : function(){
        'use strict';

        var width = window.innerWidth;
        var height =  window.innerHeight;
        var image_size = (3*width)/4;
        var reponsecell_width  = width/3;
        var reponsecell_height =  100; 

		console.log("Initiation Questions");
        shuffleArray(Questions.csv_data);

        console.log(Questions.csv_data.length);
        var Reponses = Questions.csv_data[Questions.count].setUp();
		$('#opendiv').prepend(
        '<paper-progress id= "progress_bar" value="100" class="green"></paper-progress>'  +  
        '<div class="menu" ><img id="speaker" vertical-align="middle" src="img/icons/sound.png"></img>' + 
        '<h1 id= "score"> 0 </h1></div>'
        );
        $('#score').css({marginLeft : width - 50 });
        // $('#speaker').click(
        //     function(){
        //      Questions.sound ? $(this).attr("src","img/icons/nosound.png") : $(this).attr("src","img/icons/sound.png") ;
        //      Questions.sound = !Questions.sound;
        //     }
        // );
        $('#progress_bar').css({width : width });
        $('#progressContainer').css({ height : 20 });   
        $('#opendiv').prepend('<img class="image" id = "question_image" src=img/players/' + Questions.csv_data[Questions.count].getId() +'.jpeg' + '>'); 
        $('#question_image').css({position: "absolute" , width : image_size, height : (3*image_size)/4, marginTop: height/6, marginLeft : width/2 - image_size/2}); 
    //    document.getElementById('opendiv').addEventListener("click", Questions.onClick);




    //    $('#opendiv').prepend('<img class="image" id = "mark" src=img/icons/right-mark.png' + '>'); 
    //    $('#mark').css({position: "absolute" , width : 100, height : 100, marginTop:height/6 + (3*image_size)/4, marginLeft : width/2 - 50}).hide();   

        for (var i = 0; i <= 1 ; i++)
        {
            $('#opendiv').prepend('<paper-button id = "Result'+ i + '" noink class="green">' + Reponses[i] + '</paper-button>');
        //    $('#opendiv').prepend('<button position="absolute" id = "Result'+ i + '">' + Reponses[i] + '</button>');

            $('#Result' + i).css({width : reponsecell_width , height : reponsecell_height - 10});
            $('#Result' + i).css({ marginTop : (2*height/3)
            , marginLeft : function(){
                return i<1 ? (width/8) : (13*width/24);
            } 
            });
        //    document.getElementById('Result'+i).addEventListener('click', Questions.onButtonClick('Result' + i));
        }

         $('paper-button').on("tap" , function(e){
                $('paper-button').attr('disabled','true');
                $('paper-button').off();
                if(Questions.animating)
                {
                    console.log(e)
                    Questions.stopProgress();
                    Questions.checkAnswer(e);
                }                

        });
        // $('paper-button').off();

	},

    checkAnswer : function(e){
        var answer =  e.target.id ;
        var response = Questions.csv_data[Questions.count].getPos();
        $('paper-button').removeAttr('focused');
        console.log(answer + "-" + response); 
        if(answer == ('Result'+response))
        {
            $('#'+answer).attr('answered', 'true');            
        //    $('#mark').attr('src','img/icons/right-mark.png').fadeIn(500).fadeOut(500);
            $('#'+answer).delay(700).queue(function(){
                   // $(this).removeAttr('active'); 
                  $(this).removeAttr('answered').dequeue();
                   // $(this).attr('elevation',"1");
                  Questions.count += 1 ;
                  Questions.updateQuestions(Questions.count);  

                  console.log(Questions.count);   

            });
           
        }
        else
        {
        //    $('#mark').attr('src','img/icons/wrong-mark.png').fadeIn(500).fadeOut(500);
            $('#Result'+response).attr('answered', 'true');
            $('#Result'+response).delay(700).queue(function(){
                $(this).removeAttr('answered').dequeue();
                Questions.checkHighScore(Questions.count);
                GameOver.init("Game Over");
            });
        }
        answer = null ;
        response =  null ;

    },
 	updateQuestions : function(count){

        Questions.refreshProgress();
        Questions.refreshUI();
        Questions.myVal = setInterval(Questions.startProgress,Questions.speed);     
        var Reponses = Questions.csv_data[Questions.count].setUp();
		 for (i = 0; i <= 1 ; i++)
         {
                $('#Result'+i).text(Reponses[i]);
         }        
         $("#question_image").attr('src','img/players/' + Questions.csv_data[count].getId() + '.jpeg');
         $("h1").html(count);
	},
    startProgress : function(){
        var progress = document.querySelector('paper-progress');
        if(progress != null)
        {
            if(progress.value > 0)
            {
                progress.value -= 10;
            }
            else
            {
                Questions.stopProgress();
            //    Questions.count += 1;
            //    Questions.updateQuestions(Questions.count);  

                Questions.animating = false;
                Questions.checkHighScore(Questions.count);
                GameOver.init("Time out");
                
            }        
        }
        progress = null;
      
    },
    stopProgress : function(){
        clearInterval(Questions.myVal);
        Questions.myVal = null;

    },
    refreshProgress : function(){
        var progress = document.querySelector('paper-progress');
        if(progress != null)
        {
            progress.value = 100 ;
            Questions.animating = true ;
        }
       
    },
    refreshUI : function(){
        var width = window.innerWidth;
        var height =  window.innerHeight;
        var reponsecell_width  = width/3;
        var reponsecell_height =  100; 
        var image_size = (3*width)/4;
        $('paper-button').removeData().off().remove();
        $("#question_image").removeData().remove();
        for (var i = 0; i <= 1 ; i++)
        {
            console.log("Button" + i);
            $('#opendiv').prepend('<paper-button id = "Result'+ i + '"  noink class="green"></paper-button>');
            $('#Result' + i).css({width : reponsecell_width , height : reponsecell_height - 10});
            $('#Result' + i).css({ marginTop : (2*height/3)
            , marginLeft : function(){
                return i<1 ? (width/8) : (13*width/24);
            } 
            });

        }
         $('paper-button').on("tap" , function(e){
                $('paper-button').attr('disabled','true');
                $('paper-button').off();
                if(Questions.animating)
                {
                    console.log(e)
                    Questions.stopProgress();
                    Questions.checkAnswer(e);
                }
                
                             
        });
       $('#opendiv').prepend('<img class="image" id = "question_image" src="" ' + '>'); 
       $('#question_image').css({position: "absolute" , width : image_size, height : (3*image_size)/4, marginTop: height/6, marginLeft : width/2 - image_size/2}); 

    },

    checkHighScore : function(score){
    console.log("HIGH  " + localStorage.getItem("highscore") + score);
    if(localStorage.getItem("highscore")< score)
        {
            console.log("new highscore");
            localStorage.setItem("highscore", score);

        }

    },
    reset : function(){
        
        Questions.animating = true ;
        Questions.count = 0 ;

        
    },
    replay: function(){

        shuffleArray(Questions.csv_data);
        Questions.updateQuestions(0);
    }

};




