var helpPageApp = angular.module('helpPageApp', []);

// create the controller and inject Angular's $scope

helpPageApp.controller('jsonApiDocController', function ($scope, $sce) {
	$scope.pageClass = 'page-json-api-doc';

	var trustHtmlInDescription = function (o) {
		for (var i in o) {
			if (i === "Description") {
				o[i] = $sce.trustAsHtml(o[i]);
			}
			if (o[i] !== null && typeof (o[i]) == "object") {
				trustHtmlInDescription(o[i]);
			}
		}
	};
	var groupInChapters = function (doc) {
		doc.Chapters = {
			"ChapterPaymentPage": { DisplayName: "Payment Page", BaseUrl: "/Payment/v1/PaymentPage", Paths: {} },
			"ChapterTransaction": { DisplayName: "Transaction", BaseUrl: "/Payment/v1/Transaction", Paths: {} },
			"ChapterAliasStore": { DisplayName: "Secure Alias Store", BaseUrl: "/Payment/v1/Alias", Paths: {} },
			"ChapterBatch": { DisplayName: "Batch", BaseUrl: "/Payment/v1/Batch", Paths: {} }
		}

		for (var c in doc.Chapters) {
			for (var p in doc.Paths) {
				if (doc.Paths[p].AbsolutePath.indexOf(doc.Chapters[c].BaseUrl) === 0) {
					doc.Chapters[c].Paths[p] = doc.Paths[p];
				}
			}
		}

	};

	$.getJSON("ApiServiceDocumentation.json", function (data) {
		trustHtmlInDescription(data);
		groupInChapters(data);
		$scope.documentation = data;
		$scope.$apply();
	});
});