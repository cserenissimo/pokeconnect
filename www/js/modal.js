function loading(){
    closeDiv('popup');
    popup("     <div id=\"popup-loading\">\
                    <div class=\"preloader-wrapper big active\">\
                        <div class=\"spinner-layer spinner-blue-only\">\
                            <div class=\"circle-clipper left\">\
                                <div class=\"circle\"></div>\
                            </div><div class=\"gap-patch\">\
                                <div class=\"circle\"></div>\
                            </div><div class=\"circle-clipper right\">\
                                <div class=\"circle\"></div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ", "500", "1", "loading");
}

function alertEdit(text, title, button, buttonAction, buttonClass)
{
    if (title == undefined)
    {
        title = 'UPSSS!';
    }
    
    if (buttonClass == undefined){
        buttonClass = 'b-pink2';
    }
    
    if (button == undefined)
    {
        $button = "<input type=\"submit\" class=\"popup-input-submit closeThisAlert button b-blue2\" value=\"Salir\"/>";
    }
    else
    {
        $button = "<input type=\"submit\" class=\"popup-input-submit closeThisAlert button b-blue2\" value=\"Salir\"/><input type=\"submit\" class=\"popup-input-submit button " + buttonClass + "\" onclick=\"" + buttonAction + "\" value=\"" + button + "\">";
    }
    
    if(!document.getElementById("alertEdit"))
    {
        $('body').prepend(" <div id=\"alertEdit\" class=\"\">\
                                <div id=\"table\" class=\"\" style=\"display: none;\">\
                                    <div id=\"cell\" class=\"alertEditClose\" style=\"\">\
                                        <div id=\"popup-box\" class=\"box-shadow-2\">\
                                            <div id=\"popup-top\">\
                                                <div id=\"popup-title\">" + title +"</div>\
                                            </div>\
                                            <div id=\"popup-content\">\
                                                <div class=\"text center\">" + text +"</div>\
                                            </div>\
                                            <div id=\"popup-bottom\">" + $button + "\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>");
                            
        var alertEditHeight = (parseInt($("#alertEdit").children("div").outerHeight(true)) * -1) /2 + 'px';
        
        $('#alertEdit').fadeIn('fast', function(){    
            fixPopup();
            $( "#alertEdit > #table" ).css({"display": "table", "margin-top": alertEditHeight});     
            $( "#alertEdit > #table > #cell" ).css({"display": "table-cell"}); 
            $( "#alertEdit" ).children("div").animate({"margin-top": "0px"}, 0);
        });
        
    }
}

function popup(text, width, dontClose, loading) 
{    
    fixPopup();
    
    if (width == '')
    {
        width = '500';
    }
    
    if (dontClose == undefined)
    {
        $close = 'closeThisPopup';
    }
    else
    {
        $close ='';
    }
    
    var margin = width/2;
    
    if (width != '100')
    {
        if( isMobile.any() ) 
        {
            widthStyle = "";
            marginStyle = "";
        }
        else
        {
            widthStyle = "width: " + width + "px;";
            marginStyle = "margin-left: calc(50% - " + margin + "px);";
        }
        $popupBoxStyle = '';
    }
    else
    {
        widthStyle = "width: 100vw;";
        marginStyle = "margin-left: 0";
        $popupBoxStyle = 'height: ' + parseInt($(window).height()) + 'px';
    }
    
    if (loading == undefined)
    {
        background = 'background-color: #fff;';
    }
    else {
        background = '';
    }
        
    $('body').prepend(" <div id=\"popup\" class=\"" + $close + "\">\
                            <div id=\"table\" class=\"" + $close + "\" style=\"" + widthStyle + marginStyle + "\">\
                                <div id=\"cell\" class=\"" + $close + "\" style=\"\">\
                                    <div id=\"popup-box\" class=\"\" style=\"" + background + $popupBoxStyle + "\">\
                                        " + text +"\
                                    </div>\
                                </div>\
                            </div>\
                        </div>");
    $('#popup').fadeIn('fast', function(){              
    $('#popup > #table').css({"display": "table"});
    });   
}

function fixPopup()
{
    if ($('.popupFixed').length == 0)
    {
        if ($(window).height() < $('#web-principal-content').height())
        {
            $widthWebPrincipal = $('#web-principal-content').width();
            $topWebPrincipal = $(window).scrollTop() * -1;
            $('body').css({'overflow-y': 'scroll'});
            $('#web-principal-content').css({'position':'fixed', 'width': $widthWebPrincipal, 'top':$topWebPrincipal});
        }
    }
    else
    {
        if ($('.popupFixed').is(":visible"))
        {
            
        }
        else
        {
            alert('que?4');
            $widthWebPrincipal = $('#web-principal-content').width();
            $topWebPrincipal = $(window).scrollTop() * -1;
            $('body').css({'overflow-y': 'scroll'});
            $('#web-principal-content').css({'position':'fixed', 'width': $widthWebPrincipal, 'top':$topWebPrincipal});
        }
    }
}
function unFixPopup(id)
{
    if (id == undefined)
    {
        $topWebPrincipal = parseInt($('#web-principal-content').css('top')) * -1;
        $('#web-principal-content').css({'position':'static'});
        $(window).scrollTop($topWebPrincipal);
        $('body').css({'overflow-y': 'auto'});
    }
    else
    {
        if (((id == "alertEdit")&&($('#popup').length == 0))||((id == "popup")))
        {
            if ($('.popupFixed').length == 0)
            {
                $topWebPrincipal = parseInt($('#web-principal-content').css('top')) * -1;
                $('#web-principal-content').css({'position':'static'});
                $(window).scrollTop($topWebPrincipal);
                $('body').css({'overflow-y': 'auto'});
            }
            else
            {
                if ($('.popupFixed').is(":visible"))
                {
                    
                }
                else
                {
                    $topWebPrincipal = parseInt($('#web-principal-content').css('top')) * -1;
                    $('#web-principal-content').css({'position':'static'});
                    $(window).scrollTop($topWebPrincipal);
                    $('body').css({'overflow-y': 'auto'});
                }
            } 
        }
    }
}

function closeDiv(id, callBack)
{
    //$("#" + id).fadeOut('fast', function(){unFixPopup(id);$( "#" + id).remove();});
    unFixPopup(id);
    $( "#" + id).remove();
}

function visibilityAlertEdit()
{
    if ($('#alertEdit').is(":visible"))
    {
        $("#alertEdit").css({'display':'none'});
    }
    else
    {
        $("#alertEdit").css({'display':'block'});
    }
}

function visibilityPopUp()
{
    if ($('#popup').is(":visible"))
    {
        $("#popup").fadeOut('normal', function(){unFixPopup();});
    }
    else
    {
        $("#popup").fadeIn('slow', function(){fixPopup();});
    }
}

$(document).mouseup(function (e){
    var key = e.target.className;
    
    if (key.indexOf('closeThisAlert') > -1)
    {
        closeDiv('alertEdit');
    }
    
    if (key.indexOf('closeThisPopup') > -1)
    {
        closeDiv('popup');
    }
    
});


$(document).ready(function() {
   $('select').material_select();
});
