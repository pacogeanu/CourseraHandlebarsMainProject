// put your javascript code here
var animals_navbar_template, categories_template, category_template, one_animal_template, modal_template;
function init_data(){
	animals_data.category.sort(function(a,b){
		return a.name > b.name;
	});
	
	for (var i = 0; i < animals_data.category.length; ++i){
		animals_data.category[i].animals.sort(function(a,b){
			return a.name > b.name;
		});
	}
	
	for (var i=0;i<animals_data.category.length;++i){
	console.log(animals_data.category[i].name);
		for(var j=0;j<animals_data.category[i].animals.length;++j)
			console.log('\t'+animals_data.category[i].animals[j].name);
	}	
}

function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
}

$(document).ready(function(){	
	init_data();
	
	var source   = $("#animals-navbar-template").html();
	animals_navbar_template = Handlebars.compile(source);
	
	source   = $("#categories-template").html();
	categories_template = Handlebars.compile(source);
	
	source   = $("#category-template").html();
	category_template = Handlebars.compile(source);
	
	source   = $("#modal-template").html();
    modal_template = Handlebars.compile(source);
    
    source   = $("#one-animal-template").html();
    one_animal_template = Handlebars.compile(source);
	
	var html = animals_navbar_template(animals_data);
	$("#navbar-container").html(html);
	
	showTemplate(categories_template, animals_data);
	
	$(".home").click(function(){
		// set the home tab active
		$(".nav").find(".active").removeClass("active");
   		$("ul.nav.navbar-nav .home").parent().addClass("active");
		
		// reset search 
		$("#searchbox").val("");
		$("#searchbox").attr("placeholder", "Search for an animal");
		showTemplate(categories_template, animals_data);
	
		$(".category-thumbnail").click( function(){
			var index = $(this).data("id");
			var current_category = animals_data.category[index];
			
			showTemplate(category_template, current_category);
			
			// set to active the nav-tab associated with the current category 
			$(".nav").find(".active").removeClass("active");
			$(".nav-category[data-id*= "+ index +"]").parent().addClass("active");
			
			$(".animal-title").click(function(){
				var index = $(this).data("id");
				var new_animal_name = current_category.animals[index].name;
				var new_animal_image1 = current_category.animals[index].image1;
				var new_animal_image2 = current_category.animals[index].image2;
				var new_animal_description = current_category.animals[index].description;
			
				$("#animal-name").html(new_animal_name);
				$("#animal-image1").attr("src", new_animal_image1);
				$("#animal-image2").attr("src", new_animal_image2);
				$("#animal-description").html(new_animal_description);
			});
			
			$("img[id^='animal-image']").click(function(){
				var html = modal_template({"src": $(this).attr("src")});
				$('#modal-container').html(html);
				$("#imageModal").modal('show');
			});
		});
	});
	
	$(".nav-category").click(function(){
		// current category nav-tab set to active
		$(".nav").find(".active").removeClass("active");
   		$(this).parent().addClass("active");
		
		$("#searchbox").val("");
		$("#searchbox").attr("placeholder", "Search for an animal");
		
		var current_category_id = $(this).data("id");
		var current_category = animals_data.category[current_category_id];
		showTemplate(category_template, current_category);
		
		$(".animal-title").click(function(){
			var index = $(this).data("id");
			var new_animal_name = current_category.animals[index].name;
			var new_animal_image1 = current_category.animals[index].image1;
			var new_animal_image2 = current_category.animals[index].image2;
			var new_animal_description = current_category.animals[index].description;
		
			$("#animal-name").html(new_animal_name);
			$("#animal-image1").attr("src", new_animal_image1);
			$("#animal-image2").attr("src", new_animal_image2);
			$("#animal-description").html(new_animal_description);
		});
			
		$("img[id^='animal-image']").click(function(){
			var html = modal_template({"src": $(this).attr("src")});
			$('#modal-container').html(html);
			$("#imageModal").modal('show'); 
			});
	});
	
	 $('#searchbox').keypress(function (e) {
	  
      // check if the key that was pressed
      // is the return key (it has id 13)
      // and only do the search if it is
      if (e.which == 13) {
      	$(".nav").find(".active").removeClass("active");

        // get the search text which is the 
        // contents of the search box
		var search_text = $('#searchbox').val();
		
		if (search_text.length != 0) {
		    // print the search box 
		    // (this is an example of using
		    // console.log for debugging)
		    console.log(search_text);
		
		    // create a new array of data with only
		    // the data that contains the search string
		    var filteredData = [];
		    var re = new RegExp(search_text, "i");
		    
		    for( var i=0; i<animals_data.category.length; ++i){
		    	result = animals_data.category[i].animals.filter(function(d){
		        
		        // return true if the animal name contains 
		        // the search text
		        
		        if (d.name.search(re) > -1){
		          return true;
		        }
		        // if we reach here it means we haven't 
		        // found a match so return false
		        return false;
		     	});
		     	
			if(result.length !=0)
				filteredData = filteredData.concat(result);
				 
		    }
		    
		    // pass the newly filtered data into
		    // the template to generate new html
		    var html    = showTemplate(one_animal_template, {"animals":filteredData});
		    $('#content').html(html);
		    
		    // display the modal when you click on a thumbnail
		    $("img[id^='animal-image']").click(function(){
				var html = modal_template({"src": $(this).attr("src")});
				$('#modal-container').html(html);
				$("#imageModal").modal('show'); 
				});
			}
      	}
    });
	
	$(".home").click();
});