/* 
Sloth.
Author: James Meldrum
Start date: 22/1/2012
Desc: Actions for sloth image carousel
 */

// Init

var sloth_height = 0;
var sloth_width = 0;
var image_urls = new Array();
var sloth_images = new Array();
var sloth_image_count = 0;
var current_image = 0;
var intervalID = 0
var image_duration = 2000;
var image_fade = 500;

function slothinit(options){
	initOptions(options);
	initImages();
}

function initOptions(options){
	if (options == null){
		return;
	}else{
		alert("Options!"+options);
		// Mapping of vars - serve as globals
		return;
	}
}

function initImages(){
	sloth_width = jQuery('div.sloth').outerWidth(true);
	sloth_height = jQuery('div.sloth').outerHeight(true);
	jQuery('div.sloth').children().each(function(){
		sloth_image_count+=1;
	});
	initURLs();
}
function initURLs(){
	// Need to build array of heights
	jQuery('div.sloth').children().each(function(index){
		// Set initial display props of images
		jQuery(this).css('opacity','0');
		jQuery(this).css('position','absolute');
		jQuery(this).addClass('sloth_image_'+index);
		
		jQuery(this).load(function(){
			var image_dimensions = new Array();
			image_dimensions.push(this.width);
			image_dimensions.push(this.height);
			sloth_images.push(image_dimensions);
			check_full_load();
		})
	});
}

function check_full_load(){
	if(sloth_images.length >= sloth_image_count){
		set_final_display_props();
	}
}

function set_final_display_props(){
	var i=0;
	for (i=0;i<sloth_images.length;i++){
		var image_height = jQuery('.sloth_image_'+i).outerHeight(true);
		var image_width = jQuery('.sloth_image_'+i).outerWidth(true);
		var sloth_asp_ratio = sloth_width / sloth_height;
		var image_asp_ratio = image_width / image_height;
		var scaled_height = 0;
		var scaled_width = 0;
		
		if(image_height>image_width){
			scaled_height = sloth_height;
			scaled_width = image_asp_ratio * sloth_height;
		}else{
			scaled_height = 1/image_asp_ratio * sloth_width;
			scaled_width = sloth_width;
		}
		
		jQuery('.sloth_image_'+i).css('height',scaled_height);
		jQuery('.sloth_image_'+i).css('width',scaled_width);
		jQuery('.sloth_image_'+i).css('margin-top', (sloth_height - scaled_height) /2); // Vert center something
		jQuery('.sloth_image_'+i).css('margin-left', (sloth_width - scaled_width) /2); // Vert center something
	}
	run_sloth();
}

function run_sloth(){
	current_image = 0;
	intervalID = window.setInterval("change_pic();",image_duration) // Called every 5 secs
	initUI()
}

function initUI(){
	jQuery('div.sloth').css('background','black'); // Hide BG
	var left_button = "<div class='sloth_left_button'></div>";
	var right_button = "<div class='sloth_right_button'></div>";
	jQuery('div.sloth').parent().append(left_button) // Fade in buttons
	jQuery('div.sloth').parent().append(right_button) // Fade in buttons

	jQuery('div.sloth_left_button').click(function(){
		window.clearInterval(intervalID);
		sloth_fade_out(current_image,1);
		if(current_image<=0){
			current_image = sloth_image_count-1;
		}else{
			current_image--;
		}
		sloth_fade_in(current_image);
		intervalID = window.setInterval("change_pic();",image_duration) // Called every 5 secs		
	});
	
	jQuery('div.sloth_right_button').click(function(){
		window.clearInterval(intervalID,1);
		sloth_fade_out(current_image);
		if(current_image>=sloth_image_count-1){
			current_image = 0;
		}else{
			current_image++;
		}
		sloth_fade_in(current_image);
		intervalID = window.setInterval("change_pic();",image_duration) // Called every 5 secs
	});
}

function change_pic(){
	sloth_fade_out(current_image,0);
	if(current_image>=sloth_image_count-1){
		current_image = 0;
	}else{
		current_image++;
	}
	sloth_fade_in(current_image,0);
}

function sloth_fade_out(image_id,instant){
	if (instant){
		jQuery('.sloth_image_'+image_id).animate({
			opacity:0.0
		},1);
	}else{
		jQuery('.sloth_image_'+image_id).animate({
			opacity:0.0
		},image_fade);
	}
}

function sloth_fade_in(image_id,instant){
	if (instant){
		jQuery('.sloth_image_'+image_id).animate({
			opacity:1.0
		},1);
	}else{
		jQuery('.sloth_image_'+image_id).animate({
			opacity:1.0
		},image_fade);
	}
}