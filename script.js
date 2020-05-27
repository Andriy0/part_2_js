const targetUrl = `https://data.austintexas.gov/api/views/kz4x-q9k5/rows.json?accessType=DOWNLOAD`;

$(document).ready(function () {
	let tableObject;
	$.get(targetUrl, function (rawdata) {
		let data = rawdata.data;
		for (let i = 0; i < data.length; i++) {
			$("#tableContent").append(
				`<tr>
				<td>`+ (i + 1) + `</td>
				<td>`+ data[i][8] + `</td>
				<td>`+ JSON.parse(data[i][9][0])['address'] + `, ` + JSON.parse(data[i][9][0])['city'] + `, ` + JSON.parse(data[i][9][0])['zip'] + `</td>
				<td>`+ data[i][10] + `</td>
				<td>`+ data[i][11] + `</td>
				<td>`+ data[i][12] + `</td>
				<td>`+ data[i][13] + `</td>
				<td>`+ data[i][14] + `</td>
				<td>`+ data[i][15] + `</td>
				<td>`+ data[i][16] + `</td>
				<td><a href="#" class="btn edit btn-warning">Edit</a><a href="#" class="btn delete btn-danger">Delete</a></td>
		  </tr>`
			);
		}
		tableObject = $('#dataTable').DataTable();
	});

	$(document).on("submit", "#inputForm", function (e) {
		e.preventDefault();
		tableObject.destroy();
		if ($("#actionInput").val() == "add") {
			let lastNum = Number($("#tableContent").children().last().children().first().text());
			$("#tableContent").append(`
				  <tr>
						<td>`+ (lastNum + 1) + `</td>
						<td>`+ $("#idInput").val() + `</td>
						<td>`+ $("#locationInput").val() + `</td>
						<td>`+ $("#aacInput").val() + `</td>
						<td>`+ $("#dateInput").val() + `</td>
						<td>`+ $("#typeInput").val() + `</td>
						<td>`+ $("#lookInput").val() + `</td>
						<td>`+ $("#colorInput").val() + `</td>
						<td>`+ $("#sexInput").val() + `</td>
						<td>`+ $("#ageInput").val() + `</td>
						<td><a href="#" class="btn btn-warning">Edit</a><a href="#" class="btn btn-danger">Delete</a></td>
				  </tr>
			 `);
		}

		else {
			$("#tableContent").children().eq(Number($("#numInput").val()) - 1).html(`
			<td>`+ $("#numInput").val() + `</td>
			<td>`+ $("#idInput").val() + `</td>
			<td>`+ $("#locationInput").val() + `</td>
			<td>`+ $("#aacInput").val() + `</td>
			<td>`+ $("#dateInput").val() + `</td>
			<td>`+ $("#typeInput").val() + `</td>
			<td>`+ $("#lookInput").val() + `</td>
			<td>`+ $("#colorInput").val() + `</td>
			<td>`+ $("#sexInput").val() + `</td>
			<td>`+ $("#ageInput").val() + `</td>
			<td><a href="#" class="btn btn-warning">Edit</a><a href="#" class="btn btn-danger">Delete</a></td>
			 `);
		}

		tableObject = $('#dataTable').DataTable();
		$("#inputForm")[0].reset();
		$("#actionInput").val('add');
	});

	$(document).on("click", ".edit", function (e) {
		e.preventDefault();
		let btn = $(this);
		$("#numInput").val(btn.parent().parent().children().eq(0).html());
		$("#idInput").val(btn.parent().parent().children().eq(1).html());
		$("#locationInput").val(btn.parent().parent().children().eq(2).html());
		$("#aacInput").val(btn.parent().parent().children().eq(3).html());
		$("#dateInput").val(btn.parent().parent().children().eq(4).html());
		$("#typeInput").val(btn.parent().parent().children().eq(5).html());
		$("#lookInput").val(btn.parent().parent().children().eq(6).html());
		$("#colorInput").val(btn.parent().parent().children().eq(7).html());
		$("#sexInput").val(btn.parent().parent().children().eq(8).html());
		$("#ageInput").val(btn.parent().parent().children().eq(9).html());
		$("#actionInput").val('edit');
	});

	$(document).on("click", ".delete", function (e) {
		e.preventDefault();
		let btn = $(this);
		btn.parent().parent().nextAll().each(function (index) {
			$(this).children().first().html($(this).children().first().text() - 1);
		});
		btn.parent().parent().remove();
	});

});