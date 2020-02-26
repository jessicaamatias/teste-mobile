var dataSetFavorites = [];

$(document).ready(function() {
	
	// set arrays of the news by suject type
	getDate();
	getNews('sport');
	getNews('business');
	getNews('financial');
	
	// add news into array of the favorites
	$(".add-favorite").on("click", function(e) {
		var idLine = $(this).attr("id");
		var newsExists = false;
		$.each(dataSetFavorites, function() {
			if(idLine == this.idLine){
				newsExists = true;
				return false;
			}	
		});	
		
		if(!newsExists){
			var publishedAt = $("#publishedAt" + idLine).html();
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
function getNews(type) {	
	var url = 'http://newsapi.org/v2/everything?q='+type+'&apiKey=d77b40b94e714053b0e20391cad1954b';
	var count = 0;
	$.ajax({
		url : url,
		type : "GET",
		async : false, 
		success : (function(data, status, jqXhr) {
			$.each(data.articles, function() {
				var id = type + count;
				var line = "<tr><td id='publishedAt"+id+"'>"+ new Date(this.publishedAt).toLocaleDateString("en-IE") +"</td>" 
				+ "<td id='description"+id+"'>"+ this.description +"</td>"
				+ "<td><a href='#' id='"+id+"' class='add-favorite'>add</a></td></tr>";
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
	$('#tbody-favorites').empty();
	$.each(dataSetFavorites, function() {
		var line = "<tr><td>"+ this.publishedAt +"</td>" 
		+ "<td>"+ this.description +"</td>"
		setDataTable(line, 'favorites');
	});		
}