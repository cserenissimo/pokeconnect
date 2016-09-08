var userObject = {
    "nickname":"",
    "level":"", 
    "team":"",
    "move":"",
    "location":""
}
    
function createUser(res){
    userObject = {
        "id": res.id,
        "nickname": res.nickname,
        "level": res.level, 
        "team": res.team,
        "move":res.move, 
        "location": {
            "lat": 0,
            "lng": 0
        }
    }
}


function getSession(){
    $.ajax({
    	url: 'http://pokemonconnect.co/app/controller/SessionController.php',
        data: {
            "method":"getSession"
        },
        type: "POST",
    	cache: false,
    	dataType: "json",
    	success: function(res){
            if (res === 0){
                $('#view_loading').hide();
                $('#view_landing').show();
            }
            else {
                createUser(res);
                
                $('.views').each(function(){
                    $(this).hide();
                });
                
                $('#view_map').show();
            }
    	}
    });
}

function createInput(name, value){
    if (!document.getElementById('input_' + name)){
        $('#form_session').append('<input id="input_' + name + '" type="hidden" name="' + name + '" value="' + value + '" //>');
    }
    else {
        $('#input_' + name).val(value);
    }
}
function activeId(e){
    if(typeof e == 'undefined'){
        e = e || window.event;
    }
    
    e = e.srcElement || e.target ;
    
    cardTab = $(e).attr('data-tab');
    data = $(e).attr('data');
    
    $(e).siblings().each(function() {
        $(this).removeClass('active');
    });
    $(e).addClass('active');
    
}
function saveSession(){
    var formElement = document.getElementById('form_session');
    var param = new FormData(formElement);
    param.append("method", "saveSession");
    
    $.ajax({
    	url: 'http://pokemonconnect.co/app/controller/SessionController.php',
        data: param,
   	    type: "POST",
    	cache: false,
    	dataType: "html",
        contentType: false,
        processData: false,
    	success: function(res){
    	   console.log(res);
            if (res == 0){
                alert('Complete the fields');
            }
            else {
                $('#view_landing').hide();
                $('#view_map').show();
                createUser(res);
            }
    	}
    });
    
}