$(document).ready(function(){
	$('.menu li,.header li').on('click',function(ev){
		var el = $(ev.target);
		document.location.href = el.find('a').attr('href');
	});

	/*
	
	$('.menu li').on('mouseenter',function(ev){
		$(ev.target).animate({
		    height: '+=150',
			borderBottomLeftRadius:30,
			borderBottomRightRadius:30,
			'marginTop': '10px'
		  });
	});
	$('.menu li').on('mouseleave',function(ev) {
		$(ev.target).animate({
			height: '-=150',
			borderBottomLeftRadius:0,
			borderBottomRightRadius:0,
			'marginTop': '5px'
		});
	});

    */
	
	
	$('.header li').on('mouseenter',function(ev){
		$(ev.target).animate({
		    'marginTop': '-10px'
		  })
		  .animate({
		  	'marginTop': '5px'
		  })
	});
})
