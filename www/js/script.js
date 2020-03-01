// array to save favourites chosen by user
var dataSetFavorites = [];

$(document).ready(function() {
	
	//calling the functions
	getDate();
	//sending each type of news by parameter to the function:
	getNews('sport');
	getNews('business');
	getNews('financial');
	
	// add news into array of the favorites
	//everytime the user clicks on 'add' 
	$(".add-favorite").on("click", function(e) {
		var idLine = $(this).attr("id");
		
		var newsExists = false;
		//validating if the news was already added
		$.each(dataSetFavorites, function() {
			if(idLine == this.idLine){
				newsExists = true;
				
				return false;
			}	
		});	
		
		//if news is not already on the array it is then added:
		if(!newsExists){
			//published date
			var publishedAt = $("#publishedAt" + idLine).html();
			//news description
			var description = $("#description" + idLine).html();
			dataSetFavorites.push({idLine, publishedAt, description});
			setFavorite();			
		}	
	});
	
});

// get moment date and shows into home page
function getDate() {
	
	$('#dataTable-home').html(new Date());	
}

// call rest-service from website news-api
//function that pulls the news according to the type sent by parameter
function getNews(type) {
	//the url variable receives the api url with each news type sent by parameter	
	var url = 'http://newsapi.org/v2/everything?q='+type+'&apiKey=d77b40b94e714053b0e20391cad1954b';
	//variable count so I can use the same fucntion to all different types of news
	var count = 0;
	$.ajax({
		url : url,		
		type : "GET",
		//needs to be 'sync', that means the api is responding to load the rest		
		async : false, 
		success : (function(data, status, jqXhr) {//j query standard
			$.each(data.articles, function() {
				//indenfying each news by its own id to be used when printing
				var id = type + count;
				//selecting data to be shown on a table
				var line = "<tr><td id='publishedAt"+id+"'>"
				//making sure it is shown in the correct format to ireland
				+ new Date(this.publishedAt).toLocaleDateString("en-IE") +"</td>" 
				+ "<td id='description"+id+"'>"+ this.description +"</td>"
				+ "<td><a href='#' id='"+id+"' class='add-favorite'>add</a></td></tr>";
				//teste
				setDataTable(line, type);
				count++; 
			});			
		})
	});
}

// parse json to datatable
function setDataTable(line, type) {
	
	$('#tbody-' + type).append(line);	
}

// parse array to favorite datatable
function setFavorite() {
	//id used in the html file
	$('#tbody-favorites').empty();
	$.each(dataSetFavorites, function() {
		//saving the date of publishment and the news description into the var line
		var line = "<tr><td>"+ this.publishedAt +"</td>" 
		+ "<td>"+ this.description +"</td>"
		//sending var line and type favorites as parameter to the function:
		setDataTable(line, 'favorites');
	});		
}