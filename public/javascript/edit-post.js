async function editFormHandler(event) {
	event.preventDefault();

	const title = document.querySelector('input[name="post-title"]').value;
	const post_text = document.querySelector(
		'textarea[name="post-text"]'
	).value;
	const id = window.location.toString().split("/")[
		window.location.toString().split("/").length - 1
	];

	const purgePost = await fetch(
		"https://napi.arvancloud.ir/cdn/4.0/domains/ebnekhodadad.ir/caching/purge",
		{
			method: "POST",
			body: JSON.stringify({
				purge: "individual",
				purge_urls: [`https://www.ebnekhodadad.ir/post/${id}`],
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: "apikey e0164ca6-006b-5d85-9dd3-3c2ced76256b",
			},
		}
	);
	console.log(await purgePost.json());
	console.log(purgePost.ok);

	const response = await fetch(`/api/posts/${id}`, {
		method: "PUT",
		body: JSON.stringify({
			title,
			post_text,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok && purgePost.ok) {
		document.location.replace("/dashboard/");
	} else {
		alert(response.statusText);
	}
}

document
	.querySelector(".edit-post-form")
	.addEventListener("submit", editFormHandler);
