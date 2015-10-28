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

	self.phones = ko.computed(function() {
		var phones = [];
		for (var i = 0; i < self.pages().length; i++) {
			if (self.pages()[i].phones.length > 0) {
				for (var j = 0; j < self.pages()[i].phones.length; j++) {
					phones.push(self.pages()[i].phones[j]);
				};
			}
		};
		return phones;
	}, viewModel);

	self.emails = ko.computed(function() {
		var emails = [];
		for (var i = 0; i < self.pages().length; i++) {
			if (self.pages()[i].emails.length > 0) {
				for (var j = 0; j < self.pages()[i].emails.length; j++) {
					emails.push(self.pages()[i].emails[j]);
				};
			}
		};
		return emails;
	}, viewModel);

	self.friends = ko.observableArray();
	for (var i = 0; i < friendsData.friends.length; i++) {
		self.friends.push(friendsData.friends[i]);
	};

	// self.people = ko.observableArray();
	self.showMode = ko.observable('friends');

	self.relatives = ko.observableArray();
	self.classmates = ko.observableArray();
	self.withPhone = ko.observableArray();
	// self.people = self.friends();

	self.people = ko.computed(function () {
			switch (self.showMode()) {
			case 'relatives':
				return self.relatives();
			case 'classmates':
				return self.classmates();
			case 'withPhone':
				return self.withPhone();
			default:
				return self.friends();
			}
		}, viewModel);


	self.assignRelatives = function () {
		self.showMode = "relatives";
		console.log(self.showMode);
	}

	self.assignClassmates = function () {
		self.showMode = "classmates";

	}

	self.assignWithPhone = function () {
		self.showMode = "withPhone";

	}

	self.assignFriends = function () {
		self.showMode = "friends";

	}

	for (var i = 0; i < self.friends().length; i++) {
		for (var j = 0; j < self.friends()[i].tags.length; j++) {
			if (self.friends()[i].tags[j].kind == "relative") {
				self.relatives().push(self.friends()[i]);
			};
			if (self.friends()[i].tags[j].kind == "school") {
				self.classmates().push(self.friends()[i]);
			};
		};

		if (self.friends()[i].contacts.length > 0) {
			self.withPhone().push(self.friends()[i]);
		}
	};

	var getAge = function (arrayItem) {
		var date = parseInt(new Date(arrayItem.birthDate).getFullYear());
		var now = parseInt(new Date().getFullYear());
		arrayItem.age = (now - date);
	}

	var getSocialIcon = function (arrayItem) {
		if (arrayItem.network == "vkontakte") {
			arrayItem.icon = "img/vk.png";
		}
		else if (arrayItem.network == "odnoklassniki") {
			arrayItem.icon = "img/odnokl.png"
		};
	}

	for (var i = 0; i < self.friends().length; i++) {
		getAge(self.friends()[i]);

		getSocialIcon(self.friends()[i]);
	};

	for (var i = 0; i < self.friends().length; i++) {
		for (var j = 0; j < self.friends()[i].tags.length; j++) {
			self.friends()[i].tags[j].cssClass = ko.observable(self.friends()[i].tags[j].kind);
			switch(self.friends()[i].tags[j].kind) {
				case "relative":
					self.friends()[i].tags[j].cssClass = "jsGreen";
					break;
				case "intimate":
					self.friends()[i].tags[j].cssClass = "jsBlue";
					break;
				case "geo":
					self.friends()[i].tags[j].cssClass = "jsOrange";
					break;
				case "school":
					self.friends()[i].tags[j].cssClass = "jsYellow";
					break;
				case "referrer":
					self.friends()[i].tags[j].cssClass = "jsRed";
					break;
				default:
					self.friends()[i].tags[j].cssClass = "jsBlue";
					break;
			}
		};
	};

	self.tagKindColor =  ko.computed (function() {
		console.log(this.kind);
		switch(this.kind) {
			case undefined:
				return "jsGreen";
			case "intimate":
				return "jsBlue";
			case "geo":
				return "jsRed";
			case "school":
				return "jsOrange";
			case "referrer":
				return "jsYellow";
			default:
				return "jsRed";
		}
	}, viewModel);


};

$(function () {
	var viewModelObject = new viewModel();
	viewModelObject.avatarURL(data.avatarURL)
					.alias(data.alias)
					.birthDate(new Date(data.birthDate))
					.universities(data.universities)
					.schools(data.schools)
					.pages(data.pages);
	console.log(viewModelObject.friends()[0]);
	ko.applyBindings(viewModelObject);
});