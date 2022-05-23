console.log("START OF THE SCRIPT");

const card_template = '\
	<div class="col py-3">\
		<div class="card mb-4 rounded-3 shadow-sm h-100">\
			<a href="CARD_LINK" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">\
				<img src="CARD_IMAGE" class="card-img-top" alt="Illustration" />\
				<div class="card-body px-3 pt-5 pb-3">\
					<h4 class="card-title">CARD_TITLE</h4>\
					<p>CARD_CONTENT</p>\
				</div>\
			</a>\
		</div>\
	</div>';

// This API Key is READONLY, on public data, this is under control	
const API_KEY = 'keygc919YSkuyLBXY';

const BASE_ID = 'appEvg4YFC4H2PBUk';

const TABLE_ID = 'tblJVI7yhYRb59I4I';

const myHeaders = new Headers();

myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', `Bearer ${API_KEY}`);


fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?maxRecords=30&view=Grid%20view`, {
	method: 'GET',
	headers: myHeaders
})
	.then(res => res.json())
	.then((data) => {

		const categories = [];
		for (const key in data.records) {
			if (Object.hasOwnProperty.call(data.records, key)) {
				const element = data.records[key];

				const category = element.fields.Category;
				//console.log(category);

				if (!categories.find(x => x == category)) { categories.push(category) }

			}
		}

		console.log(categories);

		for (const key in categories) {
			if (Object.hasOwnProperty.call(categories, key)) {
				const category = categories[key];

				console.log(category)

				const documents = data.records.filter(card => card.fields.Category == category);
				printCards(documents, category);

			}
		}

	});


function printCards(data, title) {

	document.getElementById("content").innerHTML += `<h2>${title}</h2>`;

	document.getElementById("content").innerHTML += `<div id="content-row-${title}" class="row row-cols-1 row-cols-md-4 mb-3 text-center"></div>`;


	for (var i = 0; i < data.length; i += 1) {

		if (data[i]["id"]) {

			document.getElementById(`content-row-${title}`).innerHTML +=

				card_template.replace("CARD_TITLE", data[i].fields["Document"])
					.replace(/CARD_LINK/g, data[i].fields.URL)
					.replace("THEME", data[i].fields.Team)
					.replace("CARD_CONTENT", data[i].fields.Description)
					.replace("CARD_IMAGE", data[i].fields.Image[0].thumbnails.large.url);

		}
	}
	document.getElementById("content").innerHTML += `<hr/>`;
}
