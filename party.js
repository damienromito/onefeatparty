


top = {


	initialize :function(){
		party.clock();
	

		$("#top").css("margin", window.innerHeight/20+"px 0");
	},



}

all_missions = {

	feats_of_theme_count:13,

	initialize :function(){
		party.clock();
		all_missions.generate_feats();

		$("#missions_theme div").css("margin", window.innerHeight/20+"px 0");
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
	interval_ms:5000, //interval reload
	feats_of_theme_count:8,

	initialize :function(){
		party.clock();

		//height = 

		//width = $("#all_feats").width();
		//height = (window.innerHeight)-350;
		$("#all_feats").height(height);
		$.getJSON('http://onefeat.com/feats/of_the_quest_of_week.json?api=v3&callback=?', function(datas) {
			
			length = datas.photos.length;

			for(i = datas.photos.length-1 ; i >  0; i-- )
			{
				//$("#all_feats").append("<img src='"+ datas.photos[i].sizes.normal+"'/>");
			}
		});

		// setInterval(function() {
	 //        all_feats.poolRequest();
	 //    }, all_feats.interval_ms);
	
	},

	poolRequest:function()
	{
		
		$.getJSON('http://onefeat.com/feats/of_the_quest_of_week.json?api=v3&callback=?', function(datas) {
			
			$.each(datas.photos, function(i, feat) {
			    if(party.feats_array[party.feats_array.length-1] == feat.id)
				{

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

}


party = {

	interval_ms:5000, //interval reload
	feats_number : 0,
	feats_array : [],
	feats_displayed : [],

	initialize :function(){
		party.clock();
		$.getJSON('http://onefeat.com/feats/of_the_quest_of_week.json?api=v3&callback=?', function(datas) {
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

	    $("#content").css('margin-top',window.innerHeight/2 - content_height/1.2);
	},

	poolRequest:function()
	{
		
		$.getJSON('http://onefeat.com/feats/of_the_quest_of_week.json?api=v3&callback=?', function(datas) {
			
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
		    //if(m < 10){m = "0" + m ;}
		         
		    $("header time").html(h+":"+m+" "+suffix);
	    },1000);
	}

}
