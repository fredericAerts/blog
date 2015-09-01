blogApp.config(["AngularyticsProvider", function(AngularyticsProvider) {
	AngularyticsProvider.setEventHandlers(['GoogleUniversal']);
}])
.run(["Angularytics", function(Angularytics) {
	Angularytics.init();
}]);