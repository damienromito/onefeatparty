
animation_duration = 1000;
animation_ongoing = false;
party = {

	feats_number : 0,

	initialize :function(){
		party.clock();
	},

	feats_displayed : [],

	addFeat:function(datas)
	{

		//if !first feat
		if(party.feats_displayed.length > 0)
		{
			old_elem = $('#last_feats ul li:first-child');
			old_elem.css('background-color', "transparent");
			old_elem.animate({'margin-top': 0, 'padding-top' : 0},animation_duration);
			old_elem.find('img').animate({
				width : 250,
				height : 250,
			}, animation_duration, function(){
				display(old_elem);
			});
		}else display();


		function display(old_elem){
			animation_ongoing= true;
			//create elem
			new_feat =_.template($( "#feat_template" ).html())(datas);

			$('#last_feats ul').prepend(new_feat);
			$('.timeago').timeago();
			party.feats_number ++
			party.reload_feats_number();
			
			//display new elem
			new_elem = $('#last_feats ul li:first-child');
			party.feats_displayed.push(new_elem);
			new_elem.width(0);
			new_elem.css('opacity', '0');
			new_elem.animate({ width : 550, opacity : 1 },animation_duration);
			if(old_elem)
				old_elem.animate({width : 300},animation_duration, function(){
					animation_ongoing= false;
				});
			
			//remove very old element
			if(party.feats_displayed.length > 10)
			{
				console.log('hey');
				el = party.feats_displayed[0];
				party.feats_displayed.shift();
				el.remove();
			}
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

test_feat = 
{"last_page":true,"feat":{"id":853,"sizes":{"large":"https://d3qwnblcswcyy0.cloudfront.net/photos/0/853/high/b163ea17.jpg","thumb":"https://d3qwnblcswcyy0.cloudfront.net/photos/0/853/thumb/b163ea17.jpg","normal":"https://d3qwnblcswcyy0.cloudfront.net/photos/0/853/large/b163ea17.jpg","bigthumb":"https://d3qwnblcswcyy0.cloudfront.net/photos/0/853/bigthumb/b163ea17.jpg"},"user":{"id":206,"pretty_name":"Bogoss","avatar_image":"https://s3.amazonaws.com/assets.onefeat.com/generic/avatar/placeholder.png","level":19,"karma_points":24515,"monthly_pts":300,"missions_count":7,"photos_count":7,"missions_followed_count":29,"followers_count":5},"model":null,"iso":null,"description":null,"likes_count":7,"comments_count":1,"comments":[{"id":523,"comment":"poor young lady...","commentable_id":853,"commentable_type":"Feat","user":{"id":38,"pretty_name":"Puppy","avatar_image":"https://graph.facebook.com/559730926/picture?type=square","level":79,"karma_points":436085,"monthly_pts":0,"missions_count":84,"photos_count":84,"missions_followed_count":1642,"followers_count":5070},"created_at":"2011-07-20T03:32:56Z"}],"liked":false,"likes":[{"id":81427,"likable_id":853,"likable_type":"Feat","user":{"id":10836,"pretty_name":"anelnotlaw","avatar_image":"https://s3.amazonaws.com/assets.onefeat.com/generic/avatar/placeholder.png","level":17,"karma_points":21840,"monthly_pts":0,"missions_count":21,"photos_count":21,"missions_followed_count":13,"followers_count":1},"created_at":"2012-06-09T21:46:39Z"},{"id":74638,"likable_id":853,"likable_type":"Feat","user":{"id":9878,"pretty_name":"PaulSusini","avatar_image":"https://s3.amazonaws.com/assets.onefeat.com/generic/avatar/placeholder.png","level":10,"karma_points":11420,"monthly_pts":0,"missions_count":13,"photos_count":13,"missions_followed_count":0,"followers_count":1},"created_at":"2012-06-01T16:56:29Z"},{"id":23406,"likable_id":853,"likable_type":"Feat","user":{"id":1306,"pretty_name":"fionabologna","avatar_image":"https://s3.amazonaws.com/assets.onefeat.com/generic/avatar/placeholder.png","level":31,"karma_points":48905,"monthly_pts":150,"missions_count":43,"photos_count":43,"missions_followed_count":103,"followers_count":11},"created_at":"2011-11-22T11:11:44Z"},{"id":1130,"likable_id":853,"likable_type":"Feat","user":{"id":206,"pretty_name":"Bogoss","avatar_image":"https://s3.amazonaws.com/assets.onefeat.com/generic/avatar/placeholder.png","level":19,"karma_points":24515,"monthly_pts":300,"missions_count":7,"photos_count":7,"missions_followed_count":29,"followers_count":5},"created_at":"2011-07-22T11:43:45Z"},{"id":1071,"likable_id":853,"likable_type":"Feat","user":{"id":215,"pretty_name":"Emmanuel","avatar_image":"https://s3.amazonaws.com/assets.onefeat.com/generic/avatar/placeholder.png","level":1,"karma_points":0,"monthly_pts":0,"missions_count":0,"photos_count":0,"missions_followed_count":0,"followers_count":1},"created_at":"2011-07-21T03:36:25Z"}],"mission":{"id":116,"description":"Go to a foam party","level":0,"pts":2000,"photo_url":"https://d3qwnblcswcyy0.cloudfront.net/photos/0/853/bigthumb/b163ea17.jpg","created_at":"2011-07-19T16:21:37Z","likes_count":null,"photos_count":13,"category":"Party","c":{"id":10,"name":"Party","icon_url":"http://assets.onefeat.com.s3.amazonaws.com/assets/cat/party.png","color":"#673bb7","font_letter":"Q","url":"onefeat://missions?args=category:Party"},"name":"Go to a foam party"},"mission_id":116,"user_id":206,"created_at":"2011-07-19T16:24:31Z"}}