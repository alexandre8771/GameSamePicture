$(document).ready(function(){
    var timer;
    var temps={};   
    var idFirstImg;
    var idSecondImg;
    var totalTempsUp;
    var refPremier;
    var second = false;
    var secondDone = false;
    var winCondition = 0;
    var difficulte = 0;
    var listImg = [150];
    var contreMontre = false;
    var numeroGameNormal = 1;
    var numeroGameMontre = 1;
    $("#checkboxmontre").prop("checked", false);


    class GameNormal{
        constructor(numerogame,joueurgamenormal,diffultergame,tempsgames){
            this.numerogame=numerogame;
            this.joueurgamenormal=joueurgamenormal;
            this.diffultergame=diffultergame;
            this.tempsgames=tempsgames;
        }  
        insererjoueur(){

            return `
<tr>
<td scope="row" class="text-white">${this.numerogame}</td>
<td class="text-white">${this.joueurgamenormal}</td>
<td class="text-white">${this.diffultergame}</td>
<td class="text-white">${this.tempsgames}</td>
</tr>`; 
        }


    }

    class GameHorloge{
        constructor(numerogame,joueurgame,diffultergame,tempdefini,tempsecouler){
            this.numerogame=numerogame;
            this.joueurgame=joueurgame;
            this.diffultergame=diffultergame;
            this.tempdefini=tempdefini;
            this.tempsecouler=tempsecouler;            
        }
        insererjoueur(){

            return`
<tr>
<td scope="row" class="text-white">${this.numerogame}</td>
<td class="text-white">${this.joueurgame}</td>
<td class="text-white">${this.diffultergame}</td>
<td class="text-white">${this.tempdefini}</td>
<td class="text-white">${this.tempsecouler}</td>
</tr>`; 
        }
    }

    for (var o = 1; o <= 151; o++)
    {
        listImg[o-1] = `
<img src="Twin_Image_Game_Dataset/image.jpg" class="card-img-top image" id="${o}">`;
    }

    listImg = melanger(listImg);

    $("#tableDiv").on("click",".image",function() {
        showCard(this);
    });

    $("#checkboxmontre").on("click", function(){

        if(contreMontre == false)
        {
            $("#temps").css("display","block");
            $("#conteurdescend").css("display","block");
            $("#conteurnormale").css("display","none");
            $("#montre").css("display","block");
            $("#normal").css("display","none");
            $("#montre1").css("display","block");
            $("#normal1").css("display","none");
            $("#minutecontrole").val(2);
            $("#secondecontrole").val(00);
            contreMontre=true;
        }
        else
        {
            $("#temps").css("display","none");
            $("#conteurdescend").css("display","none");
            $("#conteurnormale").css("display","block");
            $("#montre").css("display","none");
            $("#normal").css("display","block");
            $("#montre1").css("display","none");
            $("#normal1").css("display","block");
            $("#minutecontrole").val(2);
            $("#secondecontrole").val(00);
            contreMontre = false;
        }

    });

    //bouton réinitialiser a premiere page
    $("#reset").on("click", function (){
        $("#checkboxmontre").prop("checked", false);
        $("input[name=nompersonne]").val("");
        $("input[name=minute]").val("");
        $("input[name=seconde]").val("");
        $("#temps").css("display","none");
    });

    //bouton commencer a premiere page
    $("#commencer").on("click", function (){  
        startGame();
    });

    //bouton score a premiere page
    $("#score1").on("click", function (){
        $("#indexjeu").fadeOut(function(){
            $("#Consulterscore").fadeIn();
        });  
    });

    //bouton abandonner 2ieme page
    $("#abandonner").on("click", function (){

        $("#games").css("display","none");
        $("#gameover").css("display","block");
        clearInterval(timer);
    });

    //bouton rejouer a page gameover
    $("#rejouer").on("click", function (){

        startGame();
        $("#gameover").css("display","none");
        $("#games").css("display","block");

    });

    //bouton menu a page game over
    $("#menu").on("click", function (){
        $("#gameover").fadeOut(function () {
            $("#indexjeu").fadeIn();
        });
        $("#checkboxmontre").prop("checked", false);
        $("input[name=nompersonne]").val("");
        $("input[name=minute]").val("");
        $("input[name=seconde]").val("");
        $("#temps").css("display","none");

        $("#conteurnormale").css("display","block");
        $("#conteurdescend").css("display","none");

        $("#montre").css("display","none");
        $("#normal").css("display","block");

        contreMontre=false;
    });

    //bouton menu a page score
    $("#menu1").on("click", function (){

        $("#checkboxmontre").prop("checked", false);
        $("input[name=nompersonne]").val("");
        $("input[name=minute]").val("");
        $("input[name=seconde]").val("");
        $("#temps").css("display","none");

        $("#conteurnormale").css("display","block");
        $("#conteurdescend").css("display","none");

        $("#montre").css("display","none");
        $("#normal").css("display","block");

        contreMontre=false;
        $("#Consulterscore").slideUp();
        $("#indexjeu").slideDown();

    });

    //------------------------------------------------------------------------------------------------------------------------------

    function startGame()
    {
        clearInterval(timer);
        totalTempsUp=0;
        listImg = melanger(listImg);
        second = false;
        var numeroImg = 0;
        winCondition = 0;
        var minutesDown = parseInt($("input[name='minute']").val());
        var secondesDown = parseInt($("input[name='seconde']").val());
        var minutesUp = 0;
        var secondesUp = 0;
        var nomJoueur=($("input[name='nompersonne']").val());
        $("#prenom").text(nomJoueur);

        temps["ladifficulter"] = $("select[name='leveljeu'] option:selected").val();
        $("#dificulter").text(temps["ladifficulter"]);

        var totalTempsDown =(60 * minutesDown) + secondesDown;
        var totalTempsUp=(60*minutesUp)+secondesUp;

        if(totalTempsDown == 0 || nomJoueur == "")
        {
            alert("S.V.P entrer un temps et un nom valide")       
        }
        else
        {
            alert("S.V.P ne pas aller trop vite, il faut laisser le temps aux animations de ce faire pour ne pas effrayer le programme!")

            $("#indexjeu").slideUp();
            $("#games").slideDown();

            timer = setInterval(function (){
                totalTempsDown--;
                totalTempsUp++;

                if(totalTempsDown > 0){

                    var totalMinutesDown = Math.floor(totalTempsDown  / 60);
                    var afficherMinutesDown = totalMinutesDown < 10 ? "0" + totalMinutesDown : totalMinutesDown;
                    $("#disp_minutes").text(afficherMinutesDown);
                    var totalSecondesDown = totalTempsDown - (totalMinutesDown * 60);
                    var afficherSecondesDown = totalSecondesDown < 10 ? "0" + totalSecondesDown : totalSecondesDown;
                    $("#disp_seconds").text(afficherSecondesDown);
                }
                else if(totalTempsDown==0)
                {
                    $("#games").css("display","none");
                    $("#gameover").css("display","block");
                    clearInterval(timer);
                }
                else if(totalTempsUp >= 0){

                    var totalMinutesUp = Math.floor(totalTempsUp  / 60);
                    var afficherMinutesUp = totalMinutesUp < 10 ? "0" + totalMinutesUp : totalMinutesUp;
                    $("#disp_minutes1").text(afficherMinutesUp);
                    var totalSecondesUp = totalTempsUp - (totalMinutesUp * 60);
                    var afficherSecondesUp = totalSecondesUp < 10 ? "0" + totalSecondesUp : totalSecondesUp;
                    $("#disp_seconds1").text(afficherSecondesUp);
                }
            }, 1000); 


            if($("#dificulter").text() == "Difficile")
            {
                listImg = melanger(listImg);
                var indexImgChoisi = 0;
                var listImgChoisi = [64];
                var number_of_rows = 4;
                var number_of_cols = 8;
                var table_body = '<table border="1">';
                difficulte=3;

                for (var z = 0; z < 2; z++)
                {
                    for (var y = 0; y < 32; y++)
                    {
                        listImgChoisi[indexImgChoisi] = listImg[y];
                        indexImgChoisi++;
                    }
                }

                listImgChoisi = melanger(listImgChoisi);

                for(var k=0 ;k<2;k++)
                {
                    for(var i=0;i<number_of_rows;i++){


                        table_body+='<tr>';
                        for(var j=0;j<number_of_cols;j++){
                            table_body +='<td>';
                            table_body +=(listImgChoisi[numeroImg]);
                            table_body +='</td>';
                            numeroImg++;
                        }
                        table_body+='</tr>';
                    }  
                }

                table_body+='</table>';
                $('#tableDiv').html(table_body);
                $("img").css({"height": "59.1px", "width" : "59.1px"});
            }
            else if($("#dificulter").text() == "Moyen")
            {
                var indexImgChoisi = 0;
                var listImgChoisi = [36];
                var number_of_rows = 3;
                var number_of_cols = 6;
                var table_body = '<table border="1">';
                difficulte=2;

                for (var z = 0; z < 2; z++)
                {
                    for (var y = 0; y < 18; y++)
                    {
                        listImgChoisi[indexImgChoisi] = listImg[y];
                        indexImgChoisi++;
                    }
                }

                listImgChoisi = melanger(listImgChoisi);

                for(var k=0 ;k<2;k++)
                {
                    for(var i=0;i<number_of_rows;i++){


                        table_body+='<tr>';
                        for(var j=0;j<number_of_cols;j++){
                            table_body +='<td>';
                            table_body +=(listImgChoisi[numeroImg]);
                            table_body +='</td>';
                            numeroImg++;
                        }
                        table_body+='</tr>';
                    }  
                }

                table_body+='</table>';
                $('#tableDiv').html(table_body);
                $("img").css({"height": "80px", "width" : "80px"});
            }
            else if($("#dificulter").text() == "Facile")
            {
                var indexImgChoisi = 0;
                var listImgChoisi = [16];
                var number_of_rows = 2;
                var number_of_cols = 4;
                var table_body = '<table border="1">';
                difficulte=1;

                for (var z = 0; z < 2; z++)
                {
                    for (var y = 0; y < 8; y++)
                    {
                        listImgChoisi[indexImgChoisi] = listImg[y];
                        indexImgChoisi++;
                    }
                }

                listImgChoisi = melanger(listImgChoisi);

                for(var k=0 ;k<2;k++)
                {
                    for(var i=0;i<number_of_rows;i++){


                        table_body+='<tr>';
                        for(var j=0;j<number_of_cols;j++){
                            table_body +='<td>';
                            table_body +=(listImgChoisi[numeroImg]);
                            table_body +='</td>';
                            numeroImg++;
                        }
                        table_body+='</tr>';
                    }  
                }

                table_body+='</table>';
                $('#tableDiv').html(table_body);
            }
        }

    };

    //------------------------------------------------------------------------------------------------------------------------------

    function showCard(clicked) {
        if(second == false)
        {
            idFirstImg = $(clicked).attr("id");
            refPremier = $(clicked);

            $(clicked).fadeOut(function(){

                $(clicked).attr("src",`Twin_Image_Game_Dataset/${idFirstImg}.png`);
                $(clicked).fadeIn();

            });
            second = true;
            secondDone = false;
        }
        else if(secondDone == false)
        {   
            idSecondImg = $(clicked).attr("id");

            $(clicked).fadeOut( function(){
                $(clicked).attr("src",`Twin_Image_Game_Dataset/${idSecondImg}.png`);
                $(clicked).fadeIn( function(){

                    if(idFirstImg == idSecondImg)
                    {   
                        winCondition++;
                        refPremier.removeClass("image");
                        $(clicked).removeClass("image");  
                        checkWinCondition(winCondition, difficulte);
                    }
                    else
                    {   
                        $(clicked).fadeOut( function(){

                            $(clicked).attr("src","Twin_Image_Game_Dataset/image.jpg");
                            $(clicked).fadeIn();
                        });

                        refPremier.fadeOut( function(){

                            refPremier.attr("src","Twin_Image_Game_Dataset/image.jpg");
                            refPremier.fadeIn();
                        });
                    }
                });
            });
            second = false;
            secondDone = true;
        }
    }

    //------------------------------------------------------------------------------------------------------------------------------

    function afficherScore()
    {
        var typeDifficulter=$("#dificulter").text();
        var joueurgamenormal=($("input[name='nompersonne']").val());

        if(contreMontre==false)
        {
            var secondesUp=parseInt($("#disp_seconds1").text());
            var minutesUp=parseInt($("#disp_minutes1").text());
            var tempecouler=(minutesUp*60)+secondesUp;
            var normalegames = new GameNormal(numeroGameNormal,joueurgamenormal,typeDifficulter,tempecouler);
            var html=normalegames.insererjoueur();
            $("#listescoresnormal").append(html);
            sortResultat("tableScoresNormal",3);
            numeroGameNormal++;
        }
        else if(contreMontre==true)
        {
            var minutesDown = parseInt($("input[name='minute']").val());
            var secondesDown = parseInt($("input[name='seconde']").val());
            var totalTempsUpset =(60 * minutesDown) + secondesDown;
            var setsec=parseInt($("#disp_seconds").text());
            var setmin=parseInt($("#disp_minutes").text());
            var totalTempsUp1=(60*setmin)+setsec;
            var totalTempsUpmoins=totalTempsUpset-totalTempsUp1;
            var horloge=new GameHorloge(numeroGameMontre,joueurgamenormal,typeDifficulter,totalTempsUpset,totalTempsUpmoins);
            var html = horloge.insererjoueur();
            $("#listescoresmontre").append(html);
            sortResultat("listescoresmontre",4);
            numeroGameMontre++;
        }
    }

    //------------------------------------------------------------------------------------------------------------------------------

    function melanger(liste) {
        var length = liste.length;
        var index;
        var tmp;

        while (length> 0) {
            index = Math.floor(Math.random() * length);
            length--;
            tmp = liste[length];
            liste[length] = liste[index];
            liste[index] = tmp;
        }
        return liste;
    };

    //------------------------------------------------------------------------------------------------------------------------------

    function checkWinCondition(win, diff){

        switch(diff)
        {
            case 1:
                if(win == 8){
                    afficherScore();
                    finish();
                }
                break;

            case 2:
                if(win == 18){
                    afficherScore();
                    finish();
                }
                break;

            case 3:
                if(win == 32){
                    afficherScore();
                    finish();
                }
                break;
        }
    };

    //--------------------------------------------------------------------------------------------------------------------------------

    function sortResultat(id, td)
    {
        var table, ligne, echange,i, x, y, siEchange;
        table = document.getElementById(id);
        echange = true;
        while (echange) {
            echange = false;
            ligne = table.rows;
            for (i = 1; i < (ligne.length - 1); i++) {
                siEchange = false;
                x = ligne[i].getElementsByTagName("TD")[td];
                y = ligne[i + 1].getElementsByTagName("TD")[td];
                if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
                    siEchange = true;
                    break;
                }
            }
            if (siEchange) {
                ligne[i].parentNode.insertBefore(ligne[i + 1], ligne[i]);
                echange = true;
            }
        }
    }

    //--------------------------------------------------------------------------------------------------------------------------------

    function finish()
    {
        $("#games").slideUp(function(){
            $("#Consulterscore").slideDown();
        });
        clearInterval(timer);
    }
});