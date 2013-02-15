
top_users = {

	url: 'http://onefeat.com/quests/150/ranking_at_time.json?api=v3&since_time=2/15/2013&callback=?',
	players_id_array: [],
	interval_ms : 2000,
	initialize :function(){
		party.clock();
		$("#top").css("margin", window.innerHeight/20+"px 30px");
		$.getJSON(top_users.url, function(data) {
			top_users.update_top(data.users);
		});
		setInterval(function() {
	        	top_users.update_changement();
	    }, top_users.interval_ms);
	
	},
	update_changement:function(){
		
		$.getJSON(top_users.url, function(data) {
			
			for(i = 0; i<data.users.length; i++)
			{
				if(top_users.players_id_array[i] != data.users[i].id)
				{
					top_users.update_top(data.users);
				}
					
			}
			
		});

	},
	update_top:function(datas){
		top_users.players_id_array = [];
		$('#top .others').html('');
		$.each( datas, function(i, user){

			top_users.players_id_array[i] = user.id;

			if(i == 0)
			{
				first = _.template($( "#player_template" ).html())(user, position='1');
				$('#top .first').html(first);
			}
			else if(i == 1 )
			{
				second = _.template($( "#player_template" ).html())(user, position='2');
				$('#top .second').html(second);
			}
			else if(i == 2)
			{
				third = _.template($( "#player_template" ).html())(user, position='3');
				$('#top .third').html(third);
			}
			else if(i <12)
			{
				$('#top .others').append("<p>"+ (i+1) +" "+user.username +"</p>")
			}else return;

 		});

	},


}

all_missions = {

	feats_of_theme_count:13,

	initialize :function(){
		party.clock();
		all_missions.generate_feats();

		$("#missions_theme div").css("margin", window.innerHeight/10+"px 0");
	},

	generate_feats:function(){
		i =all_missions.feats_of_theme_count;
		html_content1 = "";
		html_content2 = "";
		while(i--)
		{
			if(i%2)
				html_content1 += '<img src="images/missions/'+i+'.png"></img>';
			else
				html_content2 += '<img src="images/missions/'+i+'.png"/>';
		}

		$("#missions_theme div.top").html(html_content1);
		$("#missions_theme div.bottom").html(html_content2);

	}

}


all_feats = {
	url : 'http://onefeat.com/feats/of_the_quest_of_week.json?api=v3&callback=?',
	interval_ms:5000, //interval reload
	feats_of_theme_count:8,
	init:false,

	initialize :function(){
		party.clock();
		
		initGrid();

		setInterval(function() {
	        	all_feats.poolRequest();
	    }, all_feats.interval_ms);
	
	},

	poolRequest:function()
	{
		$.getJSON(all_feats.url, function(data) {
			
			imgsArray = new Array;
			while (imgsArray.length<divsCounter*1.5) {	imgsArray = imgsArray.concat(data.photos);}

			imgsArray.sort(function() {return 0.5 - Math.random()});

			$.each( imgsArray, function(i, feat){
				var i = getRandomInt(0,1);
				console.log(i);
   			addBackgroundToDiv(i, feat.sizes.normal);
 			});

 			activeSlide = $("#grid div").eq(Math.floor(Math.random()*$("#grid div").length));

 			if(!all_feats.init)
 			{
				slideSwitch(activeSlide);
				all_feats.init = true;
			}
			$('.number').html(data.total)
		});
	
	},

}

party = {
	url: "http://onefeat.com/feats/recent.json?api=v3&page=1&callback=?",
	interval_ms:5000, //interval reload
	feats_number : 0,
	feats_array : [],
	feats_displayed : [],

	initialize :function(){
		//'http://onefeat.com/feats/of_the_quest_of_week.json?api=v3&callback=?'
		party.clock();
		$.getJSON(party.url, function(datas) {
			for(i = datas.photos.length-1 ; i >  0; i-- )
			{
				party.addFeat(datas.photos[i]);
			}
		});

		setInterval(function() {
	        party.poolRequest();
	    }, party.interval_ms);

	    //center
	    content_height =$("#content").height();

	    $("#content").css('margin-top',window.innerHeight/2 - content_height/2);
	},

	poolRequest:function()
	{
		
		$.getJSON(party.url, function(datas) {
			
			$.each(datas.photos, function(i, feat) {
			    if(party.feats_array[party.feats_array.length-1] == feat.id)
				{

					console.log(i);
		
					for(j = i-1 ; j > 0; j--  )
					{
						party.addFeat(datas.photos[j]);
					}
					return;
				}
			});

			//party.addFeat(datas.photos[0]);
		});
	
	},

	addFeat:function(datas)
	{
		party.feats_array.push(datas.id);
		//resize old elem
		$('#last_feats ul li:first-child').width(300);
	
		//create elem
		new_feat =_.template($( "#feat_template" ).html())(datas);
		$('#last_feats ul').prepend(new_feat);
		$('.timeago').timeago();
		party.feats_number ++;
		party.reload_feats_number();
		
		//display new elem
		new_elem = $('#last_feats ul li:first-child');
		new_elem.width(550);

		//clean elements
		party.feats_displayed.push(new_elem);
		if(party.feats_displayed.length > 10)
		{
			el = party.feats_displayed[0];
			party.feats_displayed.shift();
			el.remove();
		}
		
	
	}, 

	reload_feats_number :function (){
		$('.number').html(party.feats_number);
	},

	clock :function (){
	    setInterval(function(){
		    var currentTime = new Date();
		    var h = currentTime.getHours();
		    var m = currentTime.getMinutes();
		    var suffix = "AM";
		     
		    if(h >= 12){suffix = "PM";h = h - 12;}
		    if(h == 0){h = 12;}
		   // if(h < 10){h = "0" + h ;}
		    if(m < 10){m = "0" + m ;}
		         
		    $("header time").html(h+":"+m+" "+suffix);
	    },1000);
	}

}
