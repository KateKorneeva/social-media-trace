var viewModel = function () {
	var self = this;

	self.avatarURL = ko.observable();
	self.alias = ko.observable();
	self.birthDate = ko.observable();
	self.universities = ko.observableArray();
	self.schools = ko.observableArray();

	self.pages = ko.observableArray();

	self.age = ko.computed(function() {
		var date = parseInt(new Date(self.birthDate()).getFullYear());
		var now = parseInt(new Date().getFullYear());
		var age = (now - date);
		return age;
	}, viewModel);

	self.cities = ko.computed(function() {
		var cities = ko.utils.arrayMap(self.pages(), function(pagesElem) {
			return pagesElem.cities;
		});
		return ko.utils.arrayGetDistinctValues(cities);
	}, viewModel);

	self.marriageStatus = ko.computed(function() {
		var marriageStatus = ko.utils.arrayMap(self.pages(), function(pagesElem) {
			return pagesElem.marriageStatus;
		});
		
		var married = false;
		for (var i = 0; i < marriageStatus.length; i++) {
			if (marriageStatus[i] == "married") {
				married = true;
			};
		};
		return married;
	}, viewModel);

	self.jobs = ko.computed(function() {
		var jobs = [];
		for (var i = 0; i < self.pages().length; i++) {
			if (self.pages()[i].jobs.length > 0) {
				for (var j = 0; j < self.pages()[i].jobs.length; j++) {
					jobs.push(self.pages()[i].jobs[j]);
				};
			}
		};
		return jobs;
	}, viewModel);

	self.currentJob = ko.observable(self.jobs[0]);

	self.salary = ko.computed(function() {
		var salary = [];
		for (var i = 0; i < self.pages().length; i++) {
			if (self.pages()[i].salary != null) {
				salary.push(self.pages()[i].salary);
			}
		};
		return salary;
	}, viewModel);


	self.devices = ko.computed(function() {
		var devices = [];
		for (var i = 0; i < self.pages().length; i++) {
			if (self.pages()[i].devices.length > 0) {
				devices.push(self.pages()[i].devices);
			}
		};
		return devices;
	}, viewModel);

	self.lastActivityTime = ko.computed(function() {
		var lastActivityTime = [];
		for (var i = 0; i < self.pages().length; i++) {
			if (self.pages()[i].lastActivityTime != null) {
				lastActivityTime.push(self.pages()[i].lastActivityTime);
			}
		};
		return new Date(Math.max.apply(Math, lastActivityTime));
	}, viewModel);

	self.phones = ko.observableArray();
	self.emails = ko.observableArray();
	self.network = ko.observableArray();

};

$(function () {
	var viewModelObject = new viewModel();
	viewModelObject.avatarURL(data.avatarURL)
					.alias(data.alias)
					.birthDate(new Date(data.birthDate))
					.universities(data.universities)
					.schools(data.schools)
					.pages(data.pages);
	console.log(viewModelObject.jobs());
	ko.applyBindings(viewModelObject);
});