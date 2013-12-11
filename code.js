// requires jQuery to also be loaded

var cssString = ".aria-landmark-highlight{"
+"background:#fcc;"
+"outline: 3px #f00 solid;"
+"border: 3px #f00 solid;"
+"clear:both;"
+"} "
+"p.aria-landmark-highlight-note{"
+"background:#f99;"
+"font-weight:bold;"
+"margin:0;"
+"padding:0;"
+"font-size:1em;"
+"padding-top:1.2em;
+"}";

if (jQuery('style:contains('+cssString+')').length) {
    // need to remove from the DOM
	jQuery('style:contains('+cssString+')').remove(); //remove the CSS style from the head
	jQuery('.aria-landmark-highlight-note').remove() //remove all elements with this style (which should just be the elements we inserted)
	jQuery('[role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"]').each(function() {
		jQuery(this).removeClass( 'aria-landmark-highlight' )
	});	

} else {
    // need to insert into the DOM
	jQuery("<style type='text/css'>"+cssString+"</style>").appendTo("head");
	
	jQuery('[role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"]').each(function() {
		jQuery(this).addClass( 'aria-landmark-highlight' )
	
		if (jQuery(this).attr('aria-label') !== undefined) {
			// attribute exists
			jQuery(this).prepend("<p class='aria-landmark-highlight-note'>Label: &quot;"+jQuery(this).attr("aria-label")+"&quot;</p>")
		} else {
			// attribute does not exist
		}
		if (jQuery(this).attr('aria-labelledby') !== undefined) {
			// attribute exists
			jQuery(this).prepend("<p class='aria-landmark-highlight-note'>Labelled By: &quot;"+jQuery('[id="'+jQuery(this).attr("aria-labelledby")+'"]').html()+"&quot;</p>")
		} else {
			// attribute does not exist
		}
	
		jQuery(this).prepend("<p class='aria-landmark-highlight-note'>Role: " + jQuery(this).attr("role") + "</p>")
	
	});
	if(jQuery('[role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"]').length==0){
		alert('No ARIA Landmarks were found');
	}
}



