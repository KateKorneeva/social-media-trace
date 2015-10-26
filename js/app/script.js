$( document ).ready(function() {

	// Recommendation block open and close

	$(".jsOpenRecommend").click(function() {
		$(".jsRecommend").removeClass("hidden");
	});

	$(".jsCloseRecommend").click(function() {
		$(".jsRecommend").addClass("hidden");
	});
});