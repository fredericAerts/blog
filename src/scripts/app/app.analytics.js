blogApp.config(["AngularyticsProvider", function(AngularyticsProvider) {
	AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
}])
.run(["Angularytics", function(Angularytics) {
	Angularytics.init();
}]);